'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Icon } from '@/components/Icon/Icon';
import { EditableButton } from '@/components/edit/EditableButton';
import { Editable } from '@/components/edit/Editable';
import { useEdit } from '@/components/edit/EditContext';
import styles from './PromoBanner.module.css';

export interface PromoBannerCTA {
  text: string;
  link: string;
  style?: 'primary' | 'secondary' | 'empty' | 'red';
}

export interface PromoBannerData {
  /** centered = texto centralizado · split = texto + card de imagem · video = vídeo full-width */
  layout?: 'centered' | 'split' | 'video';
  title: string[];
  description?: string;
  /** fundo: cor hex única ou imagem */
  backgroundType?: 'color' | 'image';
  backgroundColor?: string;
  backgroundImage?: string;
  /** split — imagem do card e posição */
  image?: string;
  assetPosition?: 'left' | 'right';
  /** esquema do conteúdo: light = sobre fundo escuro · dark = sobre fundo claro */
  contentColor?: 'light' | 'dark';
  /** efeito cortina (sticky/parallax estilo nubank) */
  curtain?: boolean;
  /** 0, 1 ou 2 CTAs */
  ctas?: PromoBannerCTA[];
  /** video variant */
  videoType?: 'upload' | 'youtube';
  videoSrc?: string;
  videoUrl?: string;
  autoplay?: boolean;
}

const defaultData: PromoBannerData = {
  layout: 'centered',
  title: ['Seus clientes do delivery agora', 'podem viver a experiência completa', 'com você'],
  description:
    'Uma plataforma que organiza atendimento, pedidos, pagamentos e gestão do salão em um único fluxo, pensado para o ritmo real do restaurante.',
  backgroundType: 'color',
  backgroundColor: '#272727',
  backgroundImage: '',
  image: '',
  assetPosition: 'right',
  contentColor: 'light',
  curtain: true,
  ctas: [
    { text: 'Ativar agora', link: '#', style: 'primary' },
    { text: 'Saiba mais', link: '#', style: 'secondary' },
  ],
};

interface PromoBannerProps {
  data?: PromoBannerData;
}

function PromoCta({ cta, color, path }: { cta: PromoBannerCTA; color: 'light' | 'dark'; path: string }) {
  const isRed = cta.style === 'red';
  const variant = cta.style === 'secondary' ? 'stroke' : cta.style === 'empty' ? 'empty' : 'fill';
  return (
    <EditableButton
      path={path}
      href={cta.link || '#'}
      label={cta.text}
      variant={variant}
      color={isRed ? 'dark' : color}
      content="text-icon"
    />
  );
}

function parseYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('?')[0];
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/')[2];
      return u.searchParams.get('v');
    }
  } catch { /* invalid url */ }
  return null;
}

/**
 * Retorna true se a seção está suficientemente visível E não está coberta
 * pelo próximo bloco (efeito curtain: seção seguinte entra por cima).
 */
function isSectionVisible(section: HTMLElement): boolean {
  const rect = section.getBoundingClientRect();
  const vh = window.innerHeight;

  // Fora do viewport (acima ou abaixo)
  if (rect.bottom <= 0 || rect.top >= vh) return false;

  // Próximo irmão entrou na viewport → pausa
  const next = section.nextElementSibling as HTMLElement | null;
  if (next) {
    const nextRect = next.getBoundingClientRect();
    if (nextRect.top < vh) return false;
  }

  return true;
}

function YoutubeEmbed({
  ytId,
  autoplay,
  sectionRef,
}: {
  ytId: string;
  autoplay: boolean;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const readyRef = useRef(false);
  const playingRef = useRef(false);

  const send = (func: 'playVideo' | 'pauseVideo') => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args: '' }),
      '*'
    );
  };

  useEffect(() => {
    if (!autoplay) return;

    const check = () => {
      if (!readyRef.current || !sectionRef.current) return;
      const visible = isSectionVisible(sectionRef.current);
      if (visible && !playingRef.current) {
        send('playVideo');
        playingRef.current = true;
      } else if (!visible && playingRef.current) {
        send('pauseVideo');
        playingRef.current = false;
      }
    };

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [autoplay, sectionRef]);

  const handleLoad = () => {
    readyRef.current = true;
    if (autoplay && sectionRef.current && isSectionVisible(sectionRef.current)) {
      send('playVideo');
      playingRef.current = true;
    }
  };

  const src = `https://www.youtube.com/embed/${ytId}?loop=1&playlist=${ytId}&controls=1&rel=0&playsinline=1&enablejsapi=1`;

  return (
    <iframe
      ref={iframeRef}
      className={styles.videoFrame}
      src={src}
      title="Banner vídeo"
      allow="autoplay; encrypted-media"
      allowFullScreen
      onLoad={handleLoad}
    />
  );
}

