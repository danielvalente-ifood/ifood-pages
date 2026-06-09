'use client';

import { Badge } from '@/components/Badge';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Vision.module.css';

const defaultData = {
  badge: 'De Brasil e de comida a gente entende',
  title: ['Conectamos milhares', 'de restaurantes todos os dias'],
  ratings_count: '+8Mi',
  ratings_text: '+8 milhões de avaliações',
  avatars: ['/images/ifood/avatar1.png', '/images/ifood/avatar2.png', '/images/ifood/avatar3.png'],
  cards: [
    { id: 1, title: '450 mil lojas parceiras', bg_image: '/images/ifood/loja_bg.png', icon: '/images/ifood/loja-icon.png', variant: 'lojas' },
    { id: 2, title: '180 milhões de pedidos/mês', bg_image: '/images/ifood/pedidos_bg.png', icon: '/images/ifood/pedido-icon.png', variant: 'pedidos' },
    { id: 3, title: '500 mil entregadores', bg_image: '/images/ifood/entregador_bg.png', icon: '/images/ifood/entregador-icon.png', variant: 'entregadores' },
  ],
};

interface VisionProps {
  data?: typeof defaultData;
}

export default function Vision({ data }: VisionProps) {
  const d = data ?? defaultData;
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} aria-label="Números do iFood" className={`${styles.container} scroll-reveal ${isVisible ? 'visible' : ''}`}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.titleWrapper}>
          <Badge text={d.badge} />
          <h2 className={styles.title}>
            {d.title.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </h2>
        </div>

        {/* Ratings Section */}
        <div className={styles.ratingsSection}>
          <div className={styles.avatarsContainer} aria-hidden="true">
            {d.avatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                className={styles.avatar}
              />
            ))}
            <div className={styles.ratingsCountBadge}>
              <span>{d.ratings_count}</span>
            </div>
          </div>
          <p className={styles.ratingsText}>{d.ratings_text}</p>
        </div>
      </div>

      {/* Cards Section */}
      <div className={styles.cardsGrid}>
        {d.cards.map((card) => {
          const variantClass = card.variant === 'lojas' ? styles.cardLojas
            : card.variant === 'pedidos' ? styles.cardPedidos
            : styles.cardEntregadores;
          const iconClass = card.variant === 'lojas' ? styles.iconLojas
            : card.variant === 'pedidos' ? styles.iconPedidos
            : styles.iconEntregadores;

          return (
            <div key={card.id} className={`${styles.card} ${variantClass}`}>
              <div className={styles.cardBg} aria-hidden="true">
                <img src={card.bg_image} alt="" loading="lazy" className={styles.bgImage} />
              </div>
              <div className={styles.cardGradient}></div>
              <div className={styles.cardContent}>
                <div className={`${styles.iconContainer} ${iconClass}`} aria-hidden="true">
                  <img src={card.icon} alt="" loading="lazy" className={styles.iconImage} />
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
