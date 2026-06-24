'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Solutions.module.css';

export interface SolutionFeature {
  text: string;
}

export interface SolutionItem {
  id: string;
  /** Ícone/emoji exibido no bloco de seleção */
  icon?: string;
  /** Texto de "perfil" exibido no bloco clicável */
  trigger: string;
  /** Tag opcional acima do título do painel */
  tag?: string;
  title: string;
  subtitle?: string;
  features: SolutionFeature[];
  cta: { text: string; link: string };
}

export interface SolutionsData {
  badge?: string;
  title: string;
  subtitle?: string;
  solutions: SolutionItem[];
}

const defaultData: SolutionsData = {
  badge: 'Soluções',
  title: 'Entenda qual a melhor solução para você.',
  subtitle: 'Selecione o perfil do seu negócio e veja qual módulo faz mais sentido para você.',
  solutions: [
    {
      id: 'sol-1',
      icon: '🛵',
      trigger: '"Faturo menos de 40k e quero ter meu canal próprio de delivery"',
      tag: 'Solução recomendada',
      title: 'Anota.ai — Delivery com IA',
      subtitle: 'Seu balcão digital 24 horas, sem taxas de marketplace.',
      features: [
        { text: 'Atendente virtual no WhatsApp que anota pedidos automaticamente' },
        { text: 'Cardápio digital próprio — zero comissão para marketplaces' },
        { text: 'Pix automatizado ao fechar cada pedido' },
        { text: 'Cupons de desconto e programa de fidelidade automático' },
        { text: 'Disponível 24h por dia, 7 dias por semana, sem pausas' },
      ],
      cta: { text: 'Quero o Anota.ai', link: '#' },
    },
    {
      id: 'sol-2',
      icon: '📊',
      trigger: '"Faturo mais de 40k e quero soluções de gestão para centralizar meus canais de venda"',
      tag: 'Solução recomendada',
      title: 'Saipos — Gestão e PDV Completo',
      subtitle: 'O motor da sua operação, do caixa ao estoque.',
      features: [
        { text: 'PDV intuitivo — feche contas em segundos com toque único' },
        { text: 'Controle de estoque automatizado e alertas de reposição' },
        { text: 'DRE em tempo real por unidade ou rede' },
        { text: 'Hub de integrações: iFood, Rappi e site próprio na mesma tela' },
        { text: 'Monitor KDS — adeus às comandas de papel na cozinha' },
      ],
      cta: { text: 'Quero o Saipos', link: '#' },
    },
    {
      id: 'sol-3',
      icon: '🏢',
      trigger: '"Tenho uma rede com mais de 5 lojas e quero uma solução customizada"',
      tag: 'Solução recomendada · Redes e Múltiplas Unidades',
      title: 'Solução Customizada para Redes',
      subtitle: 'Um ecossistema enterprise que conecta todas as suas lojas.',
      features: [
        { text: 'Gestão de filas digital em todas as unidades' },
        { text: 'CRM unificado com histórico por loja' },
        { text: 'Checkout em 3 segundos — zero fila no caixa' },
        { text: 'Integração com o Comer Fora para atrair novos clientes' },
        { text: 'Dashboard consolidado por rede de lojas' },
      ],
      cta: { text: 'Falar com especialista', link: '#' },
    },
  ],
};

interface SolutionsProps {
  data?: SolutionsData;
}

export default function Solutions({ data }: SolutionsProps) {
  const d = data ?? defaultData;
  const solutions = d.solutions ?? [];
  const [active, setActive] = useState<string | null>(null);
  const { ref, isVisible } = useScrollReveal();

  const activeSolution = solutions.find((s) => s.id === active) ?? null;

  const toggle = (id: string) => setActive((prev) => (prev === id ? null : id));

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

        {/* Blocos de seleção */}
        <div className={styles.triggerGrid}>
          {solutions.map((sol) => {
            const isActive = sol.id === active;
            return (
              <button
                key={sol.id}
                type="button"
                className={`${styles.trigger} ${isActive ? styles.triggerActive : ''}`}
                onClick={() => toggle(sol.id)}
                aria-expanded={isActive}
                aria-controls={`sol-panel-${sol.id}`}
              >
                {sol.icon && <span className={styles.triggerIcon} aria-hidden="true">{sol.icon}</span>}
                <p className={styles.triggerText}>{sol.trigger}</p>
                <span className={`${styles.triggerArrow} ${isActive ? styles.triggerArrowActive : ''}`} aria-hidden="true">↓</span>
              </button>
            );
          })}
        </div>

        {/* Painel de solução */}
        <div
          id={activeSolution ? `sol-panel-${activeSolution.id}` : undefined}
          aria-live="polite"
          className={`${styles.panel} ${activeSolution ? styles.panelVisible : ''}`}
        >
          {activeSolution && (
            <div className={styles.panelInner}>
              <div className={styles.panelHeader}>
                {activeSolution.tag && (
                  <span className={styles.panelTag}>{activeSolution.tag}</span>
                )}
                <h3 className={styles.panelTitle}>{activeSolution.title}</h3>
                {activeSolution.subtitle && (
                  <p className={styles.panelSubtitle}>{activeSolution.subtitle}</p>
                )}
              </div>
              <ul className={styles.featureList} aria-label="Funcionalidades incluídas">
                {activeSolution.features.map((f, i) => (
                  <li key={i} className={styles.featureItem}>
                    <span className={styles.check} aria-hidden="true">✓</span>
                    {f.text}
                  </li>
                ))}
              </ul>
              <a href={activeSolution.cta.link} className={styles.panelCta}>
                {activeSolution.cta.text}
                <span aria-hidden="true" className={styles.ctaArrow}>→</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