function UploadedVideo({
  src,
  autoplay,
  sectionRef,
}: {
  src: string;
  autoplay: boolean;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!autoplay) return;
    const video = videoRef.current;
    if (!video) return;

    const check = () => {
      if (!sectionRef.current) return;
      if (isSectionVisible(sectionRef.current)) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    check(); // disparo inicial
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [autoplay, sectionRef]);

  return (
    <video
      ref={videoRef}
      className={styles.videoEl}
      src={src}
      loop
      playsInline
      controls
    />
  );
}

export default function PromoBanner({ data }: PromoBannerProps) {
  const { ref, isVisible } = useScrollReveal();
  const videoSectionRef = useRef<HTMLElement | null>(null);
  const { editMode } = useEdit();
  const d = data ?? defaultData;
  const layout = d.layout || 'centered';
  const contentColor = d.contentColor || 'light';
  const ctas = (d.ctas ?? []).slice(0, 2);
  const curtain = d.curtain !== false;
  const splitLeft = (d.assetPosition || 'right') === 'left';

  // Fundo: cor sólida ou imagem
  const isImageBg = d.backgroundType === 'image' && !!d.backgroundImage;
  const bgStyle: React.CSSProperties = isImageBg
    ? {}
    : { backgroundColor: d.backgroundColor || '#272727' };

  const textGroup = (
    <div className={styles.textGroup}>
      {d.title?.length > 0 && (
        <Editable as="h2" className={styles.title} path="title.0" value={(d.title ?? []).join(' ')} />
      )}
      {d.description && (
        <Editable as="p" className={styles.description} path="description" value={d.description} multiline />
      )}
    </div>
  );

  const ctaRow =
    ctas.length > 0 ? (
      <div className={styles.ctaRow}>
        {ctas.map((c, i) => (
          <PromoCta key={i} cta={c} color={contentColor} path={`ctas.${i}.text`} />
        ))}
      </div>
    ) : null;

  const mediaCard = (
    <div className={styles.mediaCard}>
      {d.image ? (
        <img src={d.image} alt="" className={styles.mediaImage} loading="lazy" />
      ) : (
        <div className={styles.mediaPlaceholder} aria-hidden="true">
          <Icon name="photo-image-default" size={56} />
        </div>
      )}
    </div>
  );

  // ---- layout video ----
  if (layout === 'video') {
    const autoplay = d.autoplay !== false;
    const isYT = d.videoType === 'youtube';
    const ytId = isYT ? parseYouTubeId(d.videoUrl || '') : null;

    return (
      <section
        ref={(node) => {
          videoSectionRef.current = node;
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        aria-label="Banner de vídeo"
        className={`${styles.videoSection} scroll-reveal ${isVisible ? 'visible' : ''}`}
      >
        <div className={styles.videoWrap}>
          {isYT ? (
            ytId ? (
              <YoutubeEmbed ytId={ytId} autoplay={autoplay} sectionRef={videoSectionRef} />
            ) : (
              <div className={styles.videoPlaceholder}>URL do YouTube inválida ou não informada</div>
            )
          ) : d.videoSrc ? (
            <UploadedVideo src={d.videoSrc} autoplay={autoplay} sectionRef={videoSectionRef} />
          ) : (
            <div className={styles.videoPlaceholder}>Nenhum vídeo configurado</div>
          )}
          {/* Em edit mode, overlay transparente sobre o vídeo para que o
              clique suba até o wrapper de seleção do DynamicPage. Sem isso,
              o <iframe> captura o evento e o bloco nunca é selecionado. */}
          {editMode && (
            <div
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer' }}
            />
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-label="Banner promocional"
      className={[
        styles.section,
        curtain ? styles.curtain : '',
        contentColor === 'dark' ? styles.contentDark : styles.contentLight,
        'scroll-reveal',
        isVisible ? 'visible' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={bgStyle}
    >
      {isImageBg && (
        <div className={styles.bgLayer} aria-hidden="true">
          <img src={d.backgroundImage} alt="" className={styles.bgImage} loading="lazy" />
        </div>
      )}

      <div className={styles.inner}>
        {layout === 'split' ? (
          <div className={`${styles.split} ${splitLeft ? styles.splitReverse : ''}`}>
            <div className={styles.splitText}>
              {textGroup}
              {ctaRow}
            </div>
            {mediaCard}
          </div>
        ) : (
          <div className={styles.centered}>
            {textGroup}
            {ctaRow}
          </div>
        )}
      </div>
    </section>
  );
}
