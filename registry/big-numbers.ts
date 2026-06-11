import BigNumbers from '@/components/BigNumbers/BigNumbers';
import type { RegistryEntry } from './types';

const defaultStats = [
  { value: '120 milhões', icon: 'heart', label: 'Pedidos no app' },
  { value: '+450 mil', icon: 'store-building-default', label: 'Estabelecimentos parceiros' },
  { value: '1.5 Mil', icon: 'map-pin-location-default', label: 'Cidades em todo o Brasil' },
  { value: '+60 milhões', icon: 'users-group-default', label: 'Clientes' },
];

const entry: RegistryEntry = {
  type: 'big-numbers',
  label: 'Big Numbers',
  category: 'Conteúdo',
  component: BigNumbers,
  defaults: {
    badge: 'Visão integrada',
    title: 'A maior base de clientes do Brasil está a um clique do seu salão',
    stats: defaultStats,
  },
  variants: [
    {
      id: 'default',
      label: 'Grade horizontal',
      description: 'Estatísticas em destaque lado a lado (3 a 5 itens).',
      config: { stats: defaultStats },
    },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título', type: 'text' },
    { key: 'stats', label: 'Estatísticas (3 a 5)', type: 'list' },
  ],
};

export default entry;
