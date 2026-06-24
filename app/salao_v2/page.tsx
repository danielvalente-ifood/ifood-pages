import Hero from '@/components/Hero/Hero';
import SegmentTabs from '@/components/SegmentTabs/SegmentTabs';
import ContentSection from '@/components/ContentSection/ContentSection';
import PromoBanner from '@/components/PromoBanner/PromoBanner';
import BigNumbers from '@/components/BigNumbers/BigNumbers';
import Results from '@/components/Results/Results';
import Beneficios from '@/components/Beneficios/Beneficios';
import LeadForm from '@/components/LeadForm/LeadForm';
import FAQ from '@/components/FAQ/FAQ';
import Footer from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar';
import { SmoothScroll } from '@/components/SmoothScroll/SmoothScroll';
import { SkipLink } from '@/components/SkipLink';
import styles from './page.module.css';

export const metadata = {
  title: 'iFood Salão — As melhores soluções para gestão e vendas',
  description:
    'Do PDV ao cardápio digital, o ecossistema completo para atrair, vender e fidelizar no ritmo do seu negócio.',
};

// ---------------------------------------------------------------------------
// Seção 1 — Hero (foto escura + texto branco, left-aligned)
// ---------------------------------------------------------------------------
const heroData = {
  variant: 'full' as const,
  title: ['As melhores soluções para gestão', 'e para aumentar as suas vendas'],
  description:
    'iFood Salão: Do PDV ao cardápio digital, o ecossistema completo para atrair, vender e fidelizar no ritmo do seu negócio.',
  image: '/salao_v2/hero.jpg',
  ctas: [
    { text: 'Conhecer soluções', link: '#planos', style: 'primary' as const },
  ],
};

// ---------------------------------------------------------------------------
// Seção 2 — Segmentos (tabs com descrição)
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
  ],
};

// ---------------------------------------------------------------------------
// Seção 3a — Saipos (texto esquerda, imagem direita)
// ---------------------------------------------------------------------------
const saiposData = {
  badge: 'Saipos',
  title: ['Gestão completa — O motor do restaurante'],
  features: [
    { text: 'PDV Intuitivo — Feche contas em segundos com toque único' },
    { text: 'Controle Total — Estoque, financeiro e DRE em tempo real' },
    { text: 'Hub de Integrações — iFood, Rappi e site próprio na mesma tela' },
    { text: 'Monitor KDS — Adeus às comandas de papel na cozinha' },
  ],
  image: '/salao_v2/pdv.png',
  assetPosition: 'right' as const,
  ctas: [{ text: 'Conhecer o Saipos', link: 'https://saipos.com/', style: 'primary' as const }],
};

// ---------------------------------------------------------------------------
// Seção 3b — Anota.ai (imagem esquerda, texto direita)
// ---------------------------------------------------------------------------
const anotaData = {
  badge: 'Anota aí',
  title: ['Robô de atendimento + cardápio digital'],
  features: [
    { text: 'Atendente Virtual com IA — Robô no WhatsApp que nunca erra um pedido' },
    { text: 'Cardápio Digital Próprio — Zero taxas de marketplace' },
    { text: 'Fidelização Automatizada — Cupons, programa de pontos e Pix automático' },
  ],
  image: '/salao_v2/anota.png',
  assetPosition: 'left' as const,
  ctas: [{ text: 'Conhecer o Anota.ai', link: 'https://anota.ai/', style: 'primary' as const }],
};

// ---------------------------------------------------------------------------
// Seção 3c — Comer Fora / Get In (texto esquerda, imagem direita)
// ---------------------------------------------------------------------------
const comerForaData = {
  badge: 'Comer Fora e Reservas',
  title: ['Fidelização e Recorrência'],
  features: [
    { text: 'Visibilidade gratuita na vitrine do maior app de food do Brasil' },
    { text: 'CRM nativo do salão: Dados reais de quem visita, quando e com que frequência' },
    { text: 'Recorrência garantida: Cashback e promoções do salão fazem o cliente voltar' },
    { text: 'Zero marketing: Promoções ativas geram visibilidade automática na sua região' },
    { text: 'Disponível nas cidades de Campinas, Curitiba e Salvador' },
  ],
  image: '/salao_v2/getin-bg.png',
  assetPosition: 'right' as const,
  ctas: [{ text: 'Conhecer o Comer Fora', link: '#demo', style: 'primary' as const }],
};

// ---------------------------------------------------------------------------
// Seção 4 — PromoBanner escuro (texto central, foto de fundo)
// ---------------------------------------------------------------------------
const promoBannerData = {
  layout: 'centered' as const,
  title: ['Seus clientes do delivery agora podem', 'viver a experiência completa com você'],
  description:
    'Uma plataforma que organiza atendimento, pedidos, pagamentos e gestão do salão em um único fluxo, pensado para o ritmo real do restaurante.',
  backgroundType: 'color' as const,
  backgroundColor: '#141414',
  ctas: [{ text: 'Quero saber mais', link: '#demo', style: 'primary' as const }],
};

