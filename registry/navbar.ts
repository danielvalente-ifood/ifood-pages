import { Navbar } from '@/components/Navbar';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'navbar',
  label: 'Navbar',
  category: 'Navegação',
  component: Navbar,
  defaults: {},
  variants: [
    { id: 'navbar-default', label: 'Padrão', description: 'Logo + menu central + CTA' },
  ],
  schema: [],
};

export default entry;
