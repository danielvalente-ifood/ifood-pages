'use client';

import { useState, useRef, useEffect } from 'react';
import Badge from '@/components/Badge/Badge';
import { Editable } from '@/components/edit/Editable';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Results.module.css';

const defaultData = {
  badge: 'Resultado na prática',
  title: ['O que nossos parceiros estão falando', 'sobre vender com o iFood'],
  testimonials: [
    { id: 1, name: 'Gabriel', company: 'Pizza prime', image: '/images/ifood/Gabriel_pizzaprime.png', main_quote: 'O iFood nos ajudou a triplicar a quantidade de clientes.', full_quote: 'As estratégias do iFood ajudaram a Pizza Prime a crescer e alcançar novos públicos. Hoje vendemos 2,5 milhões de pizzas por ano!', rating: 5 },
    { id: 4, name: 'Ana Paula', company: 'Padaria da Vila', image: '/images/ifood/testimoniial_4.png', main_quote: 'Expandimos para delivery sem gastar com estrutura própria.', full_quote: 'Éramos só uma padaria local. O iFood nos deu alcance municipal em poucos meses. Hoje nossos pães chegam frescos em qualquer bairro da cidade!', rating: 5 },
    { id: 3, name: 'Roberto', company: 'Churrascaria Premium', image: '/images/ifood/testimoniial_3.png', main_quote: 'Nossos clientes aumentaram de forma consistente e previsível.', full_quote: 'Com as ferramentas do iFood conseguimos entender melhor nossos clientes e personalizar ofertas. O resultado foi um aumento de 140% na receita anual!', rating: 5 },
    { id: 2, name: 'Marina', company: 'Sushi & Roll', image: '/images/ifood/testimoniial_2.png', main_quote: 'Aumentamos em 180% nossas vendas no primeiro ano.', full_quote: 'O iFood abriu portas que não imaginávamos. Começamos com um restaurante pequeno e hoje temos três filiais. A plataforma transformou nosso negócio!', rating: 5 },
    { id: 5, name: 'Lucas', company: 'Boteco do Lucas', image: '/images/ifood/testimoniial_5.png', main_quote: 'Nosso bar virou referência na região graças ao iFood.', full_quote: 'Éramos um bar tradicional com público local. O iFood expandiu nosso alcance para toda a região. Hoje somos o bar mais pedido do bairro!', rating: 5 },
    { id: 6, name: 'Beatriz', company: 'Café Aroma', image: '/images/ifood/testimoniial_6.png', main_quote: 'Triplicamos a quantidade de pedidos em apenas 6 meses.', full_quote: 'O iFood foi fundamental para nossa expansão. Conseguimos alcançar clientes que nunca entrariam na loja física. Nosso faturamento cresceu exponencialmente!', rating: 5 },
  ],
};

interface ResultsData {
  badge: string;
  title: string[];
  testimonials: typeof defaultData.testimonials;
  variant?: 'default' | 'featured';
}

interface ResultsProps {
  data?: ResultsData;
}

/* ---- Stars helper ---- */
function Stars({ rating }: { rating: number }) {
  return (
    <div className={styles.featuredStars} aria-label={`${rating} de 5 estrelas`} role="img">
      {Array.from({ length: rating }).map((_, i) => (
        <span key={i} aria-hidden="true" className={styles.star}>★</span>
      ))}
    </div>
  );
}

