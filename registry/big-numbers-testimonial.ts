import BigNumbersTestimonial from '@/components/BigNumbersTestimonial/BigNumbersTestimonial';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'big-numbers-testimonial',
  label: 'Big Numbers + Depoimentos',
  category: 'Conteúdo',
  component: BigNumbersTestimonial,
  defaults: {
    badge: 'Resultados reais',
    title: 'Números que falam por si',
    stats: [
      { value: '+30%', description: 'de economia de tempo\nno fechamento de caixa' },
      { value: 'R$0', description: 'de comissão em pedidos\npelo cardápio próprio' },
      { value: '-40%', description: 'de desistência\nna fila de espera' },
    ],
    testimonials: [
      { rating: 5, quote: 'Nós precisávamos de um sistema que nos entregasse muita agilidade, rapidez e principalmente a integração dos aplicativos, e a Saipos nos trouxe isso.', author: 'Lucas Xavier, sócio', company: 'Frango Loco' },
      { rating: 5, quote: 'O robô de WhatsApp pagou o plano inteiro só no primeiro mês. Os clientes adoram e eu não perco mais pedido.', author: 'Ana R.', company: 'Hamburgueria Artesanal' },
      { rating: 5, quote: 'A fila digital foi um divisor de águas. Zero cliente foi embora sem sentar desde que ativamos.', author: 'João P.', company: 'Restaurante A La Carte' },
    ],
  },
  variants: [
    {
      id: 'default',
      label: 'Fundo escuro',
      description: 'Seção escura com big numbers em vermelho e cards de depoimentos brancos.',
      config: {},
    },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título', type: 'text' },
    { key: 'stats', label: 'Estatísticas', type: 'list' },
    { key: 'testimonials', label: 'Depoimentos', type: 'list' },
  ],
};

export default entry;
