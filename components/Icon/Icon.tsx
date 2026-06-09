'use client';

import { useEffect, useState } from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const cache = new Map<string, string>();

/** Só permite alfanuméricos, hífen e underscore — evita path traversal & injection */
const VALID_ICON_NAME = /^[a-zA-Z0-9_-]+$/;

/** Sanitização mínima de SVG: precisa começar com <svg e não conter scripts */
function isSafeSvg(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed.startsWith('<svg')) return false;
  const dangerous =
    /<script/i.test(trimmed) ||
    /on\w+\s*=/i.test(trimmed) ||
    /javascript:/i.test(trimmed) ||
    /data:\s*text\/html/i.test(trimmed);
  return !dangerous;
}

/**
 * Renderiza um ícone SVG da biblioteca fixa em /public/icons.
 * Mesmo conjunto usado no CMS — garante consistência entre o picker e o render.
 */
export function Icon({ name, size = 24, className }: IconProps) {
  const [svg, setSvg] = useState<string>(cache.get(name) || '');

  useEffect(() => {
    if (!VALID_ICON_NAME.test(name)) return;

    if (cache.has(name)) {
      setSvg(cache.get(name)!);
      return;
    }

    fetch(`/icons/${name}.svg`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.text();
      })
      .then((text) => {
        if (!isSafeSvg(text)) {
          console.warn(`Icon "${name}" failed SVG safety check`);
          return;
        }
        const processed = text
          .replace(/width="\d+"/, `width="${size}"`)
          .replace(/height="\d+"/, `height="${size}"`);
        cache.set(name, processed);
        setSvg(processed);
      })
      .catch(() => {});
  }, [name, size]);

  if (!svg) return <span style={{ width: size, height: size, display: 'inline-block' }} />;

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', width: size, height: size, color: 'inherit' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default Icon;
