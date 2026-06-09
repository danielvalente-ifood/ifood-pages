import Vision from '@/components/Vision/Vision';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'vision',
  label: 'Social Proof',
  category: 'Prova Social',
  component: Vision,
  defaults: {
    badge: 'De Brasil e de comida a gente entende',
    title: ['Conectamos milhares', 'de restaurantes todos os dias'],
    ratings_count: '+8Mi',
    ratings_text: '+8 milhões de avaliações',
    avatars: [
      '/images/ifood/avatar1.png',
      '/images/ifood/avatar2.png',
      '/images/ifood/avatar3.png',
    ],
    cards: [
      { id: 1, title: '450 mil lojas parceiras', bg_image: '/images/ifood/loja_bg.png', icon: '/images/ifood/loja-icon.png', variant: 'lojas' },
      { id: 2, title: '180 milhões de pedidos/mês', bg_image: '/images/ifood/pedidos_bg.png', icon: '/images/ifood/pedido-icon.png', variant: 'pedidos' },
      { id: 3, title: '500 mil entregadores', bg_image: '/images/ifood/entregador_bg.png', icon: '/images/ifood/entregador-icon.png', variant: 'entregadores' },
    ],
  },
  variants: [
    { id: 'vision-cards', label: 'Cards com números', description: 'Três cards de destaque com métricas iFood' },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título (linhas)', type: 'list' },
    { key: 'ratings_count', label: 'Contador de avaliações', type: 'text' },
    { key: 'ratings_text', label: 'Texto de avaliações', type: 'text' },
  ],
};

export default entry;
