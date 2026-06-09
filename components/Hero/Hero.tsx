'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { events } from '@/lib/gtag';
import styles from './Hero.module.css';

const defaultData = {
  title: ['Seu negócio pede', 'ecossistema conectado'],
  description: 'Delivery, salão, pagamentos e logística em um só lugar. Conecte sua operação, amplifique seu crescimento e ofereça a melhor experiência aos seus clientes.',
  cta_text: 'Conheça',
  cta_link: '#',
  background_image: '/images/ifood/bg_ifood_ecossistema.png',
  logo_decoration: '/images/ifood/Logo_decoration.svg',
  variant: 'image-left' as 'image-left' | 'image-right' | 'image-overlay' | 'full-width',
};

interface HeroData {
  title: string[];
  description: string;
  cta_text: string;
  cta_link: string;
  background_image: string;
  logo_decoration?: string;
  variant?: string;
}

interface HeroProps {
  data?: HeroData;
}

// Shared CTA — <a href> so crawlers follow the link (buttons are not crawlable)
function CtaLink({ href, text, light, center }: { href: string; text: string; light?: boolean; center?: boolean }) {
  return (
    <a
      href={href}
      className={`${styles.ctaButton} ${light ? styles.ctaButtonLight : ''}`}
      style={center ? { alignSelf: 'center' } : undefined}
      onClick={() => events.heroCta(text)}
    >
      <span>{text}</span>
      <img
        src="/images/ifood/icon-chevron-right.svg"
        alt=""
        aria-hidden="true"
        className={styles.chevronIcon}
      />
    </a>
  );
}

export default function Hero({ data }: HeroProps) {
  const d = data ?? defaultData;
  const { ref, isVisible } = useScrollReveal();
  const variant = d.variant || 'image-left';

  if (variant === 'image-right') return <HeroImageRight d={d} ref={ref} isVisible={isVisible} />;
  if (variant === 'image-overlay') return <HeroImageOverlay d={d} ref={ref} isVisible={isVisible} />;
  if (variant === 'full-width') return <HeroFullWidth d={d} ref={ref} isVisible={isVisible} />;
  return <HeroImageLeft d={d} ref={ref} isVisible={isVisible} />;
}

// Variant 1: Image on Left (default)
function HeroImageLeft({ d, ref, isVisible }: any) {
  return (
    <section ref={ref} aria-label="Hero" className={`${styles.hero} ${styles.variantImageLeft} scroll-reveal ${isVisible ? 'visible' : ''}`}>
      <div className={styles.backgroundContainer} aria-hidden="true">
        <img src={d.background_image} alt="" className={styles.backgroundImage} />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>
            {d.title.map((line: string, i: number) => <span key={i}>{line}</span>)}
          </h1>
          <p className={styles.description}>{d.description}</p>
          <CtaLink href={d.cta_link} text={d.cta_text} />
        </div>
        {d.logo_decoration && (
          <img
            src={d.logo_decoration}
            alt=""
            aria-hidden="true"
            className={styles.logoDecor}
            style={{ width: '209px', height: '105px' }}
          />
        )}
      </div>
    </section>
  );
}

// Variant 2: Image on Right
function HeroImageRight({ d, ref, isVisible }: any) {
  return (
    <section ref={ref} aria-label="Hero" className={`${styles.hero} ${styles.variantImageRight} scroll-reveal ${isVisible ? 'visible' : ''}`}>
      <div className={styles.backgroundContainer} aria-hidden="true">
        <img src={d.background_image} alt="" className={styles.backgroundImage} />
      </div>
      <div className={styles.contentWrapper} style={{ flexDirection: 'row-reverse' }}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>
            {d.title.map((line: string, i: number) => <span key={i}>{line}</span>)}
          </h1>
          <p className={styles.description}>{d.description}</p>
          <CtaLink href={d.cta_link} text={d.cta_text} />
        </div>
        {d.logo_decoration && (
          <img
            src={d.logo_decoration}
            alt=""
            aria-hidden="true"
            className={styles.logoDecor}
            style={{ width: '209px', height: '105px' }}
          />
        )}
      </div>
    </section>
  );
}

// Variant 3: Image as Overlay (centered text over image)
function HeroImageOverlay({ d, ref, isVisible }: any) {
  return (
    <section ref={ref} aria-label="Hero" className={`${styles.hero} ${styles.variantImageOverlay} scroll-reveal ${isVisible ? 'visible' : ''}`}>
      <div className={styles.backgroundContainer} aria-hidden="true">
        <img src={d.background_image} alt="" className={styles.backgroundImage} />
        <div className={styles.overlayGradient} />
      </div>
      <div className={`${styles.contentWrapper} ${styles.overlayContent}`}>
        <div className={styles.textContent} style={{ textAlign: 'center', color: 'white', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '120px' }}>
          <h1 className={styles.title} style={{ color: 'white', textAlign: 'center' }}>
            {d.title.map((line: string, i: number) => <span key={i}>{line}</span>)}
          </h1>
          <p className={styles.description} style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center' }}>
            {d.description}
          </p>
          <CtaLink href={d.cta_link} text={d.cta_text} light center />
        </div>
      </div>
    </section>
  );
}

// Variant 4: Full Width
function HeroFullWidth({ d, ref, isVisible }: any) {
  return (
    <section ref={ref} aria-label="Hero" className={`${styles.hero} ${styles.variantFullWidth} scroll-reveal ${isVisible ? 'visible' : ''}`}>
      <div className={styles.backgroundContainer} style={{ height: '100vh' }} aria-hidden="true">
        <img src={d.background_image} alt="" className={styles.backgroundImage} style={{ objectFit: 'cover' }} />
      </div>
      <div className={`${styles.contentWrapper} ${styles.fullWidthContent}`} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        <div className={styles.textContent} style={{ textAlign: 'center', color: 'white', maxWidth: '600px' }}>
          <h1 className={styles.title} style={{ color: 'white', fontSize: '3rem' }}>
            {d.title.map((line: string, i: number) => <span key={i}>{line}</span>)}
          </h1>
          <p className={styles.description} style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>
            {d.description}
          </p>
          <CtaLink href={d.cta_link} text={d.cta_text} light />
        </div>
      </div>
    </section>
  );
}
