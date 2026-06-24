import Hero from '@/components/Hero/Hero';
import SegmentTabs from '@/components/SegmentTabs/SegmentTabs';
import ProductCards from '@/components/ProductCards/ProductCards';
import PromoBanner from '@/components/PromoBanner/PromoBanner';
import BigNumbers from '@/components/BigNumbers/BigNumbers';
import Results from '@/components/Results/Results';
import Solutions from '@/components/Solutions/Solutions';
import LeadForm from '@/components/LeadForm/LeadForm';
import FAQ from '@/components/FAQ/FAQ';
import Footer from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar';
import { SmoothScroll } from '@/components/SmoothScroll/SmoothScroll';
import { SkipLink } from '@/components/SkipLink';

export const metadata = {
  title: 'iFood Salão — As melhores soluções para gestão e vendas',
  description:
    'Do PDV ao cardápio digital, o ecossistema completo para atrair, vender e fidelizar no ritmo do seu negócio.',
};

// ---------------------------------------------------------------------------
// Seção 1 — Hero
// ---------------------------------------------------------------------------
const heroData = {
  variant: 'centered' as const,
  title: ['As melhores soluções para gestão', 'e para aumentar as suas vendas'],
  description:
    'iFood Salão: Do PDV ao cardápio digital, o ecossistema completo para atrair, vender e fidelizar no ritmo do seu negócio.',
  ctas: [
    { text: 'Ver produtos', link: '#planos', style: 'secondary' as const },
    { text: 'Conhecer Soluções', link: '#demo', style: 'primary' as const },
  ],
};

