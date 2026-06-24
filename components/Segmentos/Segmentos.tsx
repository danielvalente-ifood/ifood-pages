'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Segmentos.module.css';

export interface SegmentosTab {
  label: string;
  icon?: string;
  description: string;
}

export interface SegmentosData {
  badge?: string;
  title: string[];
  tabs: SegmentosTab[];
}

const defaultData: SegmentosData = {
  badge: 'Segmentos',
  title: ['Construído para negócios de todos os sabores'],
  tabs: [
    {
      label: 'Bar e Pub',
      icon: '',
      description:
        'Controle de comanda por mesa, gestão de estoque de bebidas e integração com delivery para aumentar o movimento nas noites de semana.',
    },
    {
      label: 'Hamburgueria',
      icon: '',
      description:
        'Cardápio digital, pedidos online e gestão de fila integrados para atender mais clientes no horário de pico sem perder qualidade.',
    },
    {
      label: 'Pizzaria',
      icon: '',
      description:
        'Gestão de delivery e salão em um único sistema, com controle de ingredientes e automação de promoções para aumentar o ticket médio.',
    },
    {
      label: 'Restaurante A La Carte',
      icon: '',
      description:
        'Experiência completa do salão: comanda digital, reservas online, cardápio QR e integração com delivery para maximizar a ocupação das mesas.',
    },
  ],
};

interface SegmentosProps {
  data?: SegmentosData;
}

export default function Segmentos({ data }: SegmentosProps) {
  const { ref, isVisible } = useScrollReveal();
  const d = data ?? defaultData;
  const [activeIdx, setActiveIdx] = useState(0);
  const tabs = d.tabs ?? [];
  const active = tabs[activeIdx] ?? tabs[0];

  return (
    <section
      ref={ref}
      aria-label="Segmentos"
      className={`${styles.section} scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          {d.badge && <span className={styles.badge}>{d.badge}</span>}
          {d.title?.length > 0 && (
            <h2 className={styles.title}>{(d.title ?? []).join(' ')}</h2>
          )}
        </div>

        {/* Card */}
        <div className={styles.card}>
          {/* Tabs row */}
          <div className={styles.tabsRow} role="tablist" aria-label={d.badge ?? 'Segmentos'}>
            {tabs.map((tab, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeIdx}
                className={`${styles.tab} ${i === activeIdx ? styles.tabActive : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                <span className={styles.iconWrap}>
                  {tab.icon ? (
                    <img
                      src={tab.icon}
                      alt=""
                      className={styles.tabIcon}
                      width={30}
                      height={30}
                    />
                  ) : (
                    <span className={styles.iconPlaceholder} aria-hidden="true" />
                  )}
                </span>
                <span className={styles.tabLabel}>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Description */}
          {active && (
            <p role="tabpanel" className={styles.description}>
              {active.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
