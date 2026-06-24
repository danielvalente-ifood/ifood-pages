import type { RegistryEntry } from './types';
import heroEntry from './hero';
import visionEntry from './vision';
import growthEntry from './growth';
import integratedEntry from './integrated';
import resultsEntry from './results';
import faqEntry from './faq';
import navbarEntry from './navbar';
import footerEntry from './footer';
import ctaBannerEntry from './cta-banner';
import beneficiosEntry from './beneficios';
import contentEntry from './content-section';
import promoEntry from './promo-banner';
import stackedEntry from './stacked';
import bigNumbersEntry from './big-numbers';
import leadformEntry from './leadform';
import bigNumbersTestimonialEntry from './big-numbers-testimonial';
import segmentosEntry from './segmentos';
import sectionTitleEntry from './section-title';
import choiceCardsEntry from './choice-cards';
import brandCarouselEntry from './brand-carousel';

/**
 * Fonte única de verdade dos componentes de landing page.
 * Para adicionar um componente novo: criar <tipo>.ts e adicionar aqui.
 * Ele aparecerá automaticamente em /preview, /catalog e (Fase 8) no painel Add do CMS.
 */
export const registry: RegistryEntry[] = [
  navbarEntry,
  heroEntry,
  visionEntry,
  growthEntry,
  integratedEntry,
  resultsEntry,
  faqEntry,
  footerEntry,
  beneficiosEntry,
  contentEntry,
  promoEntry,
  stackedEntry,
  bigNumbersEntry,
  leadformEntry,
  bigNumbersTestimonialEntry,
  segmentosEntry,
  sectionTitleEntry,
  choiceCardsEntry,
  brandCarouselEntry,
  ctaBannerEntry, // Fase 5: componente de teste do registry — manter ou remover
];

/** Busca uma entrada pelo type (ex: 'hero'). Retorna undefined se não encontrado. */
export function getEntry(type: string): RegistryEntry | undefined {
  return registry.find((e) => e.type === type);
}

/** Agrupa as entradas por category. */
export function getByCategory(): Record<string, RegistryEntry[]> {
  return registry.reduce<Record<string, RegistryEntry[]>>((acc, entry) => {
    if (!acc[entry.category]) acc[entry.category] = [];
    acc[entry.category].push(entry);
    return acc;
  }, {});
}

export type { RegistryEntry } from './types';
