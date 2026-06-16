'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { SectionTracker } from '@/components/SectionTracker';
import { SkipLink } from '@/components/SkipLink';
import { SmoothScroll } from '@/components/SmoothScroll/SmoothScroll';
import Footer from '@/components/Footer/Footer';
import { EditProvider } from '@/components/edit/EditContext';
import { applyBlockExperiments } from '@/lib/ab-testing';
import { personalize } from '@/lib/personalization';
import { initTracker } from '@/lib/tracker';
import { getEntry } from '@/registry';

interface Block {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  config?: {
    assetPosition?: 'left' | 'right';
    [k: string]: unknown;
  };
}

interface DynamicPageProps {
  blocks: Block[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  experiments?: any[];
  pageId?: string;
  pageSlug?: string;
  aiEnabled?: boolean;
}

/** Set imutável por path com índices (ex: 'cards.2.title'). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setByPath(obj: any, path: string, value: any): any {
  const keys = path.split('.');
  const clone = Array.isArray(obj) ? [...obj] : { ...obj };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cur: any = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    const next = cur[k];
    cur[k] = Array.isArray(next) ? [...next] : { ...(next ?? {}) };
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = value;
  return clone;
}

const typeLabels: Record<string, string> = {
  navbar: 'Navbar',
  hero: 'Hero',
  beneficios: 'Benefícios',
  content: 'Conteúdo',
  promo: 'Banner promocional',
  vision: 'Social Proof',
  growth: 'Growth',
  integrated: 'Features',
  results: 'Depoimentos',
  faq: 'FAQ',
  footer: 'Footer',
  'big-numbers': 'Big Numbers',
};

export function DynamicPage({
  blocks: initialBlocks,
  experiments = [],
  pageId,
  pageSlug,
  aiEnabled = false,
}: DynamicPageProps) {
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';

  const processedBlocks =
    !isEditMode && experiments.length > 0
      ? applyBlockExperiments(initialBlocks, experiments)
      : initialBlocks;

  const [blocks, setBlocks] = useState<Block[]>(processedBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  // Seleção de sub-elemento (card) — específico de componentes com itens (ex: benefícios)
  const [selectedCard, setSelectedCard] = useState<{ blockId: string; index: number } | null>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    const { type, payload } = event.data || {};

    switch (type) {
      case 'cms:update-block':
        setBlocks((prev) =>
          prev.map((b) =>
            b.id === payload.blockId
              ? { ...b, data: payload.data, config: payload.config }
              : b
          )
        );
        break;
      case 'cms:update-all-blocks':
        setBlocks(payload.blocks);
        break;
      case 'cms:select-block':
        setSelectedBlockId(payload.blockId);
        setSelectedCard(null);
        document
          .getElementById(`block-${payload.blockId}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      case 'cms:select-card':
        setSelectedCard(
          payload.cardIndex == null
            ? null
            : { blockId: payload.blockId, index: payload.cardIndex }
        );
        break;
      case 'cms:deselect':
        setSelectedBlockId(null);
        setSelectedCard(null);
        break;
    }
  }, []);

  useEffect(() => {
    if (!isEditMode) return;
    window.addEventListener('message', handleMessage);
    window.parent.postMessage({ type: 'landing:ready' }, '*');
    return () => window.removeEventListener('message', handleMessage);
  }, [isEditMode, handleMessage]);

  // AI personalization
  useEffect(() => {
    if (isEditMode || !aiEnabled || !pageId) return;
    const params = new URLSearchParams(window.location.search);
    const hasUtm =
      params.has('utm_source') ||
      params.has('utm_campaign') ||
      params.has('utm_medium');
    if (!hasUtm) return;
    personalize(processedBlocks, pageId).then((personalizedBlocks) => {
      if (personalizedBlocks) setBlocks(personalizedBlocks);
    });
  }, [aiEnabled, pageId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Heatmap tracker
  useEffect(() => {
    if (isEditMode || !pageId || !pageSlug) return;
    return initTracker(pageId, pageSlug);
  }, [isEditMode, pageId, pageSlug]);

  // Report page dimensions to CMS
  useEffect(() => {
    if (!isEditMode) return;
    function sendDimensions() {
      window.parent.postMessage(
        {
          type: 'landing:page-dimensions',
          payload: {
            scrollHeight: document.documentElement.scrollHeight,
            scrollWidth: document.documentElement.scrollWidth,
          },
        },
        '*'
      );
    }
    const timer = setTimeout(sendDimensions, 500);
    const observer = new ResizeObserver(sendDimensions);
    observer.observe(document.documentElement);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [isEditMode]);

  const handleBlockClick = (block: Block) => {
    if (!isEditMode) return;
    setSelectedBlockId(block.id);
    setSelectedCard(null);
    window.parent.postMessage(
      { type: 'landing:block-selected', payload: { blockId: block.id, blockType: block.type } },
      '*'
    );
  };

  const handleCardSelect = (block: Block, index: number) => {
    if (!isEditMode) return;
    setSelectedBlockId(block.id);
    setSelectedCard({ blockId: block.id, index });
    window.parent.postMessage(
      { type: 'landing:card-selected', payload: { blockId: block.id, cardIndex: index } },
      '*'
    );
  };

  // Edição inline: atualiza o estado local na hora e notifica o CMS.
  const emitContentEdit = useCallback((blockId: string, path: string, value: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, data: setByPath(b.data, path, value) } : b))
    );
    window.parent.postMessage(
      { type: 'landing:content-edit', payload: { blockId, path, value } },
      '*'
    );
  }, []);

  const requestImageEdit = useCallback((blockId: string, path: string) => {
    setSelectedBlockId(blockId);
    setSelectedCard(null);
    window.parent.postMessage(
      { type: 'landing:image-edit-request', payload: { blockId, path } },
      '*'
    );
  }, []);

  const navbarBlock = blocks.find((b) => b.type === 'navbar');
  const footerBlock = blocks.find((b) => b.type === 'footer');
  const mainBlocks = blocks.filter((b) => b.type !== 'navbar' && b.type !== 'footer');

  const renderBlock = (block: Block) => {
    // Quando um card deste bloco está selecionado, não destacamos a seção inteira
    const cardSelectedHere = selectedCard?.blockId === block.id;
    const sectionSelected = selectedBlockId === block.id && !cardSelectedHere;

    const editProps = isEditMode
      ? {
          onClick: (e: React.MouseEvent) => {
            e.stopPropagation();
            handleBlockClick(block);
          },
          style: {
            position: 'relative' as const,
            cursor: 'pointer',
            outline: sectionSelected ? '2px solid #EB0033' : 'none',
            outlineOffset: '-2px',
            transition: 'outline 0.15s ease',
          },
          onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
            if (!sectionSelected) {
              e.currentTarget.style.outline = '2px dashed rgba(235, 0, 51, 0.4)';
            }
          },
          onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
            if (!sectionSelected) {
              e.currentTarget.style.outline = 'none';
            }
          },
        }
      : {};

    const label =
      isEditMode && sectionSelected ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            background: '#EB0033',
            color: '#fff',
            fontSize: '11px',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: '0 0 4px 0',
            zIndex: 50,
            pointerEvents: 'none',
          }}
        >
          {typeLabels[block.type] || block.type}
        </div>
      ) : null;

    const content = isEditMode ? (
      <EditProvider
        value={{
          editMode: true,
          blockId: block.id,
          emit: (p, v) => emitContentEdit(block.id, p, v),
          requestImage: (p) => requestImageEdit(block.id, p),
        }}
      >
        <BlockRenderer
          block={block}
          editMode
          selectedCardIndex={cardSelectedHere ? selectedCard!.index : null}
          onSelectCard={(i) => handleCardSelect(block, i)}
        />
      </EditProvider>
    ) : (
      <SectionTracker section={block.type}>
        <BlockRenderer block={block} />
      </SectionTracker>
    );

    return { editProps, label, content };
  };

  return (
    <>
      <SmoothScroll />
      <SkipLink />

      {navbarBlock &&
        (() => {
          const { editProps, label, content } = renderBlock(navbarBlock);
          return (
            <header id={`block-${navbarBlock.id}`} {...editProps}>
              {label}
              {content}
            </header>
          );
        })()}

      <main id="main-content">
        {mainBlocks.map((block) => {
          const { editProps, label, content } = renderBlock(block);
          // Efeito cortina: o banner promocional fica pinado (sticky no wrapper,
          // que é filho direto do <main>) e os blocos seguintes — com z-index
          // acima — sobem por cima cobrindo-o. Requer que o bloco logo abaixo
          // tenha fundo opaco.
          const isCurtain =
            block.type === 'promo' && (block.data?.curtain ?? true) !== false;
          // Efeito cortina: o banner fica sticky (z-index 0) e os blocos
          // seguintes (z-index 1) sobem por cima. A opacidade de cada bloco é
          // responsabilidade do próprio componente (todos usam var --page-bg).
          const wrapperStyle: React.CSSProperties = isCurtain
            ? { position: 'sticky', top: 0, zIndex: 0 }
            : { position: 'relative', zIndex: 1 };
          const mergedProps = {
            ...editProps,
            style: { ...wrapperStyle, ...(editProps as { style?: React.CSSProperties }).style, ...(isCurtain ? { position: 'sticky' as const, top: 0, zIndex: 0 } : {}) },
          };
          return (
            <div key={block.id} id={`block-${block.id}`} {...mergedProps}>
              {label}
              {content}
            </div>
          );
        })}
      </main>

      {/* Footer é fixo em toda página (padrão), com dados do bloco se existir
          (legado/migração) ou os defaults do componente caso contrário.
          Não é editável via painel — não aparece como seção selecionável. */}
      <Footer data={footerBlock?.data} />
    </>
  );
}

function BlockRenderer({
  block,
  editMode = false,
  selectedCardIndex = null,
  onSelectCard,
}: {
  block: Block;
  editMode?: boolean;
  selectedCardIndex?: number | null;
  onSelectCard?: (index: number) => void;
}) {
  const entry = getEntry(block.type);
  if (!entry) return null;

  const Component = entry.component;

  // Benefícios: suporta seleção de card individual no modo edição
  if (block.type === 'beneficios' && editMode) {
    return (
      <Component
        data={block.data}
        editMode
        selectedCardIndex={selectedCardIndex}
        onSelectCard={onSelectCard}
      />
    );
  }

  // BigNumbers: suporta seleção de stat individual no modo edição
  if (block.type === 'big-numbers' && editMode) {
    return (
      <Component
        data={block.data}
        editMode
        selectedStatIndex={selectedCardIndex}
        onSelectStat={onSelectCard}
      />
    );
  }

  return <Component data={block.data} />;
}
