'use client';

export function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '16px',
        zIndex: 9999,
        padding: '8px 16px',
        background: '#fff',
        color: '#141414',
        fontWeight: 600,
        borderRadius: '8px',
        textDecoration: 'none',
      }}
      onFocus={(e) => { (e.currentTarget as HTMLElement).style.left = '16px'; }}
      onBlur={(e) => { (e.currentTarget as HTMLElement).style.left = '-9999px'; }}
    >
      Pular para o conteúdo principal
    </a>
  );
}
