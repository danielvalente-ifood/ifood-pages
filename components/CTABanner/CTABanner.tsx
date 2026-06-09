/**
 * CTABanner — componente de teste da Fase 5.
 * Valida que adicionar 1 entry no registry = aparece em /preview e /catalog.
 * Pode ser mantido ou removido após validação.
 */
interface CTABannerProps {
  data?: {
    title?: string;
    subtitle?: string;
    cta_text?: string;
    cta_link?: string;
  };
}

export default function CTABanner({ data }: CTABannerProps) {
  const d = data ?? {};
  const title = d.title ?? 'Pronto para começar?';
  const subtitle = d.subtitle ?? 'Junte-se a mais de 450 mil parceiros iFood.';
  const ctaText = d.cta_text ?? 'Cadastre seu negócio';
  const ctaLink = d.cta_link ?? '#';

  return (
    <section
      aria-label="Call to Action"
      style={{
        background: 'linear-gradient(135deg, #EB0033 0%, #c00028 100%)',
        padding: '4rem 2rem',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 1rem' }}>{title}</h2>
      <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: '0 0 2rem' }}>{subtitle}</p>
      <a
        href={ctaLink}
        style={{
          display: 'inline-block',
          background: '#fff',
          color: '#EB0033',
          fontWeight: 700,
          padding: '0.9rem 2rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '1rem',
        }}
      >
        {ctaText}
      </a>
    </section>
  );
}
