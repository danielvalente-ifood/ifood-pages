'use client';

import { Badge } from '@/components/Badge';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Integrated.module.css';

const defaultData = {
  badge: 'Visão integrada',
  title: 'Por que escolher o ecossistema completo do iFood?',
  image: '/images/ifood/visao_integrada.png',
  features: [
    { id: 1, title: 'Delivery e Salão', subtitle: 'em uma plataforma', description: 'Gerencie pedidos online e experiências presenciais no mesmo lugar. Dados unificados, gestão simplificada, crescimento amplificado.', icon: '/images/ifood/loja-icon.png', iconAlt: 'Ícone de loja' },
    { id: 2, title: 'Visão 360°', subtitle: 'dos seus clientes', description: 'Conheça o histórico completo: o que pedem online, quando visitam o salão, preferências e ticket médio. Inteligência que nenhum concorrente oferece.', icon: '/images/ifood/people_icon.png', iconAlt: 'Ícone de clientes' },
    { id: 3, title: 'Pagamentos, logística e', subtitle: 'gestão integrados', description: 'Recebimento automático, entregas eficientes e ferramentas de gestão que conversam entre si. Sem integrações complexas, sem dor de cabeça.', icon: '/images/ifood/star_icon.png', iconAlt: 'Ícone de destaque' },
  ],
};

interface IntegratedProps {
  data?: typeof defaultData;
}

export default function Integrated({ data }: IntegratedProps) {
  const d = data ?? defaultData;
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} aria-label="Ecossistema integrado iFood" className={`${styles.container} scroll-reveal ${isVisible ? 'visible' : ''}`}>
      {/* Header */}
      <div className={styles.headerContent}>
        <Badge text={d.badge} />
        <h2 className={styles.title}>{d.title}</h2>
      </div>

      {/* Background Image */}
      <div className={styles.imageContainer}>
        <img
          src={d.image}
          alt="Painel de visão integrada do ecossistema iFood"
          loading="lazy"
          className={styles.image}
        />
      </div>

      {/* Features Grid */}
      <div className={styles.cardsGrid}>
        {d.features.map((feature, index) => (
          <div key={feature.id} className={styles.card} style={{ animationDelay: `${0.15 + index * 0.1}s` }}>
            <div className={styles.iconContainer} aria-hidden="true">
              <img src={feature.icon} alt="" loading="lazy" className={styles.icon} />
            </div>
            <div className={styles.cardTitleWrapper}>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              {feature.subtitle && <p className={styles.cardSubtitle}>{feature.subtitle}</p>}
            </div>
            <p className={styles.cardDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
