import Hero from '@/components/Hero/Hero';
import Beneficios from '@/components/Beneficios/Beneficios';
import PromoBanner from '@/components/PromoBanner/PromoBanner';
import Footer from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar';
import { SmoothScroll } from '@/components/SmoothScroll/SmoothScroll';
import { SkipLink } from '@/components/SkipLink';

export const metadata = {
  title: 'Cartão de Crédito iFood Pago — Anuidade zero para o seu restaurante',
  description:
    'Cartão de crédito com anuidade zero, limite exclusivo e Programa Vai de Visa. O parceiro financeiro do seu restaurante.',
};

const heroData = {
  variant: 'split-image' as const,
  assetPosition: 'right' as const,
  title: ['Cartão de Crédito', 'O parceiro que acompanha', 'o dia a dia do seu restaurante.'],
  description:
    'Anuidade zero, limite exclusivo para o seu negócio e até 35 dias para pagar. Aceito em todo lugar, físico e online.',
  image: '',
  ctas: [
    { text: 'Quero meu cartão', link: '#', style: 'primary' as const },
    { text: 'Saiba mais', link: '#', style: 'secondary' as const },
  ],
};

const beneficiosPrincipaisData = {
  badge: 'Por que escolher o Cartão iFood Pago?',
  title: ['Cartão feito para', 'quem tem restaurante'],
  description: '',
  cards: [
    {
      icon: 'barchart-default',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      title: 'Limite exclusivo, todo seu',
      description: 'Limite de crédito pensado para o crescimento do seu restaurante, sem dividir com despesas pessoais.',
    },
    {
      icon: 'check',
      iconColor: '#00C46A',
      iconBgOpacity: 10,
      title: 'Anuidade zero, 100% gratuita',
      description: 'Sem anuidade, sem tarifas escondidas. Você paga apenas o que gastar.',
    },
    {
      icon: 'rocket-ship',
      iconColor: '#0070F3',
      iconBgOpacity: 10,
      title: 'Programa Vai de Visa',
      description: 'Ofertas exclusivas, cashback e sorteios para quem usa o cartão no dia a dia.',
    },
    {
      icon: 'plugin-addon-puzzle',
      iconColor: '#F59E0B',
      iconBgOpacity: 10,
      title: 'Até 35 dias de respiro',
      description: 'Prazo estendido para pagar sua fatura e manter o fluxo de caixa equilibrado.',
    },
  ],
};

const funcionalidadesData = {
  badge: 'Funcionalidades',
  title: ['Tudo que você precisa', 'em um só cartão'],
  description: '',
  cards: [
    {
      icon: 'smartphone',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      title: 'Aceito em todo lugar',
      description: 'Use em lojas físicas e compras online, em qualquer estabelecimento que aceite Visa.',
    },
    {
      icon: 'check',
      iconColor: '#00C46A',
      iconBgOpacity: 10,
      title: 'Encostou, pagou!',
      description: 'Pagamento por aproximação (NFC) para compras rápidas e sem contato.',
    },
    {
      icon: 'copy-default',
      iconColor: '#0070F3',
      iconBgOpacity: 10,
      title: 'Crédito e débito',
      description: 'Um cartão só com função crédito e débito para todas as suas necessidades.',
    },
    {
      icon: 'barchart-default',
      iconColor: '#8B5CF6',
      iconBgOpacity: 10,
      title: 'Parcelamento flexível',
      description: 'Parcele compras maiores e organize melhor as despesas do seu restaurante.',
    },
  ],
};

const ondeUsarData = {
  badge: 'Onde usar',
  title: ['Use onde o seu restaurante', 'mais precisa'],
  description: '',
  cards: [
    {
      icon: 'users-group-default',
      iconColor: '#EB0033',
      iconBgOpacity: 10,
      title: 'Mercados e atacadistas',
      description: 'Compre ingredientes e produtos para o seu estoque com limite dedicado.',
    },
    {
      icon: 'rocket-ship',
      iconColor: '#F59E0B',
      iconBgOpacity: 10,
      title: 'Postos de combustível',
      description: 'Abasteça a frota de entrega e reduza as despesas operacionais.',
    },
    {
      icon: 'plugin-addon-puzzle',
      iconColor: '#00C46A',
      iconBgOpacity: 10,
      title: 'Equipamentos de cozinha',
      description: 'Invista em utensílios, equipamentos e melhorias para a sua cozinha.',
    },
    {
      icon: 'file-default',
      iconColor: '#0070F3',
      iconBgOpacity: 10,
      title: 'Pagamento de fornecedores',
      description: 'Pague fornecedores com prazo e mantenha seu capital de giro livre.',
    },
  ],
};

const ctaAppData = {
  layout: 'centered' as const,
  title: ['Solicite seu cartão', 'pelo app iFood Pago'],
  description:
    'Baixe o app, preencha seus dados e solicite o cartão em minutos. Disponível no App Store e Google Play.',
  backgroundType: 'color' as const,
  backgroundColor: '#141414',
  contentColor: 'light' as const,
  curtain: false,
  ctas: [{ text: 'Baixe o app agora', link: '#', style: 'primary' as const }],
};

const ctaFinalData = {
  layout: 'centered' as const,
  title: ['Anuidade zero.', 'Limite exclusivo.', 'Quero meu cartão!'],
  description:
    'O cartão de crédito feito para o seu restaurante crescer sem pagar nada a mais por isso.',
  backgroundType: 'color' as const,
  backgroundColor: '#EB0033',
  contentColor: 'light' as const,
  curtain: false,
  ctas: [{ text: 'Quero meu cartão', link: '#', style: 'primary' as const }],
};

export default function CartaoPage() {
  return (
    <>
      <SmoothScroll />
      <SkipLink />
      <header>
        <Navbar />
      </header>
      <main id="main-content">
        <Hero data={heroData} />
        <Beneficios data={beneficiosPrincipaisData} />
        <Beneficios data={funcionalidadesData} />
        <Beneficios data={ondeUsarData} />
        <PromoBanner data={ctaAppData} />
        <PromoBanner data={ctaFinalData} />
      </main>
      <Footer />
    </>
  );
}
