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

    // Intercepta cliques em âncoras (#id) para o Lenis animar o scroll
    function handleAnchorClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      const hash = target.getAttribute('href');
      if (!hash || hash === '#') return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { duration: 1.2 });
    }
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;
