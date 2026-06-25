'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './BigNumbersTestimonial.module.css';

export interface BigNumbersTestimonialStat {
  value: string;
  description: string;
}

export interface BigNumbersTestimonialCard {
  rating: number;
  quote: string;
  author: string;
  company: string;
}

export interface BigNumbersTestimonialData {
  badge?: string;
  title: string;
  stats: BigNumbersTestimonialStat[];
  testimonials: BigNumbersTestimonialCard[];
  /** 'default' = big numbers + depoimentos · 'triple' = apenas 3 cards lado a lado */
  variant?: 'default' | 'triple';
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className={styles.stars} aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={i < count ? '#F5A623' : 'rgba(255,255,255,0.15)'}
          />
        </svg>
      ))}
    </div>
  );
}

const DEFAULTS: BigNumbersTestimonialData = {
  badge: 'Resultados reais',
  title: 'Números que falam por si',
  stats: [
    { value: '+30%', description: 'de economia de tempo\nno fechamento de caixa' },
    { value: 'R$0', description: 'de comissão em pedidos\npelo cardápio próprio' },
    { value: '-40%', description: 'de desistência\nna fila de espera' },
  ],
  testimonials: [
    {
      rating: 5,
      quote: 'Nós precisávamos de um sistema que nos entregasse muita agilidade, rapidez e principalmente a integração dos aplicativos, e a Saipos nos trouxe isso.',
      author: 'Lucas Xavier, sócio',
      company: 'Frango Loco',
    },
    {
      rating: 5,
      quote: 'O robô de WhatsApp pagou o plano inteiro só no primeiro mês. Os clientes adoram e eu não perco mais pedido.',
      author: 'Ana R.',
      company: 'Hamburgueria Artesanal',
    },
    {
      rating: 5,
      quote: 'A fila digital foi um divisor de águas. Zero cliente foi embora sem sentar desde que ativamos.',
      author: 'João P.',
      company: 'Restaurante A La Carte',
    },
  ],
};

function TestimonialCard({ t, quoteClass }: { t: BigNumbersTestimonialCard; quoteClass: string }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <Stars count={t.rating} />
        <p className={quoteClass}>{t.quote}</p>
      </div>
      <div className={styles.author}>
        <span className={styles.authorName}>{t.author}</span>
        <span className={styles.company}>{t.company}</span>
      </div>
    </article>
  );
}

export default function BigNumbersTestimonial({ data }: { data?: BigNumbersTestimonialData }) {
  const { ref, isVisible } = useScrollReveal();
  const d = data ?? DEFAULTS;
  const isTriple = d.variant === 'triple';

  if (isTriple) {
    return (
      <section ref={ref} className={`${styles.section} ${styles.sectionTriple} scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className={styles.inner}>
          <div className={styles.headerTriple}>
            {d.badge && <div className={styles.badge}>{d.badge}</div>}
            <h2 className={styles.titleTriple}>{d.title}</h2>
          </div>
          <div className={styles.cardsTriple}>
            {d.testimonials.slice(0, 3).map((t, i) => (
              <TestimonialCard key={i} t={t} quoteClass={styles.quoteTriple} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className={`${styles.section} scroll-reveal ${isVisible ? 'visible' : ''}`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          {d.badge && <div className={styles.badge}>{d.badge}</div>}
          <h2 className={styles.title}>{d.title}</h2>
        </div>

        <div className={styles.statsRow} role="list">
          {d.stats.map((stat, i) => (
            <div key={i} className={styles.statItem} role="listitem">
              <span className={styles.statValue}>{stat.value}</span>
              <p className={styles.statDesc}>
                {stat.description.split('\n').map((line, j, arr) => (
                  <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                ))}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.cards}>
          {d.testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} quoteClass={styles.quote} />
          ))}
        </div>
      </div>
    </section>
  );
}
