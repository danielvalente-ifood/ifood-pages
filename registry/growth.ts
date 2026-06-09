import Growth from '@/components/Growth/Growth';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'growth',
  label: 'Growth',
  category: 'Features',
  component: Growth,
  defaults: {
    badge: 'Cresça com a gente',
    title: ['Para cada tipo de negócio,', 'um iFood que te ajuda a vender mais'],
    tabs: [
      {
        id: 'delivery',
        label: 'Delivery',
        cards: [
          { id: 1, title: 'CRM 360', description: 'Dados unificados que transformam clientes em vendas' },
          { id: 2, title: 'PDV', description: 'Sistema de ponto de venda robusto e intuitivo' },
          { id: 3, title: 'Totem', description: 'Autoatendimento inteligente para sua loja' },
          { id: 4, title: 'Cardápio Digital', description: 'Cardápio interativo e fácil de gerenciar' },
        ],
      },
      {
        id: 'salao',
        label: 'Salão',
        cards: [
          { id: 1, title: 'Gerenciamento de Mesas', description: 'Controle eficiente de ocupação de mesas' },
          { id: 2, title: 'Comanda Digital', description: 'Comanda eletrônica para melhor experiência' },
          { id: 3, title: 'Reservas Online', description: 'Sistema de reservas integrado e automático' },
          { id: 4, title: 'Menu Interativo', description: 'Cardápio digital com fotos e recomendações' },
        ],
      },
    ],
  },
  variants: [
    { id: 'growth-tabs', label: 'Tabs com cards', description: 'Abas horizontais com grade de funcionalidades' },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título (linhas)', type: 'list' },
  ],
};

export default entry;
