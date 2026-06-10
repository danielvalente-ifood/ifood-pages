'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/Button/Button';
import { Icon } from '@/components/Icon/Icon';
import { Editable } from '@/components/edit/Editable';
import { EditableImage } from '@/components/edit/EditableImage';
import styles from './Stacked.module.css';

export interface StackedCTA {
  text: string;
  link: string;
}

export interface StackedCard {
  /** Rótulo sempre visível (barra do card). */
  label: string;
  /** Título grande exibido quando o card está ativo/aberto. */
  title: string;
  description?: string;
  /** URL da imagem (mídia do card aberto). */
  image?: string;
  /** Botão opcional (outline). */
  cta?: StackedCTA;
}

export interface StackedData {
  badge?: string;
  /** Título da seção (uma linha por item). */
  title: string[];
  /** Lado da imagem no card aberto. */
  assetPosition?: 'left' | 'right';
  /** Mínimo 3, máximo 8 cards. */
  cards: StackedCard[];
}

/** Limites de cards (regra de negócio). */
export const STACKED_MIN_CARDS = 3;
export const STACKED_MAX_CARDS = 8;

const defaultData: StackedData = {
  badge: 'Otimize sua operação',
  title: ['Pra quem é o iFood Salão'],
  assetPosition: 'left',
  cards: [
    {
      label: 'Restaurantes com salão próprio',
      title:
        'O iFood Salão ajuda restaurantes que atendem presencialmente a terem uma operação mais simples, organizada e conectada.',
      description:
        'Centralize atendimento, pedidos, pagamentos e gestão da mesa em um único fluxo, reduzindo erros, agilizando o serviço e melhorando a experiência dos clientes do início ao fim.',
      image: '',
      cta: { text: 'Ativar agora', link: '#' },
    },
    {
      label: 'Operações híbridas',
      title: 'Atenda no salão e no delivery sem precisar trocar de sistema.',
      description:
        'Uma operação única para pedidos presenciais e online, com visão unificada de vendas, estoque e clientes em tempo real.',
      image: '',
      cta: { text: 'Ativar agora', link: '#' },
    },
    {
      label: 'Grandes redes',
      title: 'Padronize a operação de todas as suas lojas em um só lugar.',
      description:
        'Gestão centralizada, relatórios consolidados e controle fino por unidade — do balcão ao delivery, em qualquer escala.',
      image: '',
      cta: { text: 'Ativar agora', link: '#' },
    },
  ],
};

interface StackedProps {
  data?: StackedData;
}

export default function Stacked({ data }: StackedProps) {
  const d = data ?? defaultData;
  const cards = (d.cards ?? []).slice(0, STACKED_MAX_CARDS);
  const count = cards.length;
  const assetRight = d.assetPosition === 'right';

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Scroll-driven: o progresso da rolagem pela seção pinada define o card ativo.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || count <= 1) {
      setActive(0);
      return;
    }

    let raf = 0;
    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setActive(0);
        return;
      }
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const idx = Math.min(count - 1, Math.max(0, Math.round(progress * (count - 1))));
      setActive(idx);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [count]);

  return (
    <section aria-label={d.title?.join(' ') || 'Cards empilhados'} className={styles.section}>
      <div
        ref={wrapperRef}
        className={styles.wrapper}
        style={{ ['--card-count' as string]: count } as React.CSSProperties}
      >
        <div className={styles.pinned}>
          <div className={styles.inner}>
            <header className={styles.header}>
              {d.badge && (
                <Editable as="span" className={styles.badge} path="badge" value={d.badge} />
              )}
              {d.title?.length > 0 && (
                <h2 className={styles.title}>
                  {d.title.map((line, i) => (
                    <Editable key={i} as="span" path={`title.${i}`} value={line} />
                  ))}
                </h2>
              )}
            </header>

            <div className={styles.stack} data-count={count}>
              {cards.map((card, i) => {
                const isActive = i === active;
                return (
                  <article
                    key={i}
                    className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                    style={{ ['--i' as string]: i } as React.CSSProperties}
                  >
                    <button
                      type="button"
                      className={styles.cardLabel}
                      onClick={() => setActive(i)}
                      aria-expanded={isActive}
                    >
                      <Editable as="span" path={`cards.${i}.label`} value={card.label} />
                    </button>

                    <div className={styles.cardBody}>
                      <div
                        className={`${styles.grid} ${assetRight ? styles.gridAssetRight : ''}`}
                      >
                        <div className={styles.media}>
                          <EditableImage
                            path={`cards.${i}.image`}
                            src={card.image}
                            className={styles.mediaImg}
                            placeholderClassName={styles.mediaPlaceholder}
                            placeholder={<Icon name="photo-image-default" size={48} />}
                          />
                        </div>
                        <div className={styles.content}>
                          {card.title && (
                            <Editable
                              as="p"
                              className={styles.cardTitle}
                              path={`cards.${i}.title`}
                              value={card.title}
                              multiline
                            />
                          )}
                          {card.description && (
                            <Editable
                              as="p"
                              className={styles.cardDesc}
                              path={`cards.${i}.description`}
                              value={card.description}
                              multiline
                            />
                          )}
                          {card.cta?.text && (
                            <div className={styles.cardCta}>
                              <Button
                                href={card.cta.link || '#'}
                                label={card.cta.text}
                                variant="stroke"
                                color="dark"
                                content="text-icon"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
