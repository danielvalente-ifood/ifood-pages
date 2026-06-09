'use client';

import { useParams } from 'next/navigation';
import { getEntry } from '@/registry';

/**
 * Preview isolado de um bloco com dados padrão — usado nas miniaturas do
 * painel "Adicionar" do CMS (iframe escalado). Sem nav/scroll/chrome.
 *
 * Renderiza via registry: adicionar componente = 1 entrada no registry.
 */
export default function BlockPreview() {
  const params = useParams();
  const type = params.type as string;

  const entry = getEntry(type);

  if (!entry) {
    return (
      <div style={{ padding: '2rem', color: '#999', fontSize: '14px' }}>
        Componente &quot;{type}&quot; não encontrado no registry.
      </div>
    );
  }

  const Component = entry.component;

  return (
    <div style={{ background: '#fff', overflow: 'hidden', pointerEvents: 'none' }}>
      {/* força os blocos com scroll-reveal a aparecerem */}
      <style>{`.scroll-reveal{opacity:1!important;transform:none!important;}`}</style>
      <Component data={Object.keys(entry.defaults).length > 0 ? entry.defaults : undefined} />
    </div>
  );
}
