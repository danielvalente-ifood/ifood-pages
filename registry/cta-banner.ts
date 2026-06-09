import CTABanner from '@/components/CTABanner/CTABanner';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'cta-banner',
  label: 'CTA Banner',
  category: 'Conversão',
  component: CTABanner,
  defaults: {
    title: 'Pronto para começar?',
    subtitle: 'Junte-se a mais de 450 mil parceiros iFood.',
    cta_text: 'Cadastre seu negócio',
    cta_link: '#',
  },
  variants: [
    { id: 'cta-banner-default', label: 'Faixa vermelha', description: 'Fundo vermelho iFood com CTA centralizado' },
  ],
  schema: [
    { key: 'title', label: 'Título', type: 'text' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text' },
    { key: 'cta_text', label: 'Texto do botão', type: 'text' },
    { key: 'cta_link', label: 'Link do botão', type: 'text' },
  ],
};

export default entry;
