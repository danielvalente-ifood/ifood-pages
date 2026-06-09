import Beneficios from '@/components/Beneficios/Beneficios';
import type { RegistryEntry } from './types';

const baseCards = [
  {
    icon: 'grid-dashboard-bento',
    title: 'Visão 360 do cliente',
    description:
      'Gerencie pedidos online e experiências presenciais no mesmo lugar. Dados unificados, gestão simplificada, crescimento amplificado.',
  },
  {
    icon: 'barchart-default',
    title: 'Operação unificada',
    description:
      'Conheça o histórico completo: o que pedem online, quando visitam o salão, preferências e ticket médio.',
  },
  {
    icon: 'plugin-addon-puzzle',
    title: 'Crescimento amplificado',
    description:
      'Recebimento automático, entregas eficientes e ferramentas de gestão que conversam entre si. Sem integrações complexas, sem dor de cabeça.',
  },
];

const ctasPreset = [
  { text: 'Saiba mais', link: '#', style: 'primary' as const },
  { text: 'Ver detalhes', link: '#', style: 'secondary' as const },
];

const entry: RegistryEntry = {
  type: 'beneficios',
  label: 'Benefícios',
  category: 'Conteúdo',
  component: Beneficios,
  defaults: {
    badge: 'Visão integrada',
    title: ['A maior base de clientes do Brasil', 'está a um clique do seu salão'],
    cards: baseCards,
  },
  variants: [
    {
      id: 'cards',
      label: 'Cards',
      description: 'Ícone, título e descrição. De 2 a 5 cards lado a lado.',
      config: { cards: baseCards },
    },
    {
      id: 'cards-action',
      label: 'Cards com ação',
      description: 'Cada card com CTAs (botão) no rodapé. De 2 a 5 cards.',
      config: {
        cards: baseCards.map((c) => ({ ...c, ctas: ctasPreset })),
      },
    },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título (uma linha por campo)', type: 'list' },
    { key: 'description', label: 'Descrição', type: 'textarea' },
    { key: 'cards', label: 'Cards (2 a 5)', type: 'list' },
  ],
};

export default entry;
