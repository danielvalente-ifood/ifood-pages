'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './SegmentTabs.module.css';

export interface SegmentTab {
  id: string;
  label: string;
  description: string;
}

export interface SegmentTabsData {
  badge?: string;
  title: string;
  subtitle?: string;
  tabs: SegmentTab[];
}

const defaultData: SegmentTabsData = {
  badge: 'Segmentos',
  title: 'Construído para negócios de todos os sabores.',
  tabs: [
    { id: 'bar', label: 'Bar e Pub', description: 'Controle de comanda por mesa, gestão de estoque de bebidas e integração com delivery para aumentar o movimento nas noites de semana.' },
    { id: 'hamburgueria', label: 'Hamburgueria', description: 'KDS integrado para agilizar a produção, cardápio digital próprio sem taxa e robô de WhatsApp para picos de demanda.' },
    { id: 'pizzaria', label: 'Pizzaria', description: 'Rotas de entrega otimizadas, atendente IA que anota pedidos às 23h e DRE em tempo real para cada unidade.' },
    { id: 'alacarte', label: 'Restaurante A La Carte', description: 'CRM que conhece o cliente pelo nome, gestão de reservas sem caderninho e fechamento de conta em segundos.' },
    { id: 'fastcasual', label: 'Fast Casual', description: 'Fila digital que reduz abandono, integração com iFood e Rappi na mesma tela e Pix automatizado.' },
  ],
};

interface SegmentTabsProps {
  data?: SegmentTabsData;
}

export default function SegmentTabs({ data }: SegmentTabsProps) {
  const d = data ?? defaultData;
  const tabs = d.tabs ?? [];
  const [active, setActive] = useState<string>(tabs[0]?.id ?? '');
  const { ref, isVisible } = useScrollReveal();

  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

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

        <div className={styles.tabRow} role="tablist" aria-label="Segmentos">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === active}
              aria-controls={`segment-panel-${tab.id}`}
              className={`${styles.tab} ${tab.id === active ? styles.tabActive : ''}`}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab && (
          <div
            key={activeTab.id}
            id={`segment-panel-${activeTab.id}`}
            role="tabpanel"
            aria-live="polite"
            className={styles.panel}
          >
            <p className={styles.panelText}>{activeTab.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}
