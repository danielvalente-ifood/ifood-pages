import Hero from '@/components/Hero/Hero';
import Beneficios from '@/components/Beneficios/Beneficios';
import ContentSection from '@/components/ContentSection/ContentSection';
import PromoBanner from '@/components/PromoBanner/PromoBanner';
import Footer from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar';
import { SmoothScroll } from '@/components/SmoothScroll/SmoothScroll';
import { SkipLink } from '@/components/SkipLink';

export const metadata = {
  title: 'Antecipação iFood Pago — Receba mais rápido e impulsione seu restaurante',
  description:
    'Antecipe o valor das suas vendas no iFood e mantenha o fluxo de caixa sempre positivo. Contrate pelo app iFood Pago.',
};

// ---------------------------------------------------------------------------
// Seção 1 — Hero
// ---------------------------------------------------------------------------
const heroData = {
  variant: 'split-image' as const,
  assetPosition: 'right' as const,
  title: ['Antecipação', 'Receba mais rápido e impulsione', 'o crescimento do seu restaurante.'],
  description:
    'Antecipe o valor das suas vendas no iFood e mantenha o caixa sempre cheio para investir no que importa.',
  image: '',
  ctas: [
    { text: 'Abrir conta grátis', link: '#', style: 'primary' as const },
    { text: 'Saiba mais', link: '#', style: 'secondary' as const },
  ],
};

// ---------------------------------------------------------------------------
// Seção 2 — Fluxo de caixa ágil
// ---------------------------------------------------------------------------
const fluxoData = {
  badge: 'iFood Pago',
  title: ['Seu fluxo de caixa', 'agora mais ágil'],
  description:
    'Conheça as soluções do iFood Pago que ajudam você a receber dinheiro mais rápido no seu caixa, oferecendo mais liberdade pra você cuidar do seu negócio.',
  image: '',
  assetPosition: 'right' as const,
  ctas: [{ text: 'Conhecer soluções', link: '#', style: 'primary' as const }],
};

// ---------------------------------------------------------------------------
// Seção 3a — Antecipação Pontual (texto)
// ---------------------------------------------------------------------------
const pontualData = {
  badge: 'Antecipação Pontual',
  title: ['Surgiu um imprevisto?', 'Antecipe quando precisar'],
  description:
    'Antecipe agora o seu valor de vendas acumulado no iFood! Você antecipa apenas o que já vendeu e foi apurado. Por exemplo: se você tem R$ 500 de vendas apuradas, pode antecipar o valor de uma única vez — sem mudar seu plano de recebimento.',
  image: '',
  assetPosition: 'left' as const,
  ctas: [{ text: 'Contrate no iFood Pago', link: '#', style: 'primary' as const }],
};

