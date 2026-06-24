import Segmentos from '@/components/Segmentos/Segmentos';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'segmentos',
  label: 'Segmentos',
  category: 'Conteúdo',
  component: Segmentos,
  defaults: {
    badge: 'Segmentos',
    title: ['Construído para negócios de todos os sabores'],
    tabs: [
      {
        label: 'Bar e Pub',
        icon: '',
        description:
          'Controle de comanda por mesa, gestão de estoque de bebidas e integração com delivery para aumentar o movimento nas noites de semana.',
      },
      {
        label: 'Hamburgueria',
        icon: '',
        description:
          'Cardápio digital, pedidos online e gestão de fila integrados para atender mais clientes no horário de pico sem perder qualidade.',
      },
      {
        label: 'Pizzaria',
        icon: '',
        description:
          'Gestão de delivery e salão em um único sistema, com controle de ingredientes e automação de promoções para aumentar o ticket médio.',
      },
      {
        label: 'Restaurante A La Carte',
        icon: '',
        description:
          'Experiência completa do salão: comanda digital, reservas online, cardápio QR e integração com delivery para maximizar a ocupação das mesas.',
      },
    ],
  },
  variants: [
    {
      id: 'default',
      label: 'Fundo escuro',
      description: 'Seção escura com card branco e tabs de segmento por tipo de restaurante.',
      config: {},
    },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título', type: 'list' },
    { key: 'tabs', label: 'Segmentos (tabs)', type: 'list' },
  ],
};

export default entry;
