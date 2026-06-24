import BrandCarousel from '@/components/BrandCarousel/BrandCarousel';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'brand-carousel',
  label: 'Carrossel de Marcas',
  category: 'Conteúdo',
  component: BrandCarousel,
  defaults: {
    badge: 'Empresas parceiras',
    title: 'Empresas de todos os portes utilizam e aprovam nossas soluções',
    logos: Array.from({ length: 11 }, () => ({ src: '', alt: '' })),
  },
  variants: [
    {
      id: 'default',
      label: 'Padrão',
      description: 'Badge + título + linha de logos sobre fundo #FAFAFC.',
      config: {},
    },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título', type: 'text' },
    { key: 'logos', label: 'Logos', type: 'list' },
  ],
};

export default entry;
