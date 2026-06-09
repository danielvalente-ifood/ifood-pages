'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import Hero from '@/components/Hero/Hero';
import Vision from '@/components/Vision/Vision';
import Growth from '@/components/Growth/Growth';
import Integrated from '@/components/Integrated/Integrated';
import Results from '@/components/Results/Results';
import FAQ from '@/components/FAQ/FAQ';
import { Footer } from '@/components/Footer';
import { SectionTracker } from '@/components/SectionTracker';
import { SkipLink } from '@/components/SkipLink';
import { applyBlockExperiments } from '@/lib/ab-testing';
import { personalize } from '@/lib/personalization';
import { initTracker } from '@/lib/tracker';

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

const typeLabels: Record<string, string> = {
  navbar: 'Navbar',
  hero: 'Hero',
  vision: 'Social Proof',
  growth: 'Growth',
  integrated: 'Features',
  results: 'Depoimentos',
  faq: 'FAQ',
  footer: 'Footer',
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
        document
          .getElementById(`block-${payload.blockId}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      case 'cms:deselect':
        setSelectedBlockId(null);
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
    window.parent.postMessage(
      { type: 'landing:block-selected', payload: { blockId: block.id, blockType: block.type } },
      '*'
    );
  };

  const navbarBlock = blocks.find((b) => b.type === 'navbar');
  const footerBlock = blocks.find((b) => b.type === 'footer');
  const mainBlocks = blocks.filter((b) => b.type !== 'navbar' && b.type !== 'footer');

  const renderBlock = (block: Block) => {
    const editProps = isEditMode
      ? {
          onClick: (e: React.MouseEvent) => {
            e.stopPropagation();
            handleBlockClick(block);
          },
          style: {
            position: 'relative' as const,
            cursor: 'pointer',
            outline: selectedBlockId === block.id ? '2px solid #EB0033' : 'none',
            outlineOffset: '-2px',
            transition: 'outline 0.15s ease',
          },
          onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
            if (selectedBlockId !== block.id) {
              e.currentTarget.style.outline = '2px dashed rgba(235, 0, 51, 0.4)';
            }
          },
          onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
            if (selectedBlockId !== block.id) {
              e.currentTarget.style.outline = 'none';
            }
          },
        }
      : {};

    const label =
      isEditMode && selectedBlockId === block.id ? (
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
      <BlockRenderer block={block} />
    ) : (
      <SectionTracker section={block.type}>
        <BlockRenderer block={block} />
      </SectionTracker>
    );

    return { editProps, label, content };
  };

  return (
    <>
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
          return (
            <div key={block.id} id={`block-${block.id}`} {...editProps}>
              {label}
              {content}
            </div>
          );
        })}
      </main>

      {footerBlock &&
        (() => {
          const { editProps, label, content } = renderBlock(footerBlock);
          return (
            <div id={`block-${footerBlock.id}`} {...editProps}>
              {label}
              {content}
            </div>
          );
        })()}
    </>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'navbar':
      return <Navbar />;
    case 'hero': {
      const pos = block.config?.assetPosition;
      const heroData = pos
        ? { ...block.data, variant: pos === 'right' ? 'image-right' : 'image-left' }
        : block.data;
      return <Hero data={heroData} />;
    }
    case 'vision':
      return <Vision data={block.data} />;
    case 'growth':
      return <Growth data={block.data} />;
    case 'integrated':
      return <Integrated data={block.data} />;
    case 'results':
      return <Results data={block.data} />;
    case 'faq':
      return <FAQ data={block.data} />;
    case 'footer':
      return <Footer data={block.data} />;
    default:
      return null;
  }
}
