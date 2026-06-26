import BigNumbersEcossistema from '@/components/BigNumbersEcossistema/BigNumbersEcossistema';
import type { RegistryEntry } from './types';

const defaultCards = [
  { value: '65 milhões', label: 'clientes conectados ao ecossistema iFood' },
  { value: '180 milhões', label: 'de pedidos realizados no mês' },
  { value: '500 mil', label: 'lojas parceiras' },
  { value: '600 mil', label: 'entregadores ativos - maior frota do Brasil' },
];

const entry: RegistryEntry = {
  type: 'big-numbers-ecossistema',
  label: 'Big Numbers Ecossistema',
  category: 'Conteúdo',
  component: BigNumbersEcossistema,
  defaults: {
    badge: 'Ecossistema',
    title: 'A plataforma que conecta milhares de restaurantes todos os dias',
    cards: defaultCards,
  },
  variants: [
    {
      id: 'default',
      label: '4 cards brancos',
      description: 'Ícone (imagem) + número + rótulo em 4 cards lado a lado.',
      config: { cards: defaultCards },
    },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título', type: 'text' },
    { key: 'cards', label: 'Cards (4 itens)', type: 'list' },
  ],
};

export default entry;
