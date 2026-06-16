import Hero from '@/components/Hero/Hero';
import Beneficios from '@/components/Beneficios/Beneficios';
import ContentSection from '@/components/ContentSection/ContentSection';
import PromoBanner from '@/components/PromoBanner/PromoBanner';
import FAQ from '@/components/FAQ/FAQ';
import Footer from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar';
import { SmoothScroll } from '@/components/SmoothScroll/SmoothScroll';
import { SkipLink } from '@/components/SkipLink';

export const metadata = {
  title: 'Conta Digital iFood Pago — A solução financeira para o seu restaurante',
  description:
    'Gerencie crédito, antecipações, Pix e pagamentos em um único lugar. Abra sua conta grátis.',
};

// ---------------------------------------------------------------------------
// Seção 1 — Hero
// ---------------------------------------------------------------------------
const heroData = {
  variant: 'split-image' as const,
  assetPosition: 'right' as const,
  title: ['Conta Digital', 'A solução financeira para', 'o seu restaurante crescer'],
  description:
    'Gerencie crédito, antecipações, Pix e pagamentos em um único lugar. Tudo integrado com a sua operação iFood.',
  image: '',
  ctas: [
    { text: 'Abrir conta grátis', link: '#', style: 'primary' as const },
    { text: 'Saiba mais', link: '#', style: 'secondary' as const },
  ],
};

