import SectionTitle from '@/components/SectionTitle/SectionTitle';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'section-title',
  label: 'Título de Seção',
  category: 'Conteúdo',
  component: SectionTitle,
  defaults: {
    badge: 'A Plataforma Conectada',
    title: ['Um produto para cada momento da sua jornada'],
    description: 'Cada produto foi construído para funcionar sozinho — e brilhar junto.',
    align: 'center',
    theme: 'light',
  },
  variants: [
    {
      id: 'light',
      label: 'Fundo claro',
      description: 'Título centralizado sobre fundo transparente/claro.',
      config: { theme: 'light' },
    },
    {
      id: 'dark',
      label: 'Fundo escuro',
      description: 'Título centralizado sobre fundo #141414.',
      config: { theme: 'dark' },
    },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título', type: 'list' },
    { key: 'description', label: 'Descrição', type: 'textarea' },
  ],
};

export default entry;
