'use client';

import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/Badge';
import { Editable } from '@/components/edit/Editable';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { events } from '@/lib/gtag';
import styles from './Growth.module.css';

const fadeTransition = {
  transition: 'opacity 0.4s ease-out'
};

const chevronIcon = '/images/ifood/icon-chevron-right.svg';

const defaultData = {
  badge: 'Cresça com a gente',
  title: ['Para cada tipo de negócio,', 'um iFood que te ajuda a vender mais'],
  tabs: [
    {
      id: 'delivery', label: 'Delivery', cards: [
        { id: 1, title: 'CRM 360', description: 'Dados unificados que transformam clientes em vendas' },
        { id: 2, title: 'PDV', description: 'Sistema de ponto de venda robusto e intuitivo' },
        { id: 3, title: 'Totem', description: 'Autoatendimento inteligente para sua loja' },
        { id: 4, title: 'Cardápio Digital', description: 'Cardápio interativo e fácil de gerenciar' },
        { id: 5, title: 'Integrações', description: 'Conecte com os principais sistemas do mercado' },
        { id: 6, title: 'Analytics', description: 'Dashboard com dados em tempo real' },
        { id: 7, title: 'Gestão de Pedidos', description: 'Controle total de seus pedidos' },
        { id: 8, title: 'Gateway de Pagamento', description: 'Múltiplas formas de pagamento seguras' },
      ]
    },
    {
      id: 'salao', label: 'Salão', cards: [
        { id: 1, title: 'Gerenciamento de Mesas', description: 'Controle eficiente de ocupação de mesas' },
        { id: 2, title: 'Comanda Digital', description: 'Comanda eletrônica para melhor experiência' },
        { id: 3, title: 'Reservas Online', description: 'Sistema de reservas integrado e automático' },
        { id: 4, title: 'Menu Interativo', description: 'Cardápio digital com fotos e recomendações' },
        { id: 5, title: 'Chamada de Garçom', description: 'Sistema inteligente de atendimento' },
        { id: 6, title: 'Relatórios Detalhados', description: 'Análise completa do desempenho' },
        { id: 7, title: 'Programa de Fidelização', description: 'Mantenha clientes engajados e voltando' },
        { id: 8, title: 'Integração com Delivery', description: 'Unifique sua operação de salão e delivery' },
      ]
    },
  ],
};

interface GrowthProps {
  data?: typeof defaultData;
}

export default function Growth({ data }: GrowthProps) {
  const d = data ?? defaultData;
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollReveal();

  const currentCards = d.tabs[activeTabIndex]?.cards ?? [];

  const handleTabChange = (index: number) => {
    const tab = d.tabs[index];
    if (tab) events.growthTabSwitch(tab.label);
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTabIndex(index);
      setIsTransitioning(false);
    }, 200);
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const cardWidth = 519.333 + 10; // card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveCardIndex(Math.min(index, currentCards.length - 1));
    }
  };

  // Reset scroll when changing tabs
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
    setActiveCardIndex(0);
  }, [activeTabIndex]);

  const totalDots = Math.min(currentCards.length, 3);
  const activeDotIndex = Math.min(activeCardIndex, totalDots - 1);

  return (
    <section ref={ref} aria-label="Soluções iFood" className={`${styles.container} scroll-reveal ${isVisible ? 'visible' : ''}`}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.titleWrapper}>
          {/* Badge */}
          <Badge text={d.badge} editPath="badge" />

          {/* Title */}
          <h2 className={styles.title}>
            {d.title.map((line, i) => (
              <Editable key={i} as="p" path={`title.${i}`} value={line} />
            ))}
          </h2>
        </div>
      </div>

      {/* Slider Section */}
      <div className={styles.sliderWrapper}>
        {/* Tab Switch */}
        <div className={styles.tabSwitch} data-active={d.tabs[activeTabIndex]?.id} role="tablist" aria-label="Soluções">
          {d.tabs.map((tab, i) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTabIndex === i}
              className={`${styles.tabButton} ${activeTabIndex === i ? styles.tabActive : ''}`}
              onClick={() => handleTabChange(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          className={styles.sliderContainer}
          ref={sliderRef}
          onScroll={handleScroll}
          style={{
            opacity: isTransitioning ? 0 : 1,
            ...fadeTransition
          }}
        >
          {currentCards.map((card) => (
            <div key={card.id} className={styles.sliderCard}>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <div className={styles.cardFooter}>
                  <p className={styles.cardDescription}>{card.description}</p>
                  <img src={chevronIcon} alt="" aria-hidden="true" className={styles.cardIcon} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Indicator */}
        <div
          className={styles.indicatorWrapper}
          style={{
            opacity: isTransitioning ? 0 : 1,
            ...fadeTransition
          }}
        >
          <div className={styles.indicatorTrack}>
            <div className={styles.indicatorDots}>
              {Array.from({ length: totalDots }).map((_, index) => (
                <div
                  key={index}
                  className={`${styles.dot} ${index === activeDotIndex ? styles.dotActive : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
