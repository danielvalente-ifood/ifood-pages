import PromoBanner from '@/components/PromoBanner/PromoBanner';
import type { RegistryEntry } from './types';

const TITLE = [
  'Seus clientes do delivery agora',
  'podem viver a experiência completa',
  'com você',
];
const DESCRIPTION =
  'Uma plataforma que organiza atendimento, pedidos, pagamentos e gestão do salão em um único fluxo, pensado para o ritmo real do restaurante.';
const CTAS = [
  { text: 'Ativar agora', link: '#', style: 'primary' as const },
  { text: 'Saiba mais', link: '#', style: 'secondary' as const },
];

const entry: RegistryEntry = {
  type: 'promo',
  label: 'Banner promocional',
  category: 'Conteúdo',
  component: PromoBanner,
  defaults: {
    layout: 'centered',
    title: TITLE,
    description: DESCRIPTION,
    backgroundType: 'color',
    backgroundColor: '#272727',
    backgroundImage: '',
    image: '',
    assetPosition: 'right',
    contentColor: 'light',
    curtain: true,
    ctas: CTAS,
  },
  variants: [
    {
      id: 'centered',
      label: 'Centralizado',
      description: 'Texto e CTAs centralizados sobre o fundo.',
      config: { layout: 'centered' },
    },
    {
      id: 'split',
      label: 'Com imagem',
      description: 'Texto e CTAs à esquerda, card de imagem à direita.',
      config: { layout: 'split' },
    },
    {
      id: 'video',
      label: 'Vídeo',
      description: 'Vídeo full-width (upload ou YouTube). Sem texto sobreposto.',
      config: { layout: 'video', videoType: 'youtube', autoplay: true },
    },
  ],
  schema: [
    { key: 'title', label: 'Título (uma linha por campo)', type: 'list' },
    { key: 'description', label: 'Descrição', type: 'textarea' },
    { key: 'backgroundImage', label: 'Imagem de fundo', type: 'image' },
    { key: 'image', label: 'Imagem (split)', type: 'image' },
    { key: 'ctas', label: 'Botões (0 a 2)', type: 'list' },
  ],
};

export default entry;
