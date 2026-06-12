'use client';

import { useState, useEffect, useCallback, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { events } from '@/lib/gtag';
import { Button } from '@/components/Button/Button';
import { EditableButton } from '@/components/edit/EditableButton';
import { Editable } from '@/components/edit/Editable';
import { EditableImage } from '@/components/edit/EditableImage';
import { useEdit } from '@/components/edit/EditContext';
import styles from './Hero.module.css';

export type HeroVariant = 'full' | 'slider' | 'centered' | 'split-image' | 'split-form';

export interface HeroCTA {
  text: string;
  link: string;
  style?: 'primary' | 'secondary' | 'empty';
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

/**
 * Hero usa fundo escuro em todas as variantes → botões no esquema "light"
 * (fill light = branco preenchido; stroke light = borda branca transparente)
 */
function Cta({ cta, path }: { cta: HeroCTA; path: string }) {
  const variant = cta.style === 'secondary' ? 'stroke' : cta.style === 'empty' ? 'empty' : 'fill';
  return (
    <EditableButton
      path={path}
      href={cta.link || '#'}
      label={cta.text}
      variant={variant}
      color="light"
      content="text-icon"
      onClick={() => events.heroCta(cta.text)}
    />
  );
}

function CtaRow({ ctas, center, basePath = 'ctas' }: { ctas?: HeroCTA[]; center?: boolean; basePath?: string }) {
  const list = (ctas ?? []).slice(0, 2);
  if (list.length === 0) return null;
  return (
    <div className={`${styles.ctaRow} ${center ? styles.ctaRowCenter : ''}`}>
      {list.map((c, i) => (
        <Cta key={i} cta={c} path={`${basePath}.${i}.text`} />
      ))}
    </div>
  );
}

function TextGroup({
  title,
  description,
  center,
  pathPrefix = '',
}: {
  title: string[];
  description: string;
  center?: boolean;
  /** prefixo de path para edição inline (ex: 'slides.0.') */
  pathPrefix?: string;
}) {
  // Título é uma única string que quebra automaticamente (máx. 3 linhas via CSS).
  // Arrays legados (linha 1 / linha 2) são unidos num texto só.
  const titleText = (title ?? []).join(' ');
  return (
    <div className={`${styles.textGroup} ${center ? styles.textGroupCenter : ''}`}>
      <Editable as="h1" className={styles.title} path={`${pathPrefix}title.0`} value={titleText} />
      <Editable
        as="p"
        className={styles.description}
        path={`${pathPrefix}description`}
        value={description ?? ''}
        multiline
      />
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
    }, 5000);
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
      ? d.slides.slice(0, 3).map(s => ({ ...s, description: s.description ?? '' }))
      : [
          {
            title: d.title,
            description: d.description ?? '',
            ctas: d.ctas,
            background_image: d.background_image,
          },
        ];

  const { editMode } = useEdit();
  const isSlider = panels.length > 1;
  // Autoplay (5s) roda sempre que há slides; pausa ao passar o mouse por cima
  // (assim dá pra editar o conteúdo inline sem ele trocar sozinho).
  const [paused, setPaused] = useState(false);
  const { active, select } = useSlider(panels.length, isSlider && !paused);
  const panel = panels[active] ?? panels[0];

  const goTo = useCallback(
    (i: number) => select(((i % panels.length) + panels.length) % panels.length),
    [select, panels.length]
  );

  // ---- swipe / drag horizontal (touch + mouse) ----
  const dragStartX = useRef<number | null>(null);
  const onPointerDown = (e: ReactPointerEvent) => {
    if (!isSlider) return;
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e: ReactPointerEvent) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) > 45) goTo(active + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      ref={ref}
      aria-label="Hero"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (dragStartX.current = null)}
      onMouseEnter={() => isSlider && setPaused(true)}
      onMouseLeave={() => isSlider && setPaused(false)}
      style={isSlider ? { touchAction: 'pan-y' } : undefined}
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
      </div>

      <div className={styles.inner}>
        {/* key={active} re-monta o bloco a cada troca → dispara a animação de entrada */}
        <div key={active} className={`${styles.textBlock} ${isSlider ? styles.slideEnter : ''}`}>
          <TextGroup
            title={panel.title}
            description={panel.description}
            pathPrefix={isSlider ? `slides.${active}.` : ''}
          />
          <CtaRow ctas={panel.ctas} basePath={isSlider ? `slides.${active}.ctas` : 'ctas'} />
        </div>

        {isSlider && <SliderDots count={panels.length} active={active} onSelect={goTo} />}
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
          <EditableImage
            path="image"
            src={d.image}
            className={styles.mediaImage}
            placeholderClassName={styles.mediaPlaceholder}
            placeholder={
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            }
          />
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

          <Button
            type="submit"
            label={f.button_text}
            variant="fill"
            color="dark"
            content="text-icon"
            className={styles.formButton}
          />

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
