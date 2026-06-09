'use client';

import { trackEvent } from './gtag';

interface VisitorSignals {
  device: 'mobile' | 'desktop' | 'tablet';
  os: string;
  browser: string;
  language: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  dayOfWeek: string;
  isReturning: boolean;
  utmSource: string | null;
  utmCampaign: string | null;
  utmMedium: string | null;
  referrer: string | null;
}

const COOKIE_NAME = 'ifood_returning';

function getDevice(): 'mobile' | 'desktop' | 'tablet' {
  const ua = navigator.userAgent;
  if (/iPad|Android(?!.*Mobile)/i.test(ua)) return 'tablet';
  if (/iPhone|iPod|Android.*Mobile|webOS|BlackBerry|Windows Phone/i.test(ua)) return 'mobile';
  return 'desktop';
}

function getOS(): string {
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return 'Windows';
  if (/Mac/i.test(ua)) return 'macOS';
  if (/Linux/i.test(ua)) return 'Linux';
  if (/Android/i.test(ua)) return 'Android';
  if (/iPhone|iPad/i.test(ua)) return 'iOS';
  return 'Unknown';
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (/Chrome/i.test(ua) && !/Edge/i.test(ua)) return 'Chrome';
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari';
  if (/Firefox/i.test(ua)) return 'Firefox';
  if (/Edge/i.test(ua)) return 'Edge';
  return 'Other';
}

function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
}

function getDayOfWeek(): string {
  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  return days[new Date().getDay()];
}

function isReturningVisitor(): boolean {
  const hasVisited = document.cookie.includes(COOKIE_NAME);
  if (!hasVisited) {
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${COOKIE_NAME}=1;expires=${expires};path=/;SameSite=Lax`;
  }
  return hasVisited;
}

function getUtmParam(name: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || null;
}

export function collectSignals(): VisitorSignals {
  return {
    device: getDevice(),
    os: getOS(),
    browser: getBrowser(),
    language: navigator.language || 'pt-BR',
    timeOfDay: getTimeOfDay(),
    dayOfWeek: getDayOfWeek(),
    isReturning: isReturningVisitor(),
    utmSource: getUtmParam('utm_source'),
    utmCampaign: getUtmParam('utm_campaign'),
    utmMedium: getUtmParam('utm_medium'),
    referrer: document.referrer || null,
  };
}

// Extract text fields from block data that should be personalized
const textFields: Record<string, string[]> = {
  hero: ['title', 'description', 'cta_text'],
  vision: ['badge', 'title', 'ratings_text'],
  growth: ['badge', 'title'],
  integrated: ['badge', 'title'],
  results: ['badge', 'title'],
  faq: ['badge', 'title', 'description'],
};

interface Block {
  id: string;
  type: string;
  data: any;
}

export function extractTextBlocks(blocks: Block[]) {
  return blocks
    .filter(b => textFields[b.type])
    .map(b => ({
      blockId: b.id,
      blockType: b.type,
      originalTexts: Object.fromEntries(
        textFields[b.type]
          .filter(field => b.data[field] != null)
          .map(field => [field, b.data[field]])
      ),
    }));
}

// Client-side dedup: avoid calling API if already in-flight or already got a result this session
let _inflight: Promise<Block[] | null> | null = null;
let _cachedResult: Block[] | null = null;

export async function personalize(blocks: Block[], pageId?: string): Promise<Block[] | null> {
  // Return cached result if we already personalized this session
  if (_cachedResult) {
    console.log('[Personalize] Using session-cached result');
    return _cachedResult;
  }

  // Dedup concurrent calls
  if (_inflight) {
    console.log('[Personalize] Request already in-flight, waiting...');
    return _inflight;
  }

  _inflight = _doPersonalize(blocks, pageId);
  const result = await _inflight;
  _inflight = null;
  _cachedResult = result;
  return result;
}

async function _doPersonalize(blocks: Block[], pageId?: string): Promise<Block[] | null> {
  try {
    const signals = collectSignals();
    const textBlocks = extractTextBlocks(blocks);

    console.log('[Personalize] Signals:', signals);
    console.log('[Personalize] Text blocks to personalize:', textBlocks.length);

    if (textBlocks.length === 0) {
      console.log('[Personalize] No text blocks found, skipping');
      return null;
    }

    const response = await fetch('/api/personalize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signals, blocks: textBlocks, page_id: pageId }),
    });

    const json = await response.json();
    console.log('[Personalize] API response:', json);
    if (json.cached) console.log('[Personalize] Result was served from server cache');

    const { personalized } = json;

    if (!personalized?.blocks) {
      console.log('[Personalize] No personalized blocks returned. Debug:', json.debug);
      return null;
    }

    // Track personalization event
    trackEvent('copy_personalized', {
      device: signals.device,
      time_of_day: signals.timeOfDay,
      is_returning: signals.isReturning,
      utm_source: signals.utmSource || 'none',
    });

    // Merge personalized texts back into blocks
    const result = blocks.map(block => {
      const pBlock = personalized.blocks.find((p: any) => p.blockId === block.id);
      if (!pBlock?.texts) return block;

      const newData = { ...block.data };
      for (const [key, value] of Object.entries(pBlock.texts)) {
        if (newData[key] != null) {
          newData[key] = value;
        }
      }
      return { ...block, data: newData };
    });

    return result;
  } catch (error) {
    console.error('Personalization failed:', error);
    return null;
  }
}
