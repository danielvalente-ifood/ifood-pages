import { getByCategory } from '@/registry';

const PAGES_URL = process.env.NEXT_PUBLIC_PAGES_URL ?? 'http://localhost:3002';

export const metadata = {
  title: 'Catálogo de Componentes | iFood Pages',
  description: 'Galeria de todos os componentes disponíveis para criar páginas no iFood.',
  robots: { index: false, follow: false },
};

/**
 * /catalog — galeria navegável de componentes do registry.
 * Gerada automaticamente: adicionar componente ao registry = aparece aqui.
 */
export default function CatalogPage() {
  const byCategory = getByCategory();
  const categories = Object.keys(byCategory).sort();

  return (
    <main style={{ padding: '2rem 2.5rem', fontFamily: "'iFood RC Textos', sans-serif", background: '#fafafc', minHeight: '100vh' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#141414', margin: 0 }}>
          Catálogo de Componentes
        </h1>
        <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '0.95rem' }}>
          {Object.values(byCategory).flat().length} componentes disponíveis.
          Adicionar um novo componente ao registry → aparece aqui automaticamente.
        </p>
      </header>

      {categories.map((category) => (
        <section key={category} style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#141414', marginBottom: '1rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem' }}>
            {category}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {byCategory[category].map((entry) => (
              <article key={entry.type} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8e8e8', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                {/* Preview iframe */}
                <div style={{ position: 'relative', width: '100%', height: 220, overflow: 'hidden', background: '#f5f5f5' }}>
                  <iframe
                    src={`${PAGES_URL}/preview/${entry.type}`}
                    title={`Preview ${entry.label}`}
                    style={{
                      width: '1280px',
                      height: '800px',
                      border: 'none',
                      transformOrigin: 'top left',
                      transform: 'scale(0.265)',
                      pointerEvents: 'none',
                    }}
                    loading="lazy"
                    scrolling="no"
                    tabIndex={-1}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#141414' }}>
                      {entry.label}
                    </h3>
                    <code style={{ fontSize: '0.75rem', color: '#666', background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>
                      {entry.type}
                    </code>
                  </div>

                  {/* Variants */}
                  {entry.variants.length > 0 && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <p style={{ margin: '0 0 0.4rem', fontSize: '0.8rem', color: '#888', fontWeight: 500 }}>
                        {entry.variants.length} variante{entry.variants.length !== 1 ? 's' : ''}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {entry.variants.map((v) => (
                          <span key={v.id} title={v.description} style={{ fontSize: '0.75rem', background: '#fff3f5', color: '#EB0033', border: '1px solid #ffd0d8', borderRadius: '4px', padding: '2px 8px' }}>
                            {v.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Schema summary */}
                  {entry.schema.length > 0 && (
                    <p style={{ margin: '0.75rem 0 0', fontSize: '0.8rem', color: '#888' }}>
                      {entry.schema.length} campo{entry.schema.length !== 1 ? 's' : ''} editável{entry.schema.length !== 1 ? 'is' : ''}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
