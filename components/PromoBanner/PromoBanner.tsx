'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Icon } from '@/components/Icon/Icon';
import { EditableButton } from '@/components/edit/EditableButton';
import { Editable } from '@/components/edit/Editable';
import styles from './PromoBanner.module.css';

export interface PromoBannerCTA {
  text: string;
  link: string;
  style?: 'primary' | 'secondary' | 'empty';
}

export interface PromoBannerData {
  /** centered = texto centralizado · split = texto + card de imagem */
  layout?: 'centered' | 'split';
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
  const variant = cta.style === 'secondary' ? 'stroke' : cta.style === 'empty' ? 'empty' : 'fill';
  return (
    <EditableButton
      path={path}
      href={cta.link || '#'}
      label={cta.text}
      variant={variant}
      color={color}
      content="text-icon"
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
        <img src={d.image} alt="" className={styles.mediaImage} />
      ) : (
        <div className={styles.mediaPlaceholder} aria-hidden="true">
          <Icon name="photo-image-default" size={56} />
        </div>
      )}
    </div>
  );

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
          <img src={d.backgroundImage} alt="" className={styles.bgImage} />
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
