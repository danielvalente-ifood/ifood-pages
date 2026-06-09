'use client';

import { useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { events } from '@/lib/gtag';
import styles from './Hero.module.css';

export type HeroVariant = 'full' | 'slider' | 'centered' | 'split-image' | 'split-form';

export interface HeroCTA {
  text: string;
  link: string;
  style?: 'primary' | 'secondary';
}

export interface HeroSlide {
  title: string[];
  description: string;
  ctas?: HeroCTA[];
  background_image?: string;
}

export interface HeroForm {
  title: string;
  subtitle: string;
  label: string;
  placeholder: string;
  button_text: string;
  legal: string;
  legal_link_text: string;
  legal_link: string;
}

export interface HeroData {
  variant?: HeroVariant;
  title: string[];
  description: string;
  ctas?: HeroCTA[];
  /** full / slider — imagem de fundo (modo banner único) */
  background_image?: string;
  /** split-image — imagem do card */
  image?: string;
  /** split-image — posição do card de imagem */
  assetPosition?: 'left' | 'right';
  /** full / slider — ativa o modo slider */
  slider?: boolean;
  /** full / slider — slides (máx. 3) quando slider=true */
  slides?: HeroSlide[];
  /** split-form — campos do formulário */
  form?: HeroForm;
}

const defaultData: HeroData = {
  variant: 'full',
  title: ['Atraia mais clientes e venda', 'mais com o Comer Fora'],
  description:
    'Delivery, salão, pagamentos e logística em um só lugar. Conecte sua operação, amplifique seu crescimento e ofereça a melhor experiência aos seus clientes.',
  ctas: [
    { text: 'Começar agora', link: '#', style: 'primary' },
    { text: 'Saiba mais', link: '#', style: 'secondary' },
  ],
  // Sem imagem por padrão — fundo escuro (#272727) serve de placeholder.
  background_image: '',
};

interface HeroProps {
  data?: HeroData;
}

/* ---------- peças compartilhadas ---------- */

function Chevron() {
  return (
    <svg
      className={styles.chevron}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

function Cta({ cta }: { cta: HeroCTA }) {
  const secondary = cta.style === 'secondary';
  return (
    <a
      href={cta.link || '#'}
      className={`${styles.cta} ${secondary ? styles.ctaSecondary : styles.ctaPrimary}`}
      onClick={() => events.heroCta(cta.text)}
    >
      <span>{cta.text}</span>
      <Chevron />
    </a>
  );
}

function CtaRow({ ctas, center }: { ctas?: HeroCTA[]; center?: boolean }) {
  const list = (ctas ?? []).slice(0, 2);
  if (list.length === 0) return null;
  return (
    <div className={`${styles.ctaRow} ${center ? styles.ctaRowCenter : ''}`}>
      {list.map((c, i) => (
        <Cta key={i} cta={c} />
      ))}
    </div>
  );
}

function TextGroup({
  title,
  description,
  center,
}: {
  title: string[];
  description: string;
  center?: boolean;
}) {
  return (
    <div className={`${styles.textGroup} ${center ? styles.textGroupCenter : ''}`}>
      <h1 className={styles.title}>
        {(title ?? []).map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </h1>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}

function SliderDots({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className={styles.dotsWrap}>
      <div className={styles.dots}>
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => onSelect(i)}
            aria-label={`Ir para o slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- hook do slider ---------- */

function useSlider(length: number, enabled: boolean) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!enabled || length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % length);
    }, 6000);
    return () => clearInterval(timer);
  }, [enabled, length]);

  const select = useCallback((i: number) => setActive(i), []);
  return { active, select };
}

/* ---------- componente principal ---------- */

export default function Hero({ data }: HeroProps) {
  const d = data ?? defaultData;
  const variant: HeroVariant = d.variant || 'full';

  if (variant === 'centered') return <HeroCentered d={d} />;
  if (variant === 'split-image') return <HeroSplitImage d={d} />;
  if (variant === 'split-form') return <HeroSplitForm d={d} />;
  // full e slider compartilham a base com imagem de fundo
  return <HeroBackground d={d} variant={variant} />;
}

/* ---------- full / slider ---------- */

function HeroBackground({ d, variant }: { d: HeroData; variant: HeroVariant }) {
  const { ref, isVisible } = useScrollReveal();

  const panels: HeroSlide[] =
    d.slider && d.slides && d.slides.length > 0
      ? d.slides.slice(0, 3)
      : [
          {
            title: d.title,
            description: d.description,
            ctas: d.ctas,
            background_image: d.background_image,
          },
        ];

  const isSlider = panels.length > 1;
  const { active, select } = useSlider(panels.length, isSlider);
  const panel = panels[active] ?? panels[0];

  return (
    <section
      ref={ref}
      aria-label="Hero"
      className={`${styles.hero} ${variant === 'full' ? styles.heroFull : styles.heroSlider} scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className={styles.bgLayer} aria-hidden="true">
        {panels.map((p, i) =>
          p.background_image ? (
            <img
              key={i}
              src={p.background_image}
              alt=""
              className={`${styles.bgImage} ${i === active ? styles.bgImageActive : ''}`}
            />
          ) : null
        )}
        {/* Scrim só quando há imagem — para legibilidade do texto sobre a foto */}
        {panel.background_image && <div className={styles.bgScrim} />}
      </div>

      <div className={styles.inner}>
        <div className={styles.textBlock}>
          <TextGroup title={panel.title} description={panel.description} />
          <CtaRow ctas={panel.ctas} />
        </div>

        {isSlider && <SliderDots count={panels.length} active={active} onSelect={select} />}
      </div>
    </section>
  );
}

/* ---------- centered (Type3) ---------- */

function HeroCentered({ d }: { d: HeroData }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      aria-label="Hero"
      className={`${styles.hero} ${styles.heroCentered} scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className={`${styles.inner} ${styles.innerCentered}`}>
        <div className={styles.textBlock}>
          <TextGroup title={d.title} description={d.description} center />
          <CtaRow ctas={d.ctas} center />
        </div>
      </div>
    </section>
  );
}

/* ---------- split-image (Type4) ---------- */

function HeroSplitImage({ d }: { d: HeroData }) {
  const { ref, isVisible } = useScrollReveal();
  const right = (d.assetPosition || 'right') === 'right';
  return (
    <section
      ref={ref}
      aria-label="Hero"
      className={`${styles.hero} ${styles.heroSplit} scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className={`${styles.inner} ${styles.innerSplit} ${right ? '' : styles.innerSplitReverse}`}>
        <div className={styles.textBlock}>
          <TextGroup title={d.title} description={d.description} />
          <CtaRow ctas={d.ctas} />
        </div>
        <div className={styles.mediaCard}>
          {d.image ? (
            <img src={d.image} alt="" className={styles.mediaImage} />
          ) : (
            <div className={styles.mediaPlaceholder} aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- split-form (Type5) ---------- */

function HeroSplitForm({ d }: { d: HeroData }) {
  const { ref, isVisible } = useScrollReveal();
  const right = (d.assetPosition || 'right') === 'right';
  const f = d.form ?? {
    title: 'Título',
    subtitle: 'Subtítulo',
    label: 'Label',
    placeholder: 'Placeholder',
    button_text: 'Enviar',
    legal: 'Ao continuar, você concorda com nossos termos.',
    legal_link_text: 'Saiba mais',
    legal_link: '#',
  };

  return (
    <section
      ref={ref}
      aria-label="Hero"
      className={`${styles.hero} ${styles.heroSplit} scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className={`${styles.inner} ${styles.innerSplit} ${right ? '' : styles.innerSplitReverse}`}>
        <div className={styles.textBlock}>
          <TextGroup title={d.title} description={d.description} />
        </div>

        <form className={styles.formCard} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formHeader}>
            <span className={styles.formTitle}>{f.title}</span>
            {f.subtitle && <span className={styles.formSubtitle}>{f.subtitle}</span>}
          </div>

          <div className={styles.formField}>
            {f.label && <label className={styles.formLabel}>{f.label}</label>}
            <input className={styles.formInput} placeholder={f.placeholder} aria-label={f.label || 'Campo'} />
          </div>

          <button type="submit" className={styles.formButton}>
            <span>{f.button_text}</span>
            <Chevron />
          </button>

          {f.legal && (
            <p className={styles.formLegal}>
              {f.legal}{' '}
              {f.legal_link_text && (
                <a href={f.legal_link || '#'} className={styles.formLegalLink}>
                  {f.legal_link_text}
                </a>
              )}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