// ---------------------------------------------------------------------------
// Seção 5 — BigNumbers (métricas)
// ---------------------------------------------------------------------------
const bigNumbersData = {
  badge: 'Resultados reais',
  title: 'Números que falam por si',
  stats: [
    {
      value: '1M+',
      icon: 'users-group-default',
      label: 'Restaurantes na rede iFood',
      iconColor: '#EE073A',
      iconBgOpacity: 10,
    },
    {
      value: '93%',
      icon: 'check',
      label: 'de clientes satisfeitos com as soluções',
      iconColor: '#00C46A',
      iconBgOpacity: 10,
    },
    {
      value: '4.9',
      icon: 'barchart-default',
      label: 'avaliação média nas lojas parceiras',
      iconColor: '#0070F3',
      iconBgOpacity: 10,
    },
  ],
};

// ---------------------------------------------------------------------------
// Seção 6 — Depoimentos
// ---------------------------------------------------------------------------
const resultsData = {
  badge: 'Resultado na prática',
  title: ['O que nossos parceiros estão', 'falando sobre o iFood Salão'],
  testimonials: [
    {
      id: 1,
      name: 'Lucas Xavier, sócio',
      company: 'Frango Loco',
      image: '',
      main_quote: 'Nós precisávamos de um sistema que nos entregasse muita agilidade, rapidez e integração.',
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
// Seção 7 — Soluções (3 cards com ícone — "qual solução é pra você?")
// ---------------------------------------------------------------------------
const solucoesData = {
  badge: 'Soluções',
  title: ['Entenda qual a melhor', 'solução para você'],
  description: 'Selecione o perfil do seu negócio e veja qual módulo faz mais sentido para você.',
  cards: [
    {
      icon: 'plugin-addon-puzzle',
      title: 'Delivery até 40k',
      description:
        '"Faturo menos de 40k e quero ter meu canal próprio de delivery sem pagar taxas de marketplace."',
      iconColor: '#EE073A',
      iconBgOpacity: 8,
    },
    {
      icon: 'grid-dashboard-bento',
      title: 'Gestão acima de 40k',
      description:
        '"Faturo mais de 40k e quero soluções de gestão para centralizar meus canais e escalar a operação."',
      iconColor: '#0070F3',
      iconBgOpacity: 8,
    },
    {
      icon: 'users-group-default',
      title: 'Rede com 5+ lojas',
      description:
        '"Tenho uma rede com mais de 5 lojas e quero uma solução customizada para crescer com consistência."',
      iconColor: '#00C46A',
      iconBgOpacity: 8,
    },
  ],
  variant: 'compact' as const,
};

// ---------------------------------------------------------------------------
// Seção 8 — Lead Form
// ---------------------------------------------------------------------------
const leadFormData = {
  badge: 'Demonstração gratuita',
  title: 'Vamos agendar sua demonstração gratuita',
  subtitle:
    'Contrate a solução para o seu restaurante que centraliza sua gestão, traz clareza no dia a dia.',
  benefits: [
    { text: 'Resposta em até 2 horas úteis' },
    { text: 'Demo personalizada para o seu segmento' },
    { text: 'Sem compromisso de contratação' },
    { text: 'Diagnóstico gratuito da sua operação atual' },
  ],
  form_title: 'Preencha seus dados',
  fields: [
    { id: 'nome', label: 'Nome completo', type: 'text' as const, placeholder: 'Seu nome', required: true },
    { id: 'email', label: 'Email', type: 'email' as const, placeholder: 'Seu email', required: true },
    { id: 'telefone', label: 'Telefone / Whatsapp', type: 'tel' as const, placeholder: 'Número', required: true },
    { id: 'restaurante', label: 'Nome do restaurante', type: 'text' as const, placeholder: 'Restaurante', required: true },
    { id: 'cnpj', label: 'CNPJ', type: 'text' as const, placeholder: 'Somente números', required: false, fullWidth: true },
    {
      id: 'desafio',
      label: 'Maior desafio atual',
      type: 'select' as const,
      required: true,
      fullWidth: true,
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
  title: 'Ficou com alguma dúvida?',
  description: 'Encontre as respostas para as principais dúvidas sobre o iFood Salão.',
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
export default function SalaoV2Page() {
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

        {/* A Plataforma Conectada — cabeçalho + 3 seções alternadas */}
        <div className={styles.platformHeader}>
          <span className={styles.platformBadge}>A Plataforma Conectada</span>
          <h2 className={styles.platformTitle}>Um produto para cada momento da sua jornada</h2>
          <p className={styles.platformSubtitle}>
            Cada produto foi construído para funcionar sozinho — e brilhar junto.
          </p>
        </div>
        <ContentSection data={saiposData} />
        <ContentSection data={anotaData} />
        <ContentSection data={comerForaData} />

        <PromoBanner data={promoBannerData} />
        <BigNumbers data={bigNumbersData} />
        <Results data={resultsData} />
        <Beneficios data={solucoesData} />
        <LeadForm data={leadFormData} />
        <FAQ data={faqData} />
      </main>
      <Footer />
    </>
  );
}
