'use client';

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Badge from '@/components/Badge/Badge';
import { Icon } from '@/components/Icon/Icon';
import { Editable } from '@/components/edit/Editable';
import { EditableImage } from '@/components/edit/EditableImage';
import { EditableButton } from '@/components/edit/EditableButton';
import { useEdit } from '@/components/edit/EditContext';
import styles from './ChoiceCards.module.css';

export interface ChoiceCardChallenge {
  text: string;
}

export interface ChoiceCardNeed {
  text: string;
}

export interface ChoiceCardChoicebox {
  label?: string;
  title: string;
  description: string;
  image?: string;
}

export interface ChoiceCardItem {
  icon: string;
  text: string;
  iconColor?: string;
  iconBgOpacity?: number;
  subtitle?: string;
  challenges?: ChoiceCardChallenge[];
  needs?: ChoiceCardNeed[];
  choicebox?: ChoiceCardChoicebox;
  ctaText?: string;
  ctaLink?: string;
}

export interface ChoiceCardsData {
  badge?: string;
  title: string[];
  description?: string;
  cards: ChoiceCardItem[];
}

const defaultData: ChoiceCardsData = {
  badge: 'Soluções',
  title: ['Entenda qual a solução ideal', 'para o seu negócio'],
  description: 'Selecione o perfil do seu negócio e veja qual módulo faz mais sentido para você.',
  cards: [
    {
      icon: 'store-building-default',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      text: 'Estou começando',
      subtitle: 'Fatura menos de R$40k/mês',
      challenges: [
        { text: 'Recebo pedidos pelo WhatsApp' },
        { text: 'Demoro para responder clientes' },
        { text: 'Pago muita comissão em marketplaces' },
      ],
      needs: [
        { text: 'Pagamento Online' },
        { text: 'Cardápio Digital' },
        { text: 'Atendimento Automatizado' },
      ],
      choicebox: {
        label: 'Produto ideal',
        title: 'Anota AI',
        description: 'Robô com IA no WhatsApp, cardápio digital e canal próprio de delivery sem comissão por pedido.',
        image: '/images/anota-ai-logo.png',
      },
      ctaText: 'Contratar agora',
      ctaLink: '#',
    },
    {
      icon: 'barchart-default',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      text: 'Estou crescendo',
      subtitle: 'Fatura mais de R$40k/mês',
      challenges: [
        { text: 'Não sei meu CMV' },
        { text: 'Tenho múltiplos canais de venda' },
        { text: 'Estoque desorganizado' },
      ],
      needs: [
        { text: 'Gestão Financeira' },
        { text: 'Centralização de Pedidos' },
        { text: 'Controle de Estoque' },
      ],
      choicebox: {
        label: 'Produto ideal',
        title: 'Saipos',
        description: 'Sistema completo com CMV automático, integração iFood, estoque e gestão multi-canal em um só lugar.',
        image: '/images/saipos-logo.png',
      },
      ctaText: 'Contratar agora',
      ctaLink: '#',
    },
    {
      icon: 'rocket-ship',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      text: 'Estou expandindo',
      subtitle: 'Redes e grupos com múltiplas unidades',
      challenges: [
        { text: 'Gestão multiunidade' },
        { text: 'Operação distribuída' },
        { text: 'Necessidade de soluções customizadas' },
      ],
      needs: [
        { text: 'CRM avançado' },
        { text: 'Integrações customizadas' },
        { text: 'Soluções sob medida' },
        { text: 'Estoque centralizado' },
      ],
      choicebox: {
        label: 'Fale com um especialista',
        title: 'Construímos uma proposta personalizada para sua operação.',
        description: 'Ideal para operações que precisam escalar com padronização.',
        image: '',
      },
      ctaText: 'Contratar agora',
      ctaLink: '#',
    },
  ],
};

interface ChoiceCardsProps {
  data?: ChoiceCardsData;
  selectedCardIndex?: number | null;
  onSelectCard?: (index: number) => void;
}

function chipStyle(color: string | undefined, opacity: number | undefined): React.CSSProperties {
  const hex = color || '#EB0033';
  const op = (opacity ?? 10) / 100;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { background: `rgba(${r},${g},${b},${op})`, color: hex };
}

