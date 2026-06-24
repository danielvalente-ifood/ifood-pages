'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './ProductCards.module.css';

export interface ProductFeature {
  text: string;
}

export interface ProductCard {
  /** Rótulo da categoria (ex: "Gestão completa") */
  label: string;
  /** Nome do produto (ex: "Saipos") */
  name: string;
  description?: string;
  features: ProductFeature[];
  /** URL do logotipo do produto */
  logo?: string;
  /** CTA opcional no rodapé do card */
  cta?: { text: string; link: string };
  /** Cor de destaque do card (hex) — default accent iFood */
  accentColor?: string;
}

export interface ProductCardsData {
  badge?: string;
  title: string;
  subtitle?: string;
  cards: ProductCard[];
}

const defaultData: ProductCardsData = {
  badge: 'A Plataforma Conectada',
  title: 'Um produto para cada momento da sua jornada',
  cards: [
    {
      label: 'Gestão completa',
      name: 'Saipos',
      description: 'O motor da sua operação, do caixa ao estoque.',
      features: [
        { text: 'PDV intuitivo — feche contas em segundos' },
        { text: 'Controle de estoque automatizado' },
        { text: 'DRE em tempo real por unidade' },
        { text: 'Hub de integrações: iFood, Rappi e site próprio' },
        { text: 'Monitor KDS — adeus às comandas de papel' },
      ],
      cta: { text: 'Conheça o Saipos', link: '#' },
    },
    {
      label: 'Robô de atendimento + Delivery',
      name: 'Anota.ai',
      description: 'Seu balcão digital 24 horas, sem taxas de marketplace.',
      features: [
        { text: 'Atendente virtual no WhatsApp' },
        { text: 'Cardápio digital próprio — zero comissão' },
        { text: 'Pix automatizado ao fechar cada pedido' },
        { text: 'Cupons de desconto e fidelidade automático' },
        { text: 'Disponível 24h por dia, 7 dias por semana' },
      ],
      cta: { text: 'Conheça o Anota.ai', link: '#' },
    },
    {
      label: 'Fidelização e Recorrência',
      name: 'Get In / Comer Fora',
      description: 'Experiência no salão e no delivery conectadas.',
      features: [
        { text: 'Gestão de filas digital em todas as unidades' },
        { text: 'Cliente acompanha a posição pelo celular' },
        { text: 'CRM unificado com histórico por loja' },
        { text: 'Checkout em 3 segundos — zero fila no caixa' },
        { text: 'Integração com Comer Fora para novos clientes' },
      ],
      cta: { text: 'Conheça o Get In', link: '#' },
    },
  ],
};

interface ProductCardsProps {
  data?: ProductCardsData;
}

export default function ProductCards({ data }: ProductCardsProps) {
  const d = data ?? defaultData;
  const cards = d.cards ?? [];
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      aria-label={d.title}
      className={`${styles.section} scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          {d.badge && <span className={styles.badge}>{d.badge}</span>}
          <h2 className={styles.title}>{d.title}</h2>
          {d.subtitle && <p className={styles.subtitle}>{d.subtitle}</p>}
        </header>

        <div className={styles.grid} style={{ '--col-count': cards.length } as React.CSSProperties}>
          {cards.map((card, i) => (
            <article
              key={i}
              className={styles.card}
              style={card.accentColor ? { '--accent': card.accentColor } as React.CSSProperties : undefined}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardLabel}>{card.label}</span>
                {card.logo ? (
                  <img src={card.logo} alt={card.name} className={styles.cardLogo} />
                ) : (
                  <span className={styles.cardName}>{card.name}</span>
                )}
                {card.description && (
                  <p className={styles.cardDesc}>{card.description}</p>
                )}
              </div>

              <ul className={styles.featureList} aria-label={`Funcionalidades de ${card.name}`}>
                {card.features.map((f, j) => (
                  <li key={j} className={styles.featureItem}>
                    <span className={styles.check} aria-hidden="true">✓</span>
                    {f.text}
                  </li>
                ))}
              </ul>

              {card.cta && (
                <a href={card.cta.link} className={styles.cardCta}>
                  {card.cta.text}
                  <span aria-hidden="true" className={styles.ctaArrow}>→</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
