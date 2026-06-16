import Hero from '@/components/Hero/Hero';
import Beneficios from '@/components/Beneficios/Beneficios';
import ContentSection from '@/components/ContentSection/ContentSection';
import PromoBanner from '@/components/PromoBanner/PromoBanner';
import Footer from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar';
import { SmoothScroll } from '@/components/SmoothScroll/SmoothScroll';
import { SkipLink } from '@/components/SkipLink';

export const metadata = {
  title: 'Crédito iFood Pago — Seu restaurante merece todo o crédito pra crescer',
  description:
    'Crédito com aprovação facilitada, condições exclusivas e parcelas debitadas direto dos seus repasses. Para parceiros iFood.',
};

const heroData = {
  variant: 'split-image' as const,
  assetPosition: 'right' as const,
  title: ['Crédito', 'Seu restaurante merece', 'todo o crédito pra crescer.'],
  description:
    'Crédito aprovado com base nas suas vendas no iFood. Condições exclusivas para o seu restaurante, com parcelas debitadas direto dos seus repasses.',
  image: '',
  ctas: [
    { text: 'Entre para a lista de análise', link: '#', style: 'primary' as const },
    { text: 'Saiba mais', link: '#', style: 'secondary' as const },
  ],
};

const pilaresData = {
  badge: 'Por que escolher o Crédito iFood Pago?',
  title: ['Crédito feito para', 'o seu restaurante'],
  description: '',
  cards: [
    {
      icon: 'check',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      title: 'Aprovação facilitada',
      description: 'Crédito aprovado com base nas suas vendas no iFood. Sem burocracia.',
    },
    {
      icon: 'barchart-default',
      iconColor: '#0070F3',
      iconBgOpacity: 10,
      title: 'Condições sob medida',
      description: 'Limites exclusivos calculados para o seu restaurante.',
    },
    {
      icon: 'smartphone',
      iconColor: '#00C46A',
      iconBgOpacity: 10,
      title: 'Parcelas que cabem no bolso',
      description: 'Com pagamento fácil, debitado direto dos seus repasses.',
    },
  ],
};

const etapasData = {
  badge: 'Como funciona?',
  title: ['5 etapas simples', 'para ter crédito na conta'],
  description: '',
  cards: [
    {
      icon: 'plugin-addon-puzzle',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      title: '1. Simule seu crédito',
      description: 'Veja as condições disponíveis para o seu restaurante antes de contratar.',
    },
    {
      icon: 'file-default',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      title: '2. Envio de documentos',
      description: 'Envie seus documentos de forma rápida e segura pelo app.',
    },
    {
      icon: 'copy-default',
      iconColor: '#0070F3',
      iconBgOpacity: 10,
      title: '3. Assinatura digital',
      description: 'Assine o contrato digitalmente, sem sair de casa.',
    },
    {
      icon: 'rocket-ship',
      iconColor: '#00C46A',
      iconBgOpacity: 10,
      title: '4. Dinheiro na conta',
      description: 'O valor cai na sua conta em até 2 dias úteis após a aprovação.',
    },
    {
      icon: 'barchart-default',
      iconColor: '#F59E0B',
      iconBgOpacity: 10,
      title: '5. Pagamento das parcelas',
      description: 'As parcelas são descontadas automaticamente dos seus repasses iFood.',
    },
  ],
};

const creditoPadraoData = {
  badge: 'Crédito Padrão',
  title: ['Para restaurantes', 'sem crédito ativo'],
  description:
    'Ideal para quem nunca teve crédito no iFood Pago ou já quitou o anterior. Condições personalizadas, 30 dias de carência e primeiro pagamento em até 60 dias.',
  image: '',
  assetPosition: 'right' as const,
  ctas: [{ text: 'Simular crédito', link: '#', style: 'primary' as const }],
};

const creditoTrocaData = {
  badge: 'Crédito Troca com Troco',
  title: ['Para restaurantes', 'com crédito ativo'],
  description:
    'Já tem crédito ativo? Troque por condições melhores sem perder o histórico. Mantenha o ritmo do seu negócio sem interrupções, com condições exclusivas e carência de 30 dias.',
  image: '',
  assetPosition: 'left' as const,
  ctas: [{ text: 'Trocar meu crédito', link: '#', style: 'primary' as const }],
};

const vendasLimiteData = {
  badge: 'Como aumentar meu limite?',
  title: ['Mais vendas no iFood,', 'mais crédito disponível'],
  description:
    'Quantidade maior de vendas no iFood resulta em limite de crédito maior. Quanto mais você vende, melhores as condições que você pode acessar.',
  image: '',
  assetPosition: 'right' as const,
  ctas: [{ text: 'Aumentar minhas vendas', link: '#', style: 'primary' as const }],
};

const appData = {
  layout: 'centered' as const,
  title: ['Solicite seu crédito', 'pelo app iFood Pago'],
  description:
    'Baixe o app, simule as condições e solicite em minutos. Disponível no App Store e Google Play.',
  backgroundType: 'color' as const,
  backgroundColor: '#141414',
  contentColor: 'light' as const,
  curtain: false,
  ctas: [{ text: 'Baixe o app agora', link: '#', style: 'primary' as const }],
};

const ctaFinalData = {
  layout: 'centered' as const,
  title: ['Crédito certo', 'para o momento certo'],
  description:
    'Entre para a lista de análise e descubra o limite disponível para o seu restaurante.',
  backgroundType: 'color' as const,
  backgroundColor: '#EB0033',
  contentColor: 'light' as const,
  curtain: false,
  ctas: [{ text: 'Entre para a lista de análise', link: '#', style: 'primary' as const }],
};

export default function CreditoPage() {
  return (
    <>
      <SmoothScroll />
      <SkipLink />
      <header>
        <Navbar />
      </header>
      <main id="main-content">
        <Hero data={heroData} />
        <Beneficios data={pilaresData} />
        <Beneficios data={etapasData} />
        <ContentSection data={creditoPadraoData} />
        <ContentSection data={creditoTrocaData} />
        <ContentSection data={vendasLimiteData} />
        <PromoBanner data={appData} />
        <PromoBanner data={ctaFinalData} />
      </main>
      <Footer />
    </>
  );
}