// ---------------------------------------------------------------------------
// Seção 3b — 5 vantagens da Antecipação Pontual
// ---------------------------------------------------------------------------
const vantagensPontualData = {
  badge: 'Quais são as vantagens?',
  title: ['Antecipação Pontual', 'feita para o seu ritmo'],
  description: '',
  cards: [
    {
      icon: 'plugin-addon-puzzle',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      title: 'Flexibilidade',
      description: 'Antecipe somente quando necessário, sem compromissos recorrentes.',
    },
    {
      icon: 'users-group-default',
      iconColor: '#0070F3',
      iconBgOpacity: 10,
      title: 'Atendimento pontual',
      description: 'Ideal para necessidades pontuais de fluxo de caixa.',
    },
    {
      icon: 'rocket-ship',
      iconColor: '#00C46A',
      iconBgOpacity: 10,
      title: 'Acesso rápido',
      description: 'Capital de giro disponível em minutos diretamente na conta.',
    },
    {
      icon: 'check',
      iconColor: '#F59E0B',
      iconBgOpacity: 10,
      title: 'Sem compromissos',
      description: 'Sem alterar seu plano de recebimento atual.',
    },
    {
      icon: 'barchart-default',
      iconColor: '#8B5CF6',
      iconBgOpacity: 10,
      title: 'Mais autonomia',
      description: 'Você decide quando e quanto antecipar com total controle.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Seção 4 — Plano de Repasses
// ---------------------------------------------------------------------------
const repassesData = {
  badge: 'Plano de Repasses',
  title: ['Receba em até', '7 dias úteis'],
  description:
    'Venda hoje e receba em até 7 dias úteis. O plano perfeito para quem quer mais previsibilidade no caixa e menos espera para ver o dinheiro entrar na conta.',
  image: '',
  assetPosition: 'right' as const,
  ctas: [{ text: 'Contrate no app', link: '#', style: 'primary' as const }],
};

// ---------------------------------------------------------------------------
// Seção 5 — Promo "Dinheiro mais rápido" (escuro)
// ---------------------------------------------------------------------------
const rapidoData = {
  layout: 'centered' as const,
  title: ['Dinheiro mais rápido', 'na sua conta!'],
  description:
    'Gerencie seus repasses e acompanhe seu fluxo de caixa direto pelo iFood Pago.',
  backgroundType: 'color' as const,
  backgroundColor: '#141414',
  contentColor: 'light' as const,
  curtain: false,
  ctas: [{ text: 'Baixe o app agora', link: '#', style: 'primary' as const }],
};

// ---------------------------------------------------------------------------
// Seção 6 — Promo "O tempero do seu caixa"
// ---------------------------------------------------------------------------
const tempetoData = {
  layout: 'centered' as const,
  title: ['Plano de Repasses do iFood Pago:', 'o tempero que seu caixa precisava!'],
  description:
    'Ative o Plano de Repasses e comece a receber em 7 dias úteis a partir de hoje.',
  backgroundType: 'color' as const,
  backgroundColor: '#FF6900',
  contentColor: 'light' as const,
  curtain: false,
  ctas: [{ text: 'Quero receber em 7 dias', link: '#', style: 'primary' as const }],
};

// ---------------------------------------------------------------------------
// Seção 7 — 3 passos para abrir conta
// ---------------------------------------------------------------------------
const stepsData = {
  badge: 'Comece agora',
  title: ['Abra sua conta', 'em 3 passos'],
  description: '',
  cards: [
    {
      icon: 'smartphone',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      title: '1. Baixe o app',
      description: 'Baixe o app do iFood Pago e toque na opção "Abrir conta digital".',
    },
    {
      icon: 'file-default',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      title: '2. Envie seus dados',
      description: 'Envie seus dados e sua selfie para identificação. Rápido e seguro.',
    },
    {
      icon: 'check',
      iconColor: '#00C46A',
      iconBgOpacity: 10,
      title: '3. Pronto!',
      description: 'Crie sua senha e comece a usar o banco digital parceiro do seu restaurante.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Seção 8 — CTA final
// ---------------------------------------------------------------------------
const ctaFinalData = {
  layout: 'centered' as const,
  title: ['Receba mais rápido', 'com iFood Pago'],
  description:
    'Antecipe o dinheiro das suas vendas direto na conta digital.',
  backgroundType: 'color' as const,
  backgroundColor: '#EB0033',
  contentColor: 'light' as const,
  curtain: false,
  ctas: [{ text: 'Baixe o app', link: '#', style: 'primary' as const }],
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AntecipacaoPage() {
  return (
    <>
      <SmoothScroll />
      <SkipLink />
      <header>
        <Navbar />
      </header>
      <main id="main-content">
        <Hero data={heroData} />
        <ContentSection data={fluxoData} />
        <ContentSection data={pontualData} />
        <Beneficios data={vantagensPontualData} />
        <ContentSection data={repassesData} />
        <PromoBanner data={rapidoData} />
        <PromoBanner data={tempetoData} />
        <Beneficios data={stepsData} />
        <PromoBanner data={ctaFinalData} />
      </main>
      <Footer />
    </>
  );
}
