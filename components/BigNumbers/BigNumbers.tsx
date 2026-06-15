'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Icon } from '@/components/Icon/Icon';
import { Editable } from '@/components/edit/Editable';
import styles from './BigNumbers.module.css';

export interface BigNumbersStat {
  /** Valor numérico em destaque — ex: "120 milhões", "+450 mil" */
  value: string;
  /** Nome do ícone da biblioteca fixa (/public/icons) */
  icon: string;
  /** Rótulo descritivo — ex: "Pedidos no app" */
  label: string;
  /** Cor pura do ícone (hex) — default '#141414' */
  iconColor?: string;
  /** Opacidade do fundo do chip (0–100) — default 10 */
  iconBgOpacity?: number;
}

export interface BigNumbersData {
  badge?: string;
  /** Título centralizado (string simples) */
  title: string;
  /** Mínimo 3, máximo 5 stats */
  stats: BigNumbersStat[];
}

const defaultData: BigNumbersData = {
  badge: 'Visão integrada',
  title: 'A maior base de clientes do Brasil está a um clique do seu salão',
  stats: [
    { value: '120 milhões', icon: 'heart', label: 'Pedidos no app' },
    { value: '+450 mil', icon: 'store-building-default', label: 'Estabelecimentos parceiros' },
    { value: '1.5 Mil', icon: 'map-pin-location-default', label: 'Cidades em todo o Brasil' },
    { value: '+60 milhões', icon: 'users-group-default', label: 'Clientes' },
  ],
};

interface BigNumbersProps {
  data?: BigNumbersData;
  editMode?: boolean;
  selectedStatIndex?: number | null;
  onSelectStat?: (index: number) => void;
}

/** Converte hex + opacidade (0–100) em string rgba */
function chipStyle(color: string | undefined, opacity: number | undefined): React.CSSProperties {
  const hex = color || '#141414';
  const op = (opacity ?? 10) / 100;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return {
    background: `rgba(${r},${g},${b},${op})`,
    color: hex,
  };
}

export default function BigNumbers({ data, editMode = false, selectedStatIndex = null, onSelectStat }: BigNumbersProps) {
  const { ref, isVisible } = useScrollReveal();
  const d: BigNumbersData = {
    ...defaultData,
    ...data,
    // stats: só usa do data se vier preenchido; caso contrário cai pro default
    stats: Array.isArray(data?.stats) && data.stats.length > 0 ? data.stats : defaultData.stats,
  };
  const stats = d.stats.slice(0, 5);

  return (
    <section
      ref={ref}
      aria-label="Big Numbers"
      className={`${styles.section} scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          {d.badge && (
            <Editable as="span" className={styles.badge} path="badge" value={d.badge} />
          )}
          {d.title && (
            <Editable as="h2" className={styles.title} path="title" value={d.title} multiline />
          )}
        </header>

        <div className={styles.grid} data-count={stats.length}>
          {stats.map((stat, i) => {
            const isSelected = editMode && selectedStatIndex === i;
            return (
              <div
                key={i}
                className={`${styles.stat} ${editMode ? styles.statEditable : ''} ${isSelected ? styles.statSelected : ''}`}
                onClick={editMode ? (e) => { e.stopPropagation(); onSelectStat?.(i); } : undefined}
              >
                <Editable
                  as="p"
                  className={styles.statValue}
                  path={`stats.${i}.value`}
                  value={stat.value}
                />
                <div className={styles.statMeta}>
                  <div
                    className={styles.iconChip}
                    aria-hidden="true"
                    style={chipStyle(stat.iconColor, stat.iconBgOpacity)}
                  >
                    <Icon name={stat.icon || 'barchart-default'} size={18} />
                  </div>
                  <Editable
                    as="span"
                    className={styles.statLabel}
                    path={`stats.${i}.label`}
                    value={stat.label}
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
