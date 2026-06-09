import { Footer } from '@/components/Footer';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'footer',
  label: 'Footer',
  category: 'Navegação',
  component: Footer,
  defaults: {},
  variants: [
    { id: 'footer-default', label: 'Padrão', description: 'Rodapé com links e logo' },
  ],
  schema: [],
};

export default entry;