export default function Results({ data }: ResultsProps) {
  const d = (data ?? defaultData) as ResultsData;
  // Map to internal format used in rendering
  const testimonials = d.testimonials.map(t => ({
    ...t,
    mainQuote: t.main_quote,
    fullQuote: `"${t.full_quote}"`,
  }));
  const { ref, isVisible } = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  /* ---- variante featured ---- */
  if (d.variant === 'featured') {
    const t = testimonials[activeIndex] ?? testimonials[0];
    return (
      <section
        ref={ref}
        className={`${styles.featuredSection} scroll-reveal ${isVisible ? 'visible' : ''}`}
      >
        {/* Header */}
        <div className={styles.featuredHeader}>
          <Badge text={d.badge} editPath="badge" />
          <h2 className={styles.featuredTitle}>
            {d.title.map((line, i) => (
              <Editable key={i} as="p" path={`title.${i}`} value={line} />
            ))}
          </h2>
        </div>

        {/* Card grande */}
        <div className={styles.featuredCard}>
          <div className={styles.featuredAuthor}>
            <span className={styles.featuredName}>{t.name}</span>
            <span className={styles.featuredRole}>{t.company}</span>
          </div>
          <div className={styles.featuredQuoteBlock}>
            <Stars rating={t.rating} />
            <p className={styles.featuredQuote}>{t.mainQuote}</p>
          </div>
        </div>

        {/* Dots navigation */}
        {testimonials.length > 1 && (
          <div className={styles.featuredDots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Depoimento ${i + 1}`}
                className={`${styles.featuredDot} ${i === activeIndex ? styles.featuredDotActive : ''}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      </section>
    );
  }

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const cardWidth = 420 + 10; // card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      // Map to 3 indicator groups: [0,1]=0, [2,3]=1, [4,5]=2
      const indicatorIndex = Math.min(Math.floor(index / 2), 2);
      setActiveIndex(indicatorIndex);
    }
  };

  const totalIndicators = 3;

  return (
    <section ref={ref} className={`${styles.container} scroll-reveal ${isVisible ? 'visible' : ''}`}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <Badge text={d.badge} editPath="badge" />
        <h2 className={styles.title}>
          {d.title.map((line, i) => (
            <Editable key={i} as="p" path={`title.${i}`} value={line} />
          ))}
        </h2>
      </div>

      {/* Testimonials Slider */}
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderContainer} ref={sliderRef} onScroll={handleScroll}>
          {testimonials.map((testimonial, index) => {
            const isVisualCard = index < 2 || index >= 4; // First two (0,1) and from index 4+ are visual cards

            // Position each item in the grid
            let gridColumn: number | string = index + 1;
            let gridRow: number | string = '1 / span 2';

            if (index === 2) { // Roberto
              gridColumn = 3;
              gridRow = 1;
            } else if (index === 3) { // Marina
              gridColumn = 3;
              gridRow = 2;
            } else if (index >= 4) { // Lucas, Beatriz e próximos
              gridColumn = index;
              gridRow = '1 / span 2';
            }

            return (
              <div
                key={testimonial.id}
                className={`${styles.sliderItem} ${isVisualCard ? styles.visualCard : styles.quoteCard}`}
                style={{ gridColumn, gridRow }}
              >
                {isVisualCard ? (
                  // Visual Card with Image
                  <div className={styles.testimonialCard} style={{ backgroundImage: `url(${testimonial.image})` }}>
                    <div className={styles.cardOverlay}>
                      <div className={styles.cardContent}>
                        <div className={styles.header}>
                          <h3 className={styles.name}>{testimonial.name}</h3>
                          <p className={styles.company}>{testimonial.company}</p>
                        </div>

                        <div className={styles.ratingStars} aria-label={`${testimonial.rating} de 5 estrelas`} role="img">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <span key={i} aria-hidden="true">★</span>
                          ))}
                        </div>

                        <p className={styles.mainQuote}>{testimonial.mainQuote}</p>
                        <p className={styles.fullQuote}>{testimonial.fullQuote}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Quote Card
                  <div className={styles.quoteCardContent}>
                    <div className={styles.quoteStars} aria-label={`${testimonial.rating} de 5 estrelas`} role="img">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} aria-hidden="true">★</span>
                      ))}
                    </div>
                    <p className={styles.quoteText}>{testimonial.mainQuote}</p>
                    <div className={styles.quoteAuthor}>
                      <h4 className={styles.quoteName}>{testimonial.name}</h4>
                      <p className={styles.quoteCompany}>{testimonial.company}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Indicators */}
        <div className={styles.indicatorWrapper}>
          <div className={styles.indicatorTrack}>
            <div className={styles.indicatorDots}>
              {Array.from({ length: totalIndicators }).map((_, index) => (
                <div
                  key={index}
                  className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
