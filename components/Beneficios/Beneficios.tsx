'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Icon } from '@/components/Icon/Icon';
import styles from './Beneficios.module.css';

export interface BeneficioCTA {
  text: string;
  link: string;
  style?: 'primary' | 'secondary';
}

export interface BeneficioCard {
  /** nome do ícone da biblioteca fixa (/public/icons) */
  icon: string;
  title: string;
  description: string;
  /** CTAs opcionais por card (0, 1 ou 2) */
  ctas?: BeneficioCTA[];
}

export interface BeneficiosData {
  badge?: string;
  title: string[];
  description?: string;
  /** mínimo 2, máximo 5 cards */
  cards: BeneficioCard[];
}

const defaultData: BeneficiosData = {
  badge: 'Visão integrada',
  title: ['A maior base de clientes do Brasil', 'está a um clique do seu salão'],
  cards: [
    {
      icon: 'grid-dashboard-bento',
      title: 'Visão 360 do cliente',
      description:
        'Gerencie pedidos online e experiências presenciais no mesmo lugar. Dados unificados, gestão simplificada, crescimento amplificado.',
    },
    {
      icon: 'barchart-default',
      title: 'Operação unificada',
      description:
        'Conheça o histórico completo: o que pedem online, quando visitam o salão, preferências e ticket médio.',
    },
    {
      icon: 'plugin-addon-puzzle',
      title: 'Crescimento amplificado',
      description:
        'Recebimento automático, entregas eficientes e ferramentas de gestão que conversam entre si. Sem integrações complexas, sem dor de cabeça.',
    },
  ],
};

interface BeneficiosProps {
  data?: BeneficiosData;
  /** modo edição (CMS) — habilita seleção de card individual */
  editMode?: boolean;
  /** índice do card destacado (controlado pelo CMS) */
  selectedCardIndex?: number | null;
  /** callback ao clicar num card no modo edição */
  onSelectCard?: (index: number) => void;
}

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

function CardCta({ cta }: { cta: BeneficioCTA }) {
  const secondary = cta.style === 'secondary';
  return (
    <a
      href={cta.link || '#'}
      className={`${styles.cardCta} ${secondary ? styles.cardCtaSecondary : styles.cardCtaPrimary}`}
    >
      <span>{cta.text}</span>
      <Chevron />
    </a>
  );
}

export default function Beneficios({
  data,
  editMode = false,
  selectedCardIndex = null,
  onSelectCard,
}: BeneficiosProps) {
  const { ref, isVisible } = useScrollReveal();
  const d = data ?? defaultData;
  const cards = (d.cards ?? []).slice(0, 5);

  return (
    <section
      ref={ref}
      aria-label="Benefícios"
      className={`${styles.section} scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          {d.badge && <span className={styles.badge}>{d.badge}</span>}
          {d.title?.length > 0 && (
            <h2 className={styles.title}>
              {d.title.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </h2>
          )}
          {d.description && <p className={styles.description}>{d.description}</p>}
        </header>

        <div className={styles.cards} data-count={cards.length}>
          {cards.map((card, i) => {
            const ctas = (card.ctas ?? []).slice(0, 2);
            const editProps = editMode
              ? {
                  onClick: (e: React.MouseEvent) => {
                    e.stopPropagation();
                    onSelectCard?.(i);
                  },
                  className: `${styles.card} ${styles.cardEditable} ${
                    selectedCardIndex === i ? styles.cardSelected : ''
                  }`,
                }
              : { className: styles.card };
            return (
              <article key={i} {...editProps}>
                <div className={styles.iconChip} aria-hidden="true">
                  <Icon name={card.icon || 'grid-dashboard-bento'} size={24} />
                </div>
                {card.title && <h3 className={styles.cardTitle}>{card.title}</h3>}
                {card.description && <p className={styles.cardDesc}>{card.description}</p>}
                {ctas.length > 0 && (
                  <div className={styles.cardCtas}>
                    {ctas.map((c, j) => (
                      <CardCta key={j} cta={c} />
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
