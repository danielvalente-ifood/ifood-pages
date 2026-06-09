import Hero from '@/components/Hero/Hero';
import type { RegistryEntry } from './types';

// Sem imagem por padrão — todos os modelos usam o fundo escuro como placeholder.
const baseTitle = ['Atraia mais clientes e venda', 'mais com o Comer Fora'];
const baseDescription =
  'Delivery, salão, pagamentos e logística em um só lugar. Conecte sua operação, amplifique seu crescimento e ofereça a melhor experiência aos seus clientes.';
const baseCtas = [
  { text: 'Começar agora', link: '#', style: 'primary' },
  { text: 'Saiba mais', link: '#', style: 'secondary' },
];

const entry: RegistryEntry = {
  type: 'hero',
  label: 'Hero',
  category: 'Header',
  component: Hero,
  defaults: {
    variant: 'full',
    title: baseTitle,
    description: baseDescription,
    ctas: baseCtas,
    background_image: '',
  },
  // Cada variante carrega em `config` os campos que a definem — usados pelo
  // preview (?variant=) e pelos cards do BlockSelector.
  variants: [
    {
      id: 'full',
      label: 'Full (imersivo)',
      description: 'Fundo escuro, altura total, conteúdo embaixo à esquerda. Pode virar slider (até 3).',
      config: { variant: 'full', background_image: '' },
    },
    {
      id: 'slider',
      label: 'Slider',
      description: 'Altura média, conteúdo à esquerda. Carrossel de até 3 banners.',
      config: {
        variant: 'slider',
        slider: true,
        slides: [
          { title: baseTitle, description: baseDescription, ctas: baseCtas, background_image: '' },
          {
            title: ['Cresça com inteligência', 'e dados na sua mão'],
            description: baseDescription,
            ctas: baseCtas,
            background_image: '',
          },
          {
            title: ['Tudo em um só', 'ecossistema iFood'],
            description: baseDescription,
            ctas: baseCtas,
            background_image: '',
          },
        ],
      },
    },
    {
      id: 'centered',
      label: 'Centralizado',
      description: 'Compacto, fundo sólido, título/descrição/CTAs centralizados. Sem imagem.',
      config: { variant: 'centered' },
    },
    {
      id: 'split-image',
      label: 'Split com imagem',
      description: 'Texto à esquerda, card de imagem à direita. Posição do asset configurável.',
      config: { variant: 'split-image', assetPosition: 'right', image: '' },
    },
    {
      id: 'split-form',
      label: 'Split com formulário',
      description: 'Texto à esquerda, card de captura de lead à direita.',
      config: {
        variant: 'split-form',
        assetPosition: 'right',
        form: {
          title: 'Fale com a gente',
          subtitle: 'Preencha e retornaremos em breve.',
          label: 'E-mail',
          placeholder: 'seu@email.com',
          button_text: 'Quero saber mais',
          legal: 'Ao continuar, você concorda com nossos termos e política de privacidade.',
          legal_link_text: 'Saiba mais',
          legal_link: '#',
        },
      },
    },
  ],
  schema: [
    { key: 'variant', label: 'Variante de layout', type: 'select', options: ['full', 'slider', 'centered', 'split-image', 'split-form'] },
    { key: 'title', label: 'Título (linhas)', type: 'list' },
    { key: 'description', label: 'Descrição', type: 'textarea' },
    { key: 'background_image', label: 'Imagem de fundo (full/slider)', type: 'image' },
    { key: 'image', label: 'Imagem do card (split-image)', type: 'image' },
  ],
};

export default entry;
