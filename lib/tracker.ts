// Lightweight heatmap tracker (~2KB)
// Captures clicks and scroll depth with batching

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

interface TrackerConfig {
  pageId: string;
  pageSlug: string;
}

class HeatmapTracker {
  private config: TrackerConfig;
  private eventBuffer: TrackingEvent[] = [];
  private sessionId: string;
  private maxScrollDepth = 0;
  private deviceType: 'desktop' | 'mobile' | 'tablet';
  private isTracking = false;

  constructor(config: TrackerConfig) {
    this.config = config;
    this.sessionId = this.generateSessionId();
    this.deviceType = this.detectDevice();
    this.init();
  }

  private generateSessionId(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback for older browsers
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private detectDevice(): 'desktop' | 'mobile' | 'tablet' {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  }

  private init() {
    if (this.isTracking) return;
    this.isTracking = true;

    // Track clicks
    document.addEventListener('click', this.handleClick.bind(this), { passive: true });

    // Track scroll with throttling
    let scrollTimeout: ReturnType<typeof setTimeout>;
    document.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(this.handleScroll.bind(this), 100);
    }, { passive: true });

    // Auto-flush every 5 seconds
    setInterval(() => this.flush(), 5000);

    // Flush on page unload
    window.addEventListener('beforeunload', () => this.flush(true));
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flush(true);
      }
    });

    console.log('[Tracker] Initialized for page:', this.config.pageSlug);
  }

  private handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target) return;

    const scrollWidth = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth
    );
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );

    const x_pct = ((event.pageX) / scrollWidth) * 100;
    const y_pct = ((event.pageY) / scrollHeight) * 100;

    const element_text = target.textContent?.trim().substring(0, 100) || '';

    this.addEvent({
      event_type: 'click',
    scroll_depth_pct: this.maxScrollDepth,
      x_pct: Math.round(x_pct * 100) / 100,
      y_pct: Math.round(y_pct * 100) / 100,
      element_tag: target.tagName.toLowerCase(),
      element_text,
      viewport_width: window.innerWidth,
      device_type: this.deviceType,
      session_id: this.sessionId,
    });
  }

  private handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    const windowHeight = window.innerHeight;

    const scrollDepth = Math.min(
      ((scrollTop + windowHeight) / scrollHeight) * 100,
      100
    );

    if (scrollDepth > this.maxScrollDepth) {
      this.maxScrollDepth = scrollDepth;

      // Only track significant scroll milestones (every 10%)
      const milestone = Math.floor(scrollDepth / 10) * 10;
      const lastMilestone = Math.floor((this.maxScrollDepth - 10) / 10) * 10;

      if (milestone > lastMilestone) {
        this.addEvent({
          event_type: 'scroll',
          scroll_depth_pct: milestone,
          viewport_width: window.innerWidth,
          device_type: this.deviceType,
          session_id: this.sessionId,
        });
      }
    }
  }

  private addEvent(event: TrackingEvent) {
    this.eventBuffer.push(event);

    // Auto-flush when buffer reaches 20 events
    if (this.eventBuffer.length >= 20) {
      this.flush();
    }
  }

  private flush(useBeacon = false) {
    if (this.eventBuffer.length === 0) return;

    const events = [...this.eventBuffer];
    this.eventBuffer = [];

    const payload = {
      events,
      pageId: this.config.pageId,
      pageSlug: this.config.pageSlug,
    };

    const body = JSON.stringify(payload);

    try {
      if (useBeacon && navigator.sendBeacon) {
        navigator.sendBeacon('/api/track', body);
      } else {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true,
        }).catch(console.error);
      }

      console.log(`[Tracker] Sent ${events.length} events`);
    } catch (error) {
      console.error('[Tracker] Failed to send events:', error);
    }
  }

  public destroy() {
    this.isTracking = false;
    this.flush();
  }
}

let tracker: HeatmapTracker | null = null;

export function initTracker(pageId: string, pageSlug: string) {
  // Don't track in edit mode or if already tracking
  if (
    new URLSearchParams(window.location.search).get('edit') === 'true' ||
    tracker
  ) {
    return;
  }

  tracker = new HeatmapTracker({ pageId, pageSlug });

  return () => {
    if (tracker) {
      tracker.destroy();
      tracker = null;
    }
  };
}