export default function ChoiceCards({ data, selectedCardIndex = null, onSelectCard }: ChoiceCardsProps) {
  const { ref, isVisible } = useScrollReveal();
  const { editMode } = useEdit();
  const d = data ?? defaultData;

  return (
    <section
      ref={ref}
      aria-label="Soluções"
      className={`${styles.section} scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          {d.badge && <Badge text={d.badge} editPath="badge" />}
          {d.title?.length > 0 && (
            <Editable
              as="h2"
              className={styles.title}
              path="title.0"
              value={(d.title ?? []).join(' ')}
            />
          )}
          {d.description && (
            <Editable
              as="p"
              className={styles.description}
              path="description"
              value={d.description}
              multiline
            />
          )}
        </div>

        <div className={styles.cardsGrid}>
          {(d.cards ?? []).map((card, i) => {
            const isSelected = editMode && selectedCardIndex === i;
            const cardEditProps = editMode
              ? {
                  onClick: (e: React.MouseEvent) => { e.stopPropagation(); onSelectCard?.(i); },
                  className: `${styles.card} ${styles.cardEditable} ${isSelected ? styles.cardSelected : ''}`,
                }
              : { className: styles.card };
            return (
            <div key={i} {...cardEditProps}>
              {/* Icon + heading */}
              <div className={styles.cardTop}>
                <div
                  className={styles.iconChip}
                  style={chipStyle(card.iconColor, card.iconBgOpacity)}
                >
                  <Icon name={card.icon || 'store-building-default'} size={24} />
                </div>
                <div className={styles.cardHeading}>
                  <Editable
                    as="h3"
                    className={styles.cardTitle}
                    path={`cards.${i}.text`}
                    value={card.text}
                  />
                  {card.subtitle && (
                    <Editable
                      as="p"
                      className={styles.cardSubtitle}
                      path={`cards.${i}.subtitle`}
                      value={card.subtitle}
                    />
                  )}
                </div>
              </div>

              <div className={styles.cardBody}>
                {/* Challenges */}
                {card.challenges && card.challenges.length > 0 && (
                  <div className={styles.challengesSection}>
                    <span className={styles.challengesLabel}>Principais desafios</span>
                    <ul className={styles.challengeList}>
                      {card.challenges.map((ch, j) => (
                        <li key={j} className={styles.challengeItem}>
                          <span className={styles.challengeBullet} aria-hidden="true">
                            <Icon name="check-3" size={20} />
                          </span>
                          <Editable
                            as="span"
                            className={styles.challengeText}
                            path={`cards.${i}.challenges.${j}.text`}
                            value={ch.text}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Needs */}
                {card.needs && card.needs.length > 0 && (
                  <div className={styles.needsSection}>
                    <span className={styles.needsTitle}>O que você precisa agora</span>
                    <div className={styles.needsTags}>
                      {card.needs.map((need, j) => (
                        <span key={j} className={styles.needsTag}>
                          <Editable
                            as="span"
                            className={styles.needsTagText}
                            path={`cards.${i}.needs.${j}.text`}
                            value={need.text}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Choicebox */}
                {card.choicebox && (
                  <div className={styles.choicebox}>
                    <div className={styles.choiceboxWrap}>
                      <div className={styles.choiceboxText}>
                        {card.choicebox.label && (
                          <Editable
                            as="span"
                            className={styles.choiceboxLabel}
                            path={`cards.${i}.choicebox.label`}
                            value={card.choicebox.label}
                          />
                        )}
                        <Editable
                          as="p"
                          className={styles.choiceboxTitle}
                          path={`cards.${i}.choicebox.title`}
                          value={card.choicebox.title}
                        />
                        <Editable
                          as="p"
                          className={styles.choiceboxDesc}
                          path={`cards.${i}.choicebox.description`}
                          value={card.choicebox.description}
                          multiline
                        />
                      </div>
                      {(card.choicebox.image || editMode) && (
                        <EditableImage
                          path={`cards.${i}.choicebox.image`}
                          src={card.choicebox.image}
                          className={styles.choiceboxImage}
                          placeholderClassName={styles.choiceboxImagePlaceholder}
                          placeholder={<Icon name="photo-image-default" size={24} />}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              {card.ctaText && (
                <div className={styles.cardCta}>
                  <EditableButton
                    path={`cards.${i}.ctaText`}
                    href={card.ctaLink || '#'}
                    label={card.ctaText}
                    variant="fill"
                    color="dark"
                    content="text-icon"
                    className={styles.ctaBtn}
                    target={card.ctaLink && card.ctaLink.startsWith('http') ? '_blank' : undefined}
                  />
                </div>
              )}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
