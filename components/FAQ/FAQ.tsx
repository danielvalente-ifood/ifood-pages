'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/Badge';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { events } from '@/lib/gtag';
import styles from './FAQ.module.css';

const defaultData = {
  badge: 'FAQ',
  title: 'Ficou com alguma dúvida?',
  description: 'Encontre as respostas para suas principais dúvidas sobre produtos e serviços do iFood.',
  items: [
    { id: 1, question: 'Como funciona a promoção de 4 primeiras mensalidades grátis?', answer: 'A promoção oferece 4 meses gratuitos para novos parceiros que se cadastrarem na plataforma. Este benefício é válido para os primeiros 4 meses de operação, sem necessidade de pagamento durante este período.' },
    { id: 2, question: 'O que é o iFood Salão?', answer: 'O iFood Salão é a solução de delivery e gerenciamento para restaurantes e estabelecimentos de food service. Ele oferece ferramentas integradas para gerenciar pedidos, cardápio e entrega dos produtos.' },
    { id: 3, question: 'Posso ter uma operação integrada de delivery e Salão com o iFood?', answer: 'Sim! O iFood permite integrar tanto o serviço de delivery quanto o de atendimento no local (Salão) em uma única operação, otimizando a gestão do seu negócio.' },
    { id: 4, question: 'Em quanto tempo meu negócio estará disponível no app iFood?', answer: 'Após a aprovação do seu cadastro, seu negócio pode estar disponível no app em poucos dias, dependendo do tipo de operação e da documentação necessária.' },
    { id: 5, question: 'Quais as vantagens de utilizar as soluções do iFood Salão?', answer: 'As vantagens incluem acesso a milhões de usuários, ferramentas de gestão integradas, suporte especializado, análises e insights sobre seu negócio, além de diversas estratégias de crescimento e visibilidade.' },
  ],
};

interface FAQProps {
  data?: typeof defaultData;
}

export default function FAQ({ data }: FAQProps) {
  const d = data ?? defaultData;
  const { ref, isVisible } = useScrollReveal();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [closingId, setClosingId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    const item = d.items.find((i) => i.id === id);
    if (expandedId === id) {
      setClosingId(id);
      if (item) events.faqToggle(item.question, false);
      setTimeout(() => {
        setExpandedId(null);
        setClosingId(null);
      }, 600);
    } else {
      setExpandedId(id);
      setClosingId(null);
      if (item) events.faqToggle(item.question, true);
    }
  };

  return (
    <section ref={ref} aria-label="Perguntas frequentes" className={`${styles.container} scroll-reveal ${isVisible ? 'visible' : ''}`}>
      <div className={styles.wrapper}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <Badge text={d.badge} />
          <h2 className={styles.title}>{d.title}</h2>
          <p className={styles.description}>{d.description}</p>
        </div>

        {/* Right Section - FAQ Items */}
        <div className={styles.rightSection}>
          {d.items.map((faq) => (
            <div
              key={faq.id}
              className={`${styles.faqItem} ${expandedId === faq.id ? styles.expanded : ''}`}
            >
              <button
                className={styles.faqButton}
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={expandedId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <p className={styles.question}>{faq.question}</p>
                <span className={styles.icon} aria-hidden="true">+</span>
              </button>
              {(expandedId === faq.id || closingId === faq.id) && (
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`${styles.answer} ${closingId === faq.id ? styles.closing : ''}`}
                  role="region"
                  aria-label={faq.question}
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
