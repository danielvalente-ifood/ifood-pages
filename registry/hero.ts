import Hero from '@/components/Hero/Hero';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'hero',
  label: 'Hero',
  category: 'Header',
  component: Hero,
  defaults: {
    title: ['Seu negócio pede', 'ecossistema conectado'],
    description:
      'Delivery, salão, pagamentos e logística em um só lugar. Conecte sua operação, amplifique seu crescimento e ofereça a melhor experiência aos seus clientes.',
    cta_text: 'Conheça',
    cta_link: '#',
    background_image: '/images/ifood/bg_ifood_ecossistema.png',
    logo_decoration: '/images/ifood/Logo_decoration.svg',
    variant: 'image-left',
  },
  variants: [
    { id: 'hero-image-left', label: 'Imagem à esquerda', description: 'Texto à direita, imagem à esquerda' },
    { id: 'hero-image-right', label: 'Imagem à direita', description: 'Texto à esquerda, imagem à direita' },
    { id: 'hero-image-overlay', label: 'Imagem de fundo', description: 'Conteúdo sobre imagem em overlay' },
    { id: 'hero-full-width', label: 'Full width', description: 'Faixa larga centralizada' },
  ],
  schema: [
    { key: 'title', label: 'Título (linhas)', type: 'list' },
    { key: 'description', label: 'Descrição', type: 'textarea' },
    { key: 'cta_text', label: 'Texto do CTA', type: 'text' },
    { key: 'cta_link', label: 'Link do CTA', type: 'text' },
    { key: 'background_image', label: 'Imagem de fundo', type: 'image' },
    { key: 'logo_decoration', label: 'Logo decorativo', type: 'image' },
    { key: 'variant', label: 'Variante de layout', type: 'select', options: ['image-left', 'image-right', 'image-overlay', 'full-width'] },
  ],
};

export default entry;