// ---------------------------------------------------------------------------
// Seção 2 — 4 funcionalidades
// ---------------------------------------------------------------------------
const featuresData = {
  badge: 'O que você tem na Conta Digital',
  title: ['Tudo que seu restaurante', 'precisa em um só lugar'],
  description: '',
  cards: [
    {
      icon: 'rocket-ship',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      title: 'Crédito',
      description:
        'Acesse capital de giro com condições exclusivas para parceiros iFood. Sem burocracia.',
      ctas: [{ text: 'Conhecer crédito', link: '#', style: 'empty' as const }],
    },
    {
      icon: 'barchart-default',
      iconColor: '#0070F3',
      iconBgOpacity: 10,
      title: 'Antecipação',
      description:
        'Antecipe seus recebíveis e mantenha o fluxo de caixa sempre positivo.',
      ctas: [{ text: 'Antecipar agora', link: '#', style: 'empty' as const }],
    },
    {
      icon: 'smartphone',
      iconColor: '#00C46A',
      iconBgOpacity: 10,
      title: 'Pix e Pagamentos',
      description:
        'Receba e faça transferências via Pix 24h, pague fornecedores e boletos direto pelo app.',
      ctas: [{ text: 'Ver pagamentos', link: '#', style: 'empty' as const }],
    },
    {
      icon: 'copy-default',
      iconColor: '#F59E0B',
      iconBgOpacity: 10,
      title: 'Cartão empresarial',
      description:
        'Cartão de débito para compras e despesas do seu negócio com controle total pelo app.',
      ctas: [{ text: 'Pedir cartão', link: '#', style: 'empty' as const }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Seção 3 — Meu Caixa (imagem à direita)
// ---------------------------------------------------------------------------
const caixaData = {
  badge: 'Gestão financeira',
  title: ['Meu Caixa', 'Visão completa das', 'suas finanças'],
  description:
    'Acompanhe entradas, saídas e saldo em tempo real. Veja o histórico de transações, filtre por período e entenda para onde vai cada centavo do seu negócio.',
  image: '',
  assetPosition: 'right' as const,
  ctas: [{ text: 'Conhecer Meu Caixa', link: '#', style: 'primary' as const }],
};

// ---------------------------------------------------------------------------
// Seção 4 — Meu Extrato (imagem à esquerda)
// ---------------------------------------------------------------------------
const extratoData = {
  badge: 'Transparência total',
  title: ['Meu Extrato', 'Cada movimentação', 'no detalhe'],
  description:
    'Visualize todas as transações com data, valor e categoria. Exporte extratos em PDF ou CSV para sua contabilidade. Sem surpresas no fim do mês.',
  image: '',
  assetPosition: 'left' as const,
  ctas: [{ text: 'Ver Meu Extrato', link: '#', style: 'primary' as const }],
};

// ---------------------------------------------------------------------------
// Seção 5 — 100% Gratuita
// ---------------------------------------------------------------------------
const gratuitaData = {
  layout: 'centered' as const,
  title: ['Conta 100% Gratuita', 'Sem taxas, sem mensalidades'],
  description:
    'Abrir e manter sua Conta Digital iFood Pago não custa nada. Você paga apenas pelas transações que escolher realizar.',
  backgroundType: 'color' as const,
  backgroundColor: '#141414',
  contentColor: 'light' as const,
  curtain: false,
  ctas: [{ text: 'Abrir conta grátis', link: '#', style: 'primary' as const }],
};

// ---------------------------------------------------------------------------
// Seção 6 — Como abrir sua conta (Beneficios como steps)
// ---------------------------------------------------------------------------
const stepsData = {
  badge: 'Simples e rápido',
  title: ['Abra sua conta', 'em 3 passos'],
  description: '',
  cards: [
    {
      icon: 'smartphone',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      title: '1. Baixe o app',
      description: 'Disponível no App Store e Google Play. Gratuito para todos os parceiros iFood.',
    },
    {
      icon: 'file-default',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      title: '2. Preencha seus dados',
      description: 'CNPJ, CPF e dados básicos do seu restaurante. Leva menos de 5 minutos.',
    },
    {
      icon: 'check',
      iconColor: '#00C46A',
      iconBgOpacity: 10,
      title: '3. Pronto!',
      description: 'Análise em até 24h. Aprovado, sua conta já fica ativa para usar.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Seção 7 — FAQ
// ---------------------------------------------------------------------------
const faqData = {
  badge: 'Dúvidas frequentes',
  title: 'Ficou com alguma dúvida?',
  description:
    'Respondemos as principais perguntas sobre a Conta Digital iFood Pago.',
  cta: { text: 'Ver todas as dúvidas', link: 'https://www.ifoodpago.com.br/faq' },
  items: [
    {
      id: 1,
      question: 'Quem pode abrir uma Conta Digital iFood Pago?',
      answer:
        'Qualquer parceiro iFood com CNPJ ativo pode abrir uma conta. Também aceitamos MEI e profissionais autônomos vinculados à plataforma.',
    },
    {
      id: 2,
      question: 'A conta tem alguma taxa ou mensalidade?',
      answer:
        'Não. A abertura e manutenção da conta são totalmente gratuitas. Alguns serviços específicos como TED podem ter tarifas, mas o Pix é sempre gratuito.',
    },
    {
      id: 3,
      question: 'Em quanto tempo minha conta é aprovada?',
      answer:
        'Analisamos os dados em até 24 horas úteis. Muitos parceiros têm a conta liberada no mesmo dia.',
    },
    {
      id: 4,
      question: 'Posso antecipar meus recebíveis pelo app?',
      answer:
        'Sim. Você escolhe quais valores antecipar e o dinheiro cai na conta em minutos. As taxas são informadas antes da confirmação.',
    },
    {
      id: 5,
      question: 'O que faço se minha solicitação for negada?',
      answer:
        'Em caso de recusa, você recebe um e-mail com orientações. Geralmente está relacionado a pendências cadastrais ou situação do CNPJ. Você pode regularizar e solicitar nova análise.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Seção 8 — CTA final
// ---------------------------------------------------------------------------
const ctaFinalData = {
  layout: 'centered' as const,
  title: ['Receba mais rápido.', 'Cresça com mais controle.'],
  description:
    'Junte-se a milhares de restaurantes que já usam a Conta Digital iFood Pago para gerir suas finanças.',
  backgroundType: 'color' as const,
  backgroundColor: '#EB0033',
  contentColor: 'light' as const,
  curtain: false,
  ctas: [
    { text: 'Abrir conta grátis', link: '#', style: 'primary' as const },
  ],
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ContaDigitalPage() {
  return (
    <>
      <SmoothScroll />
      <SkipLink />
      <header>
        <Navbar />
      </header>
      <main id="main-content">
        <Hero data={heroData} />
        <Beneficios data={featuresData} />
        <ContentSection data={caixaData} />
        <ContentSection data={extratoData} />
        <PromoBanner data={gratuitaData} />
        <Beneficios data={stepsData} />
        <FAQ data={faqData} />
        <PromoBanner data={ctaFinalData} />
      </main>
      <Footer />
    </>
  );
}
