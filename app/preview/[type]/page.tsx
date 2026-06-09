'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { getEntry } from '@/registry';

/**
 * Preview isolado de um bloco com dados padrão — usado nas miniaturas do
 * painel "Adicionar" do CMS (iframe escalado). Sem nav/scroll/chrome.
 *
 * Renderiza via registry: adicionar componente = 1 entrada no registry.
 * Aceita ?variant=<id> para renderizar uma variante específica (merge do
 * config da variante sobre os defaults).
 */
export default function BlockPreview() {
  const params = useParams();
  const searchParams = useSearchParams();
  const type = params.type as string;
  const variantId = searchParams.get('variant');

  const entry = getEntry(type);

  if (!entry) {
    return (
      <div style={{ padding: '2rem', color: '#999', fontSize: '14px' }}>
        Componente &quot;{type}&quot; não encontrado no registry.
      </div>
    );
  }

  const Component = entry.component;

  const variant = variantId ? entry.variants.find((v) => v.id === variantId) : undefined;
  const data = { ...entry.defaults, ...(variant?.config ?? {}) };

  return (
    <div style={{ background: '#fff', overflow: 'hidden', pointerEvents: 'none' }}>
      {/* força os blocos com scroll-reveal a aparecerem */}
      <style>{`.scroll-reveal{opacity:1!important;transform:none!important;}`}</style>
      <Component data={Object.keys(data).length > 0 ? data : undefined} />
    </div>
  );
}
