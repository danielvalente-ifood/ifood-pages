'use client';

import { useEffect, useRef } from 'react';
import { events } from '@/lib/gtag';

interface SectionTrackerProps {
  section: string;
  children: React.ReactNode;
}

export function SectionTracker({ section, children }: SectionTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          events.sectionView(section);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [section]);

  return <div ref={ref}>{children}</div>;
}
