import Integrated from '@/components/Integrated/Integrated';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'integrated',
  label: 'Features',
  category: 'Features',
  component: Integrated,
  defaults: {
    badge: 'Visão integrada',
    title: 'Por que escolher o ecossistema completo do iFood?',
    image: '/images/ifood/visao_integrada.png',
    features: [
      {
        id: 1,
        title: 'Delivery e Salão',
        subtitle: 'em uma plataforma',
        description: 'Gerencie pedidos online e experiências presenciais no mesmo lugar.',
        icon: '/images/ifood/loja-icon.png',
        iconAlt: 'Ícone de loja',
      },
      {
        id: 2,
        title: 'Visão 360°',
        subtitle: 'dos seus clientes',
        description: 'Conheça o histórico completo de cada cliente.',
        icon: '/images/ifood/people_icon.png',
        iconAlt: 'Ícone de clientes',
      },
      {
        id: 3,
        title: 'Pagamentos, logística e',
        subtitle: 'gestão integrados',
        description: 'Recebimento automático, entregas eficientes e ferramentas de gestão.',
        icon: '/images/ifood/star_icon.png',
        iconAlt: 'Ícone de destaque',
      },
    ],
  },
  variants: [
    { id: 'integrated-features', label: 'Lista de features', description: 'Imagem + lista de funcionalidades com ícones' },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título', type: 'text' },
    { key: 'image', label: 'Imagem principal', type: 'image' },
  ],
};

export default entry;
