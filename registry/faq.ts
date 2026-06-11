import FAQ from '@/components/FAQ/FAQ';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'faq',
  label: 'FAQ',
  category: 'Conteúdo',
  component: FAQ,
  defaults: {
    badge: 'FAQ',
    title: 'Ficou com alguma dúvida?',
    description: 'Encontre as respostas para suas principais dúvidas sobre produtos e serviços do iFood.',
    cta: { text: 'Não encontrei minha dúvida', link: '#' },
    items: [
      {
        id: 1,
        question: 'Como funciona a promoção de 4 primeiras mensalidades grátis?',
        answer: 'A promoção oferece 4 meses gratuitos para novos parceiros que se cadastrarem na plataforma.',
      },
      {
        id: 2,
        question: 'O que é o iFood Salão?',
        answer: 'O iFood Salão é a solução de delivery e gerenciamento para restaurantes e estabelecimentos de food service.',
      },
      {
        id: 3,
        question: 'Posso ter uma operação integrada de delivery e Salão com o iFood?',
        answer: 'Sim! O iFood permite integrar tanto o serviço de delivery quanto o de atendimento no local em uma única operação.',
      },
    ],
  },
  variants: [
    { id: 'faq-accordion', label: 'Accordion', description: 'Perguntas e respostas em accordion vertical' },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título', type: 'text' },
    { key: 'description', label: 'Descrição', type: 'textarea' },
  ],
};

export default entry;
