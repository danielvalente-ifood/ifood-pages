'use client';

import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import Hero from '@/components/Hero/Hero';
import Vision from '@/components/Vision/Vision';
import Growth from '@/components/Growth/Growth';
import Integrated from '@/components/Integrated/Integrated';
import Results from '@/components/Results/Results';
import FAQ from '@/components/FAQ/FAQ';
import { Footer } from '@/components/Footer';

/**
 * Preview isolado de um bloco com dados padrão — usado nas miniaturas do
 * painel "Adicionar" do CMS (iframe escalado). Sem nav/scroll/chrome.
 *
 * TODO (Fase 3): trocar o switch pelo registry — getEntry(type).component com entry.defaults.
 */
export default function BlockPreview() {
  const params = useParams();
  const type = params.type as string;

  const render = () => {
    switch (type) {
      case 'navbar':
        return <Navbar />;
      case 'hero':
        return <Hero />;
      case 'vision':
        return <Vision />;
      case 'growth':
        return <Growth />;
      case 'integrated':
        return <Integrated />;
      case 'results':
        return <Results />;
      case 'faq':
        return <FAQ />;
      case 'footer':
        return <Footer />;
      default:
        return null;
    }
  };

  return (
    <div style={{ background: '#fff', overflow: 'hidden', pointerEvents: 'none' }}>
      {/* força os blocos com scroll-reveal a aparecerem */}
      <style>{`.scroll-reveal{opacity:1!important;transform:none!important;}`}</style>
      {render()}
    </div>
  );
}
