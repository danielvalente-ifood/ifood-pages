'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';
import Badge from '@/components/Badge/Badge';
import { Editable } from '@/components/edit/Editable';
import { EditableImage } from '@/components/edit/EditableImage';
import { useEdit } from '@/components/edit/EditContext';
import styles from './BigNumbersEcossistema.module.css';

export interface BigNumbersEcossistemaCard {
  icon?: string;
  value: string;
  label: string;
}

export interface BigNumbersEcossistemaData {
  badge?: string;
  title: string;
  cards: BigNumbersEcossistemaCard[];
}

const defaultData: BigNumbersEcossistemaData = {
  badge: 'Ecossistema',
  title: 'A plataforma que conecta milhares de restaurantes todos os dias',
  cards: [
    { value: '65 milhões', label: 'clientes conectados ao ecossistema iFood' },
    { value: '180 milhões', label: 'de pedidos realizados no mês' },
    { value: '500 mil', label: 'lojas parceiras' },
    { value: '600 mil', label: 'entregadores ativos - maior frota do Brasil' },
  ],
};

interface BigNumbersEcossistemaProps {
  data?: BigNumbersEcossistemaData;
  selectedCardIndex?: number | null;
  onSelectCard?: (index: number) => void;
}

/** Separa o prefixo numérico do sufixo textual: "65 milhões" → [65, " milhões"] */
function parseValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d[\d.,]*)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  const num = parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
  return { num: isNaN(num) ? 0 : num, suffix: match[2] };
}

function AnimatedValue({ value, active }: { value: string; active: boolean }) {
  const { num, suffix } = parseValue(value);
  const counted = useCountUp(num, active);
  return <>{counted}{suffix}</>;
}

export default function BigNumbersEcossistema({ data, selectedCardIndex = null, onSelectCard }: BigNumbersEcossistemaProps) {
  const { ref, isVisible } = useScrollReveal();
  const { editMode } = useEdit();
  const d: BigNumbersEcossistemaData = {
    ...defaultData,
    ...data,
    cards: Array.isArray(data?.cards) && data.cards.length > 0 ? data.cards : defaultData.cards,
  };

  return (
    <section
      ref={ref}
      aria-label="Big Numbers Ecossistema"
      className={`${styles.section} scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          {d.badge && <Badge text={d.badge} editPath="badge" />}
          <Editable as="h2" className={styles.title} path="title" value={d.title} multiline />
        </header>

        <div className={styles.cards}>
          {d.cards.map((card, i) => {
            const isSelected = editMode && selectedCardIndex === i;
            return (
              <div
                key={i}
                className={`${styles.card} ${isVisible ? styles.cardVisible : ''} ${editMode ? styles.cardEditable : ''} ${isSelected ? styles.cardSelected : ''}`}
                style={{ '--card-index': i } as React.CSSProperties}
                onClick={editMode ? (e) => { e.stopPropagation(); onSelectCard?.(i); } : undefined}
              >
                <EditableImage
                  path={`cards.${i}.icon`}
                  src={card.icon}
                  className={styles.cardIcon}
                  placeholderClassName={styles.cardIconPlaceholder}
                />
                <div className={styles.cardText}>
                  <p className={styles.cardValue}>
                    {editMode ? card.value : <AnimatedValue value={card.value} active={isVisible} />}
                  </p>
                  <Editable
                    as="p"
                    className={styles.cardLabel}
                    path={`cards.${i}.label`}
                    value={card.label}
                    multiline
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
