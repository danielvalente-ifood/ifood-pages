import ChoiceCards from '@/components/ChoiceCards/ChoiceCards';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'choice-cards',
  label: 'Cards de Escolha',
  category: 'Conteúdo',
  component: ChoiceCards,
  defaults: {
    badge: 'Soluções',
    title: ['Entenda qual a solução ideal', 'para o seu negócio'],
    description: 'Selecione o perfil do seu negócio e veja qual módulo faz mais sentido para você.',
    cards: [
      {
        icon: 'store-building-default',
        iconColor: '#EB0033',
        iconBgOpacity: 10,
        text: 'Estou começando',
        subtitle: 'Fatura menos de R$40k/mês',
        challenges: [
          { text: 'Recebo pedidos pelo WhatsApp' },
          { text: 'Demoro para responder clientes' },
          { text: 'Pago muita comissão em marketplaces' },
        ],
        needs: [
          { text: 'Pagamento Online' },
          { text: 'Cardápio Digital' },
          { text: 'Atendimento Automatizado' },
        ],
        choicebox: {
          label: 'Produto ideal',
          title: 'Anota AI',
          description: 'Robô com IA no WhatsApp, cardápio digital e canal próprio de delivery sem comissão por pedido.',
          image: '/images/anota-ai-logo.png',
        },
        ctaText: 'Contratar agora',
        ctaLink: '#',
      },
      {
        icon: 'barchart-default',
        iconColor: '#EB0033',
        iconBgOpacity: 10,
        text: 'Estou crescendo',
        subtitle: 'Fatura mais de R$40k/mês',
        challenges: [
          { text: 'Não sei meu CMV' },
          { text: 'Tenho múltiplos canais de venda' },
          { text: 'Estoque desorganizado' },
        ],
        needs: [
          { text: 'Gestão Financeira' },
          { text: 'Centralização de Pedidos' },
          { text: 'Controle de Estoque' },
        ],
        choicebox: {
          label: 'Produto ideal',
          title: 'Saipos',
          description: 'Sistema completo com CMV automático, integração iFood, estoque e gestão multi-canal em um só lugar.',
          image: '/images/saipos-logo.png',
        },
        ctaText: 'Contratar agora',
        ctaLink: '#',
      },
      {
        icon: 'rocket-ship',
        iconColor: '#EB0033',
        iconBgOpacity: 10,
        text: 'Estou expandindo',
        subtitle: 'Redes e grupos com múltiplas unidades',
        challenges: [
          { text: 'Gestão multiunidade' },
          { text: 'Operação distribuída' },
          { text: 'Necessidade de soluções customizadas' },
        ],
        needs: [
          { text: 'CRM avançado' },
          { text: 'Integrações customizadas' },
          { text: 'Soluções sob medida' },
          { text: 'Estoque centralizado' },
        ],
        choicebox: {
          label: 'Fale com um especialista',
          title: 'Construímos uma proposta personalizada para sua operação.',
          description: 'Ideal para operações que precisam escalar com padronização.',
          image: '',
        },
        ctaText: 'Contratar agora',
        ctaLink: '#',
      },
    ],
  },
  variants: [
    {
      id: 'default',
      label: 'Padrão',
      description: '3 cards verticais com desafios, tags de necessidades e produto recomendado.',
      config: {},
    },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título', type: 'list' },
    { key: 'description', label: 'Descrição', type: 'textarea' },
  ],
};

export default entry;
