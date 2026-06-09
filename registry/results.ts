import Results from '@/components/Results/Results';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'results',
  label: 'Depoimentos',
  category: 'Prova Social',
  component: Results,
  defaults: {
    badge: 'Resultado na prática',
    title: ['O que nossos parceiros estão falando', 'sobre vender com o iFood'],
    testimonials: [
      {
        id: 1,
        name: 'Gabriel',
        company: 'Pizza Prime',
        image: '/images/ifood/Gabriel_pizzaprime.png',
        main_quote: 'O iFood nos ajudou a triplicar a quantidade de clientes.',
        full_quote: 'As estratégias do iFood ajudaram a Pizza Prime a crescer e alcançar novos públicos.',
        rating: 5,
      },
      {
        id: 2,
        name: 'Marina',
        company: 'Sushi & Roll',
        image: '/images/ifood/testimoniial_2.png',
        main_quote: 'Aumentamos em 180% nossas vendas no primeiro ano.',
        full_quote: 'O iFood abriu portas que não imaginávamos. Começamos com um restaurante pequeno e hoje temos três filiais.',
        rating: 5,
      },
    ],
  },
  variants: [
    { id: 'results-carousel', label: 'Carrossel', description: 'Depoimentos em carrossel horizontal' },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título (linhas)', type: 'list' },
  ],
};

export default entry;
