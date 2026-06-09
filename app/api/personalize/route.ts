import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// Lazy client — instanciado dentro do handler para evitar erro no build sem env
function makeSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ── Types ────────────────────────────────────────────────────────
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

interface BlockCopy {
  blockId: string;
  blockType: string;
  originalTexts: Record<string, string | string[]>;
}

// ── UTM hash ────────────────────────────────────────────────────
function buildUtmHash(signals: VisitorSignals): string {
  const parts = [
    signals.device,
    signals.timeOfDay,
    signals.isReturning ? 'ret' : 'new',
    signals.utmSource || '_',
    signals.utmCampaign || '_',
    signals.utmMedium || '_',
  ];
  return parts.join('|');
}

// ── Retry helper ─────────────────────────────────────────────────
async function callGeminiWithRetry(prompt: string, retries = 2): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (response.status === 429 && attempt < retries) {
      const wait = Math.pow(2, attempt + 1) * 1000;
      console.log(`[Personalize] Rate limited (429). Retrying in ${wait / 1000}s...`);
      await new Promise(r => setTimeout(r, wait));
      continue;
    }

    return response;
  }

  throw new Error('Exhausted retries');
}

// ── Handler ──────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { signals, blocks, page_id } = body as {
      signals: VisitorSignals;
      blocks: BlockCopy[];
      page_id: string;
    };

    const supabase = makeSupabase();

    console.log('[Personalize] Request:', blocks.length, 'blocks, page:', page_id);

    if (!GEMINI_API_KEY) {
      console.error('[Personalize] GEMINI_API_KEY not set');
      return NextResponse.json({ personalized: null, debug: 'API key not configured' });
    }

    if (!page_id) {
      return NextResponse.json({ personalized: null, debug: 'page_id required' });
    }

    // Check if AI adaptation is enabled for this page
    const { data: page } = await supabase
      .from('pages')
      .select('ai_adaptation_enabled, ai_adaptation_prompt')
      .eq('id', page_id)
      .single();

    if (!page?.ai_adaptation_enabled) {
      console.log('[Personalize] AI adaptation disabled for page', page_id);
      return NextResponse.json({ personalized: null, debug: 'AI disabled for this page' });
    }

    // Build UTM hash and check persistent cache
    const utmHash = buildUtmHash(signals);
    console.log('[Personalize] UTM hash:', utmHash);

    const { data: cached } = await supabase
      .from('utm_adaptations')
      .select('adapted_blocks')
      .eq('page_id', page_id)
      .eq('utm_hash', utmHash)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (cached) {
      console.log('[Personalize] Cache HIT — returning from Supabase');
      return NextResponse.json({ personalized: cached.adapted_blocks, cached: true });
    }

    console.log('[Personalize] Cache MISS — calling Gemini...');

    // Build prompt
    const prompt = buildPrompt(signals, blocks, page.ai_adaptation_prompt);

    // Call Gemini
    const response = await callGeminiWithRetry(prompt);

    if (!response.ok) {
      const err = await response.text();
      console.error('[Personalize] Gemini HTTP error:', response.status, err);
      return NextResponse.json({ personalized: null, debug: `Gemini error ${response.status}` });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('[Personalize] Empty Gemini response:', JSON.stringify(data));
      return NextResponse.json({ personalized: null, debug: 'Empty response' });
    }

    console.log('[Personalize] Gemini response:', text.substring(0, 200) + '...');

    const personalized = JSON.parse(text);

    // Persist to cache (upsert)
    const { error: cacheError } = await supabase
      .from('utm_adaptations')
      .upsert({
        page_id,
        utm_hash: utmHash,
        utm_params: {
          utmSource: signals.utmSource,
          utmCampaign: signals.utmCampaign,
          utmMedium: signals.utmMedium,
          device: signals.device,
          timeOfDay: signals.timeOfDay,
          isReturning: signals.isReturning,
        },
        adapted_blocks: personalized,
        model_used: 'gemini-2.0-flash',
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }, {
        onConflict: 'page_id,utm_hash',
      });

    if (cacheError) {
      console.error('[Personalize] Cache write error:', cacheError);
    } else {
      console.log('[Personalize] Result cached in Supabase');
    }

    return NextResponse.json({ personalized });

  } catch (error) {
    console.error('[Personalize] Error:', error);
    return NextResponse.json({ personalized: null, debug: String(error) });
  }
}

// ── Prompt builder ───────────────────────────────────────────────

function buildPrompt(signals: VisitorSignals, blocks: BlockCopy[], customPrompt: string | null): string {
  const signalDesc = [
    `Dispositivo: ${signals.device}`,
    `Horário: ${signals.timeOfDay} (${signals.dayOfWeek})`,
    `Visitante ${signals.isReturning ? 'recorrente' : 'novo'}`,
    signals.utmSource ? `Origem (utm_source): ${signals.utmSource}` : null,
    signals.utmCampaign ? `Campanha (utm_campaign): ${signals.utmCampaign}` : null,
    signals.utmMedium ? `Mídia (utm_medium): ${signals.utmMedium}` : null,
    signals.referrer ? `Referrer: ${signals.referrer}` : null,
  ].filter(Boolean).join('\n');

  const blocksDesc = blocks.map(b => {
    const texts = Object.entries(b.originalTexts)
      .map(([key, val]) => `  "${key}": ${JSON.stringify(val)}`)
      .join('\n');
    return `Bloco "${b.blockType}" (id: ${b.blockId}):\n${texts}`;
  }).join('\n\n');

  const customInstructions = customPrompt
    ? `\n\nINSTRUÇÕES ADICIONAIS DO EDITOR:\n${customPrompt}`
    : '';

  return `Você é um especialista em copywriting para landing pages do iFood (plataforma de delivery e soluções para restaurantes no Brasil).

Dado o perfil do visitante abaixo, adapte os textos dos blocos da página para serem mais relevantes e persuasivos para esse perfil específico. Mantenha o tom profissional do iFood, em português brasileiro.

PERFIL DO VISITANTE:
${signalDesc}

BLOCOS E TEXTOS ORIGINAIS:
${blocksDesc}

REGRAS:
- Mantenha o significado e proposta de valor original
- Adapte o tom e ênfase baseado no perfil (ex: mobile = textos mais curtos, visitante recorrente = foco em conversão)
- Não invente funcionalidades ou dados que não existam no original
- Mantenha arrays de strings como arrays e strings como strings
- Se não faz sentido adaptar um campo, retorne o valor original${customInstructions}

Retorne um JSON com a mesma estrutura de entrada, onde cada bloco tem seu blockId e os textos adaptados:
{
  "blocks": [
    {
      "blockId": "...",
      "texts": {
        "campo": "valor adaptado"
      }
    }
  ]
}`;
}
