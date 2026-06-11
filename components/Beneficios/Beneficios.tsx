'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Icon } from '@/components/Icon/Icon';
import { EditableButton } from '@/components/edit/EditableButton';
import { Editable } from '@/components/edit/Editable';
import styles from './Beneficios.module.css';

export interface BeneficioCTA {
  text: string;
  link: string;
  style?: 'primary' | 'secondary' | 'empty';
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

function CardCta({ cta, path }: { cta: BeneficioCTA; path: string }) {
  /**
   * Benefícios usa fundo de card branco:
   *   primary   → fill dark (fundo #141414, texto branco)
   *   secondary → stroke dark (borda rgba(0,0,0,0.16), texto #141414)
   *   empty     → empty dark (sem fundo, sem borda)
   */
  const variant = cta.style === 'secondary' ? 'stroke' : cta.style === 'empty' ? 'empty' : 'fill';
  return (
    <EditableButton
      path={path}
      href={cta.link || '#'}
      label={cta.text}
      variant={variant}
      color="dark"
      content="text-icon"
    />
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
          {d.badge && (
            <Editable as="span" className={styles.badge} path="badge" value={d.badge} />
          )}
          {d.title?.length > 0 && (
            <Editable
              as="h2"
              className={styles.title}
              path="title"
              value={Array.isArray(d.title) ? d.title.join(' ') : d.title}
              multiline
            />
          )}
          {d.description && (
            <Editable as="p" className={styles.description} path="description" value={d.description} multiline />
          )}
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
                {card.title && (
                  <Editable as="h3" className={styles.cardTitle} path={`cards.${i}.title`} value={card.title} />
                )}
                {card.description && (
                  <Editable as="p" className={styles.cardDesc} path={`cards.${i}.description`} value={card.description} multiline />
                )}
                {ctas.length > 0 && (
                  <div className={styles.cardCtas}>
                    {ctas.map((c, j) => (
                      <CardCta key={j} cta={c} path={`cards.${i}.ctas.${j}.text`} />
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
