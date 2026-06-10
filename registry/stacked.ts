import Stacked from '@/components/Stacked/Stacked';
import type { RegistryEntry } from './types';

const baseCards = [
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
];

const entry: RegistryEntry = {
  type: 'stacked',
  label: 'Cards Empilhados',
  category: 'Conteúdo',
  component: Stacked,
  defaults: {
    badge: 'Otimize sua operação',
    title: ['Pra quem é o iFood Salão'],
    assetPosition: 'left',
    cards: baseCards,
  },
  variants: [
    {
      id: 'media',
      label: 'Mídia + texto',
      description:
        'Cards empilhados com efeito de scroll. Card aberto = imagem + título, descrição e CTA. De 3 a 8 cards.',
      config: { assetPosition: 'left', cards: baseCards },
    },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título da seção (uma linha por campo)', type: 'list' },
    { key: 'assetPosition', label: 'Posição da imagem', type: 'select', options: ['left', 'right'] },
    { key: 'cards', label: 'Cards (3 a 8)', type: 'list' },
  ],
};

export default entry;
