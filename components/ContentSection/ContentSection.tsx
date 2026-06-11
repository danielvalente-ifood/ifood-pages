'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Icon } from '@/components/Icon/Icon';
import { Button } from '@/components/Button/Button';
import { Editable } from '@/components/edit/Editable';
import { EditableImage } from '@/components/edit/EditableImage';
import styles from './ContentSection.module.css';

export interface ContentSectionCTA {
  text: string;
  link: string;
  style?: 'primary' | 'secondary';
}

export interface ContentSectionData {
  badge?: string;
  /** título multi-linha (uma string por linha) */
  title: string[];
  description?: string;
  /** imagem do card; vazio = placeholder */
  image?: string;
  /** posição do card de imagem — única variação de layout */
  assetPosition?: 'left' | 'right';
  /** 0, 1 ou 2 CTAs (botões) */
  ctas?: ContentSectionCTA[];
}

const defaultData: ContentSectionData = {
  badge: 'Comer fora',
  title: ['Atraia clientes do delivery', 'para o salão'],
  description: 'Ative sua base de clientes delivery para visitarem seu restaurante.',
  image: '',
  assetPosition: 'left',
  ctas: [
    { text: 'Ativar agora', link: '#', style: 'primary' },
    { text: 'Saiba mais', link: '#', style: 'secondary' },
  ],
};

interface ContentSectionProps {
  data?: ContentSectionData;
}

/**
 * ContentSection herda o fundo claro da página → botões no esquema "dark":
 *   primary   → fill dark   (fundo #141414, texto branco)
 *   secondary → stroke dark (borda rgba(0,0,0,0.16), texto #141414)
 */
function ContentCta({ cta }: { cta: ContentSectionCTA }) {
  const secondary = cta.style === 'secondary';
  return (
    <Button
      href={cta.link || '#'}
      label={cta.text}
      variant={secondary ? 'stroke' : 'fill'}
      color="dark"
      content="text-icon"
    />
  );
}

export default function ContentSection({ data }: ContentSectionProps) {
  const { ref, isVisible } = useScrollReveal();
  const d = data ?? defaultData;
  const left = (d.assetPosition || 'left') === 'left';
  const ctas = (d.ctas ?? []).slice(0, 2);

  const media = (
    <div className={styles.mediaCard}>
      <EditableImage
        path="image"
        src={d.image}
        className={styles.mediaImage}
        placeholderClassName={styles.mediaPlaceholder}
        placeholder={<Icon name="photo-image-default" size={56} />}
      />
    </div>
  );

  const content = (
    <div className={styles.textColumn}>
      <div className={styles.textGroup}>
        {d.badge && (
          <Editable as="span" className={styles.badge} path="badge" value={d.badge} />
        )}
        {d.title?.length > 0 && (
          <Editable as="h2" className={styles.title} path="title.0" value={(d.title ?? []).join(' ')} />
        )}
        {d.description && (
          <Editable as="p" className={styles.description} path="description" value={d.description} multiline />
        )}
      </div>

      {ctas.length > 0 && (
        <div className={styles.ctaRow}>
          {ctas.map((c, i) => (
            <ContentCta key={i} cta={c} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section
      ref={ref}
      aria-label="Conteúdo"
      className={`${styles.section} scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className={`${styles.inner} ${left ? '' : styles.innerReverse}`}>
        {media}
        {content}
      </div>
    </section>
  );
}
