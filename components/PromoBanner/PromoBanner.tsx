'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Icon } from '@/components/Icon/Icon';
import { EditableButton } from '@/components/edit/EditableButton';
import { Editable } from '@/components/edit/Editable';
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

function YoutubeEmbed({ ytId, autoplay }: { ytId: string; autoplay: boolean }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const visibleRef = useRef(false);
  const [ready, setReady] = useState(false);

  const send = (func: 'playVideo' | 'pauseVideo') => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args: '' }),
      '*'
    );
  };

  // IntersectionObserver: play na entrada, pause na saída
  useEffect(() => {
    if (!autoplay) return;
    const iframe = iframeRef.current;
    if (!iframe) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (ready) send(entry.isIntersecting ? 'playVideo' : 'pauseVideo');
      },
      { threshold: 0.3 }
    );
    observer.observe(iframe);
    return () => observer.disconnect();
  }, [autoplay, ready]);

  const handleLoad = () => {
    setReady(true);
    if (autoplay && visibleRef.current) send('playVideo');
  };

  // URL sem autoplay nem mute — controle via postMessage
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

function UploadedVideo({ src, autoplay }: { src: string; autoplay: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!autoplay) return;
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [autoplay]);

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
      <section ref={ref} aria-label="Banner de vídeo" className={`${styles.videoSection} scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className={styles.videoWrap}>
          {isYT ? (
            ytId ? (
              <YoutubeEmbed ytId={ytId} autoplay={autoplay} />
            ) : (
              <div className={styles.videoPlaceholder}>URL do YouTube inválida ou não informada</div>
            )
          ) : d.videoSrc ? (
            <UploadedVideo src={d.videoSrc} autoplay={autoplay} />
          ) : (
            <div className={styles.videoPlaceholder}>Nenhum vídeo configurado</div>
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
