import { useEffect, useRef, useState } from 'react';

/**
 * Anima um número de 0 até `target` quando `active` vira true.
 * Retorna o valor atual formatado com separador de milhar (pt-BR).
 */
export function useCountUp(target: number, active: boolean, duration = 1800): string {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // ease-out cubic

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCurrent(Math.round(ease(progress) * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return current.toLocaleString('pt-BR');
}
