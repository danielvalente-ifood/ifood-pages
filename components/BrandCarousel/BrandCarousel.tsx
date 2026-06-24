'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { EditableImage } from '@/components/edit/EditableImage';
import styles from './BrandCarousel.module.css';

export interface BrandCarouselLogo {
  src: string;
  alt?: string;
}

export interface BrandCarouselData {
  badge?: string;
  title: string;
  logos: BrandCarouselLogo[];
}

const DEFAULTS: BrandCarouselData = {
  badge: 'Empresas parceiras',
  title: 'Empresas de todos os portes utilizam e aprovam nossas soluções',
  logos: Array.from({ length: 11 }, () => ({ src: '', alt: '' })),
};

export default function BrandCarousel({ data }: { data?: BrandCarouselData }) {
  const { ref, isVisible } = useScrollReveal();
  const d = data ?? DEFAULTS;

  return (
    <section ref={ref} className={`${styles.section} scroll-reveal ${isVisible ? 'visible' : ''}`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          {d.badge && <div className={styles.badge}>{d.badge}</div>}
          {/* title oculto intencionalmente — mantido no data para SEO/acessibilidade */}
          <h2 className={styles.title} aria-hidden="true" style={{ display: 'none' }}>{d.title}</h2>
        </div>

        <div className={styles.logosRow} role="list" aria-label="Logos de parceiros">
          {d.logos.map((logo, i) => (
            <div key={i} className={styles.logoSlot} role="listitem">
              <EditableImage
                src={logo.src}
                alt={logo.alt ?? `Parceiro ${i + 1}`}
                path={`logos.${i}.src`}
                className={styles.logoImg}
                placeholderClassName={styles.logoPlaceholder}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
