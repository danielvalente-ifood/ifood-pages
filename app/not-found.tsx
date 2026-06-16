import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: '#fafafc',
          color: '#141414',
          textAlign: 'center',
          padding: '24px',
          gap: '16px',
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="24" fill="#EB0033" opacity="0.08" />
          <path
            d="M24 14v14M24 32v2"
            stroke="#EB0033"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 700, letterSpacing: '-0.5px' }}>
          Página não encontrada
        </h1>
        <p style={{ margin: 0, fontSize: '16px', color: '#666', maxWidth: '320px' }}>
          O endereço que você acessou não existe ou foi movido.
        </p>
        <Link
          href="/"
          style={{
            marginTop: '8px',
            display: 'inline-block',
            background: '#EB0033',
            color: '#fff',
            textDecoration: 'none',
            padding: '12px 28px',
            borderRadius: '100px',
            fontSize: '15px',
            fontWeight: 600,
          }}
        >
          Voltar ao início
        </Link>
      </body>
    </html>
  );
}
