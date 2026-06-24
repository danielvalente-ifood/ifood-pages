import ContentSection from '@/components/ContentSection/ContentSection';
import type { RegistryEntry } from './types';

const TITLE = ['Atraia clientes do delivery', 'para o salão'];
const DESCRIPTION = 'Ative sua base de clientes delivery para visitarem seu restaurante.';
const CTAS = [
  { text: 'Ativar agora', link: '#', style: 'primary' as const },
  { text: 'Saiba mais', link: '#', style: 'secondary' as const },
];

const entry: RegistryEntry = {
  type: 'content',
  label: 'Conteúdo',
  category: 'Conteúdo',
  component: ContentSection,
  defaults: {
    badge: 'Comer fora',
    title: TITLE,
    description: DESCRIPTION,
    image: '',
    assetPosition: 'left' as const,
    ctas: CTAS,
  },
  variants: [
    {
      id: 'image-left',
      label: 'Imagem à esquerda',
      description: 'Card de imagem à esquerda, texto e CTAs à direita.',
      config: { assetPosition: 'left' },
    },
    {
      id: 'image-right',
      label: 'Imagem à direita',
      description: 'Texto e CTAs à esquerda, card de imagem à direita.',
      config: { assetPosition: 'right' },
    },
    {
      id: 'bullets-right',
      label: 'Bullets + imagem à direita',
      description: 'Lista de bullet points com ícone check à esquerda, imagem à direita.',
      config: { assetPosition: 'right' },
    },
    {
      id: 'bullets-left',
      label: 'Bullets + imagem à esquerda',
      description: 'Imagem à esquerda, lista de bullet points à direita.',
      config: { assetPosition: 'left' },
    },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título (uma linha por campo)', type: 'list' },
    { key: 'description', label: 'Descrição', type: 'textarea' },
    { key: 'image', label: 'Imagem', type: 'image' },
    { key: 'ctas', label: 'Botões (0 a 2)', type: 'list' },
  ],
};

export default entry;
