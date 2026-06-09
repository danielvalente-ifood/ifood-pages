import { trackEvent } from './gtag';

interface Experiment {
  id: string;
  name: string;
  status: string;
  type: string;
  traffic_percentage: number;
}

interface Variant {
  id: string;
  experiment_id: string;
  name: string;
  is_control: boolean;
  weight: number;
  target_block_id: string | null;
  block_data: Record<string, any> | null;
  alt_page_id: string | null;
}

interface ExperimentWithVariants extends Experiment {
  variants: Variant[];
}

const COOKIE_PREFIX = 'ab_';

// Get or assign a variant for an experiment
function getVariantFromCookie(experimentId: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`${COOKIE_PREFIX}${experimentId}=([^;]+)`));
  return match ? match[1] : null;
}

function setVariantCookie(experimentId: string, variantId: string) {
  if (typeof document === 'undefined') return;
  // Cookie expires in 30 days
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_PREFIX}${experimentId}=${variantId};expires=${expires};path=/;SameSite=Lax`;
}

// Weighted random selection
function selectVariant(variants: Variant[]): Variant {
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  let random = Math.random() * totalWeight;

  for (const variant of variants) {
    random -= variant.weight;
    if (random <= 0) return variant;
  }

  return variants[0]; // fallback
}

// Assign a variant for an experiment (or return existing assignment)
export function assignVariant(experiment: ExperimentWithVariants): Variant | null {
  if (experiment.status !== 'running' || experiment.variants.length === 0) {
    return null;
  }

  // Check for existing assignment
  const existingVariantId = getVariantFromCookie(experiment.id);
  if (existingVariantId) {
    const existing = experiment.variants.find(v => v.id === existingVariantId);
    if (existing) return existing;
  }

  // Assign new variant
  const variant = selectVariant(experiment.variants);
  setVariantCookie(experiment.id, variant.id);

  // Track in GA4
  trackEvent('experiment_view', {
    experiment_id: experiment.id,
    experiment_name: experiment.name,
    variant_id: variant.id,
    variant_name: variant.name,
    is_control: variant.is_control,
  });

  return variant;
}

// Apply block-level experiments to blocks array
export function applyBlockExperiments(
  blocks: Array<{ id: string; type: string; data: any }>,
  experiments: ExperimentWithVariants[]
): Array<{ id: string; type: string; data: any }> {
  let result = [...blocks];

  for (const exp of experiments) {
    if (exp.type !== 'block') continue;

    const variant = assignVariant(exp);
    if (!variant || variant.is_control || !variant.target_block_id || !variant.block_data) {
      continue;
    }

    // Replace the target block's data with the variant data
    result = result.map(block =>
      block.id === variant.target_block_id
        ? { ...block, data: variant.block_data }
        : block
    );
  }

  return result;
}

// Check if a page-level experiment should redirect to alt page
export function getPageExperimentRedirect(
  experiments: ExperimentWithVariants[]
): string | null {
  for (const exp of experiments) {
    if (exp.type !== 'page') continue;

    const variant = assignVariant(exp);
    if (!variant || variant.is_control || !variant.alt_page_id) {
      continue;
    }

    return variant.alt_page_id;
  }

  return null;
}
