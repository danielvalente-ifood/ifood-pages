import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Lazy client — instanciado dentro do handler para evitar erro no build sem env
function makeSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

interface TrackingEvent {
  event_type: 'click' | 'scroll';
  x_pct?: number;
  y_pct?: number;
  element_tag?: string;
  element_text?: string;
  scroll_depth_pct?: number;
  viewport_width: number;
  device_type: 'desktop' | 'mobile' | 'tablet';
  session_id: string;
}

interface TrackPayload {
  events: TrackingEvent[];
  pageId: string;
  pageSlug: string;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = makeSupabase();
    const body: TrackPayload = await request.json();
    const { events, pageId, pageSlug } = body;

    // Validate payload
    if (!events || !Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ error: 'No events provided' }, { status: 400 });
    }

    if (events.length > 50) {
      return NextResponse.json({ error: 'Too many events' }, { status: 400 });
    }

    if (!pageId || !pageSlug) {
      return NextResponse.json({ error: 'Missing pageId or pageSlug' }, { status: 400 });
    }

    // Transform events for database
    const dbEvents = events.map(event => ({
      page_id: pageId,
      page_slug: pageSlug,
      event_type: event.event_type,
      x_pct: event.x_pct || null,
      y_pct: event.y_pct || null,
      element_tag: event.element_tag || null,
      element_text: event.element_text || null,
      scroll_depth_pct: event.scroll_depth_pct || null,
      viewport_width: event.viewport_width,
      device_type: event.device_type,
      session_id: event.session_id,
    }));

    // Insert events into database
    const { error } = await supabase
      .from('page_events')
      .insert(dbEvents);

    if (error) {
      console.error('[Track API] Database error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    console.log(`[Track API] Saved ${events.length} events for page ${pageSlug}`);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[Track API] Request error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