// ---------------------------------------------------------------------------
// Seção 2 — Segmentos
// ---------------------------------------------------------------------------
const segmentTabsData = {
  badge: 'Segmentos',
  title: 'Construído para negócios de todos os sabores.',
  tabs: [
    {
      id: 'bar',
      label: 'Bar e Pub',
      description:
        'Controle de comanda por mesa, gestão de estoque de bebidas e integração com delivery para aumentar o movimento nas noites de semana.',
    },
    {
      id: 'hamburgueria',
      label: 'Hamburgueria',
      description:
        'KDS integrado para agilizar a produção, cardápio digital próprio sem taxa e robô de WhatsApp para picos de demanda.',
    },
    {
      id: 'pizzaria',
      label: 'Pizzaria',
      description:
        'Rotas de entrega otimizadas, atendente IA que anota pedidos às 23h e DRE em tempo real para cada unidade.',
    },
    {
      id: 'alacarte',
      label: 'Restaurante A La Carte',
      description:
        'CRM que conhece o cliente pelo nome, gestão de reservas sem caderninho e fechamento de conta em segundos.',
    },
    {
      id: 'fastcasual',
      label: 'Fast Casual',
      description:
        'Fila digital que reduz abandono, integração com iFood e Rappi na mesma tela e Pix automatizado.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Seção 3 — Produtos (Pillars)
// ---------------------------------------------------------------------------
const productCardsData = {
  badge: 'A Plataforma Conectada',
  title: 'Um produto para cada momento da sua jornada',
  cards: [
    {
      label: 'Gestão completa',
      name: 'Saipos',
      description: 'O motor da sua operação, do caixa ao estoque.',
      features: [
        { text: 'PDV intuitivo — feche contas em segundos com toque único' },
        { text: 'Controle de estoque automatizado e alertas de reposição' },
        { text: 'DRE em tempo real por unidade ou rede' },
        { text: 'Hub de integrações: iFood, Rappi e site próprio na mesma tela' },
        { text: 'Monitor KDS — adeus às comandas de papel na cozinha' },
      ],
      cta: { text: 'Conheça o Saipos', link: 'https://saipos.com/' },
    },
    {
      label: 'Robô de atendimento + Delivery',
      name: 'Anota.ai',
      description: 'Seu balcão digital 24 horas, sem taxas de marketplace.',
      features: [
        { text: 'Atendente virtual no WhatsApp que anota pedidos automaticamente' },
        { text: 'Cardápio digital próprio — zero comissão para marketplaces' },
        { text: 'Pix automatizado ao fechar cada pedido' },
        { text: 'Cupons de desconto e programa de fidelidade automático' },
        { text: 'Disponível 24h por dia, 7 dias por semana, sem pausas' },
      ],
      cta: { text: 'Conheça o Anota.ai', link: 'https://anota.ai/' },
    },
    {
      label: 'Fidelização e Recorrência',
      name: 'Get In · Comer Fora',
      description: 'Experiência no salão e no delivery conectadas.',
      features: [
        { text: 'Gestão de filas digital em todas as unidades' },
        { text: 'Cliente acompanha a posição pelo celular' },
        { text: 'CRM unificado com histórico por loja' },
        { text: 'Checkout em 3 segundos — zero fila no caixa' },
        { text: 'Integração com Comer Fora para atrair novos clientes' },
      ],
      cta: { text: 'Conheça o Get In', link: '#demo' },
    },
  ],
};

// ---------------------------------------------------------------------------
// Seção 4 — AI Highlight (dark)
// ---------------------------------------------------------------------------
const aiHighlightData = {
  layout: 'centered' as const,
  title: ['Seus clientes do delivery agora podem', 'viver a experiência completa com você'],
  description:
    'Uma plataforma que organiza atendimento, pedidos, pagamentos e gestão do salão em um único fluxo, pensado para o ritmo real do restaurante.',
  backgroundType: 'color' as const,
  backgroundColor: '#141414',
  ctas: [{ text: 'Quero saber mais', link: '#demo', style: 'primary' as const }],
};

// ---------------------------------------------------------------------------
// Seção 5 — Métricas (Social Proof)
// ---------------------------------------------------------------------------
const metricsData = {
  badge: 'Resultados reais',
  title: 'Números que falam por si.',
  stats: [
    {
      value: '+30%',
      icon: 'barchart-default',
      label: 'de economia de tempo no fechamento de caixa',
      iconColor: '#EE073A',
      iconBgOpacity: 10,
    },
    {
      value: 'R$0',
      icon: 'check',
      label: 'de comissão em pedidos pelo cardápio próprio',
      iconColor: '#00C46A',
      iconBgOpacity: 10,
    },
    {
      value: '-40%',
      icon: 'users-group-default',
      label: 'de desistência na fila de espera',
      iconColor: '#0070F3',
      iconBgOpacity: 10,
    },
  ],
};

// ---------------------------------------------------------------------------
// Seção 6 — Depoimentos
// ---------------------------------------------------------------------------
const testimonialsData = {
  badge: 'Resultado na prática',
  title: ['O que nossos parceiros estão falando', 'sobre o iFood Salão'],
  testimonials: [
    {
      id: 1,
      name: 'Lucas Xavier',
      company: 'Frango Loco',
      image: '',
      main_quote: 'Nós precisávamos de um sistema que nos entregasse muita agilidade e rapidez.',
      full_quote:
        'Nós precisávamos de um sistema que nos entregasse muita agilidade, rapidez e principalmente a integração dos aplicativos, e a Saipos nos trouxe isso.',
      rating: 5 as const,
    },
    {
      id: 2,
      name: 'Ana R.',
      company: 'Hamburgueria Artesanal',
      image: '',
      main_quote: 'O robô de WhatsApp pagou o plano inteiro só no primeiro mês.',
      full_quote:
        'O robô de WhatsApp pagou o plano inteiro só no primeiro mês. Os clientes adoram e eu não perco mais pedido.',
      rating: 5 as const,
    },
    {
      id: 3,
      name: 'João P.',
      company: 'Restaurante A La Carte',
      image: '',
      main_quote: 'A fila digital foi um divisor de águas.',
      full_quote:
        'A fila digital foi um divisor de águas. Zero cliente foi embora sem sentar desde que ativamos.',
      rating: 5 as const,
    },
  ],
};

// ---------------------------------------------------------------------------
// Seção 7 — Soluções (diagnóstico interativo)
// ---------------------------------------------------------------------------
const solutionsData = {
  badge: 'Soluções',
  title: 'Entenda qual a melhor solução para você.',
  subtitle:
    'Selecione o perfil do seu negócio e veja qual módulo faz mais sentido para você.',
  solutions: [
    {
      id: 'sol-1',
      icon: '🛵',
      trigger: '"Faturo menos de 40k e quero ter meu canal próprio de delivery"',
      tag: 'Solução recomendada',
      title: 'Anota.ai — Delivery com IA',
      subtitle: 'Seu balcão digital 24 horas, sem taxas de marketplace.',
      features: [
        { text: 'Atendente virtual no WhatsApp que anota pedidos automaticamente' },
        { text: 'Cardápio digital próprio — zero comissão para marketplaces' },
        { text: 'Pix automatizado ao fechar cada pedido' },
        { text: 'Cupons de desconto e programa de fidelidade automático' },
        { text: 'Disponível 24h por dia, 7 dias por semana, sem pausas' },
      ],
      cta: { text: 'Quero o Anota.ai', link: 'https://anota.ai/' },
    },
    {
      id: 'sol-2',
      icon: '📊',
      trigger: '"Faturo mais de 40k e quero soluções de gestão para centralizar meus canais"',
      tag: 'Solução recomendada',
      title: 'Saipos — Gestão e PDV Completo',
      subtitle: 'O motor da sua operação, do caixa ao estoque.',
      features: [
        { text: 'PDV intuitivo — feche contas em segundos com toque único' },
        { text: 'Controle de estoque automatizado e alertas de reposição' },
        { text: 'DRE em tempo real por unidade ou rede' },
        { text: 'Hub de integrações: iFood, Rappi e site próprio na mesma tela' },
        { text: 'Monitor KDS — adeus às comandas de papel na cozinha' },
      ],
      cta: { text: 'Quero o Saipos', link: 'https://saipos.com/' },
    },
    {
      id: 'sol-3',
      icon: '🏢',
      trigger: '"Tenho uma rede com mais de 5 lojas e quero uma solução customizada"',
      tag: 'Solução recomendada · Redes e Múltiplas Unidades',
      title: 'Solução Customizada para Redes',
      subtitle: 'Um ecossistema enterprise que conecta todas as suas lojas.',
      features: [
        { text: 'Gestão de filas digital em todas as unidades' },
        { text: 'CRM unificado com histórico por loja' },
        { text: 'Checkout em 3 segundos — zero fila no caixa' },
        { text: 'Integração com Comer Fora para atrair novos clientes' },
        { text: 'Dashboard consolidado por rede de lojas' },
      ],
      cta: { text: 'Falar com especialista', link: '#demo' },
    },
  ],
};

// ---------------------------------------------------------------------------
// Seção 8 — Lead Form
// ---------------------------------------------------------------------------
const leadFormData = {
  badge: 'Demonstração Gratuita',
  title: 'Vamos agendar sua demonstração gratuita.',
  subtitle:
    'Contrate a solução para o seu restaurante que centraliza sua gestão e traz clareza no dia a dia.',
  benefits: [
    { icon: '⚡', text: 'Resposta em até 2 horas úteis' },
    { icon: '🎯', text: 'Demo personalizada para o seu segmento' },
    { icon: '🔒', text: 'Sem compromisso de contratação' },
    { icon: '📊', text: 'Diagnóstico gratuito da sua operação atual' },
  ],
  form_title: 'Preencha seus dados',
  fields: [
    { id: 'nome', label: 'Nome completo', type: 'text' as const, placeholder: 'Seu nome', required: true },
    { id: 'email', label: 'E-mail', type: 'email' as const, placeholder: 'seu@email.com', required: true },
    { id: 'telefone', label: 'Telefone / WhatsApp', type: 'tel' as const, placeholder: '(11) 99999-9999', required: true },
    { id: 'restaurante', label: 'Nome do Restaurante', type: 'text' as const, placeholder: 'Nome do seu negócio', required: true },
    {
      id: 'desafio',
      label: 'Maior desafio atual',
      type: 'select' as const,
      required: true,
      options: ['Delivery caótico', 'Controle Financeiro / Estoque', 'Filas no Salão', 'Tudo junto'],
    },
  ],
  submit_text: 'Quero ver o sistema na prática',
  success_message: 'Recebemos! Nossa equipe entrará em contato em até 2 horas.',
};

// ---------------------------------------------------------------------------
// Seção 9 — FAQ
// ---------------------------------------------------------------------------
const faqData = {
  badge: 'FAQ',
  title: 'Perguntas frequentes',
  description: 'Tire suas dúvidas sobre o ecossistema iFood Salão.',
  cta: { text: 'Falar com um especialista', link: '#demo' },
  items: [
    {
      id: 1,
      question: 'Sou obrigado a contratar todas as soluções juntas em um único pacote?',
      answer:
        'Não. Entendemos que cada restaurante possui necessidades diferentes. Você pode escolher e contratar de forma modular apenas a solução que resolve o seu problema imediato.',
    },
    {
      id: 2,
      question: 'Se eu contratar apenas o Cardápio Digital agora, posso adicionar o PDV no futuro?',
      answer:
        'Com certeza! Nossas ferramentas foram criadas para trabalhar de forma independente ou em conjunto. Você pode plugar novas soluções facilmente conforme o seu negócio for crescendo.',
    },
    {
      id: 3,
      question: 'Como sei qual solução é a mais indicada para mim hoje?',
      answer:
        'Nosso time de especialistas está disponível para uma consultoria rápida. Eles avaliam seus maiores gargalos (seja no salão, no atendimento virtual ou na cozinha) e indicam o módulo com maior impacto financeiro para o seu momento.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function Salao2Page() {
  return (
    <>
      <SmoothScroll />
      <SkipLink />
      <header>
        <Navbar />
      </header>
      <main id="main-content">
        <Hero data={heroData} />
        <SegmentTabs data={segmentTabsData} />
        <ProductCards data={productCardsData} />
        <PromoBanner data={aiHighlightData} />
        <BigNumbers data={metricsData} />
        <Results data={testimonialsData} />
        <Solutions data={solutionsData} />
        <LeadForm data={leadFormData} />
        <FAQ data={faqData} />
      </main>
      <Footer />
    </>
  );
}
