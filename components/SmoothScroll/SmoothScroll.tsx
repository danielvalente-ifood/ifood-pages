'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Smooth scroll global (Lenis) — comportamento padrão das páginas criadas.
 *
 * Usa o modo nativo do Lenis: anima o scroll real da janela (window.scrollY),
 * então `position: sticky` e `getBoundingClientRect()` continuam válidos e o
 * evento `scroll` segue disparando — componentes scroll-driven (ex.: Stacked)
 * não quebram. Roda também no preview do editor (iframe).
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;
