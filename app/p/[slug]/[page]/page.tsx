import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DynamicPage } from '../../DynamicPage';
import { webPageSchema, breadcrumbListSchema } from '@/lib/schema';
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';

// Force dynamic rendering — no cache
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string; page: string }>;
  searchParams: Promise<{ edit?: string }>;
}

function makeSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: verticalSlug, page: pageSlug } = await params;
  const supabase = makeSupabase();

  const { data: vertical } = await supabase
    .from('verticals')
    .select('id')
    .eq('slug', verticalSlug)
    .single();

  if (!vertical) return { title: 'Página não encontrada' };

  const { data: page } = await supabase
    .from('pages')
    .select('name, slug, meta_title, meta_description, og_image')
    .eq('vertical_id', vertical.id)
    .eq('slug', pageSlug)
    .eq('status', 'published')
    .single();

  if (!page) return { title: 'Página não encontrada' };

  const title = page.meta_title || page.name || 'iFood Pages';
  const description = page.meta_description || 'Gerencie seu restaurante com o ecossistema iFood.';
  const images = page.og_image ? [page.og_image] : undefined;

  const url = `/p/${verticalSlug}/${pageSlug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', ...(images ? { images } : {}) },
    twitter: { card: 'summary_large_image', title, description, ...(images ? { images } : {}) },
  };
}

export default async function VerticalSubPage({ params, searchParams }: PageProps) {
  const { slug: verticalSlug, page: pageSlug } = await params;
  const { edit } = await searchParams;
  const isEditMode = edit === 'true';
  const supabase = makeSupabase();

  const { data: vertical } = await supabase
    .from('verticals')
    .select('id, slug, name')
    .eq('slug', verticalSlug)
    .single();

  if (!vertical) notFound();

  const pageBase = supabase
    .from('pages')
    .select('*')
    .eq('vertical_id', vertical.id)
    .eq('slug', pageSlug);

  const { data: page } = await (
    isEditMode ? pageBase : pageBase.eq('status', 'published')
  ).single();

  if (!page) notFound();

  const versionBase = supabase
    .from('page_versions')
    .select('content')
    .eq('page_id', page.id)
    .order('created_at', { ascending: false })
    .limit(1);

  const { data: version } = await (
    isEditMode ? versionBase : versionBase.eq('version_type', 'published')
  ).single();

  if (!version && !isEditMode) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content = (version?.content as any) ?? { blocks: [] };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let experimentsWithVariants: any[] = [];
  if (!isEditMode) {
    const { data: experiments } = await supabase
      .from('experiments')
      .select('*')
      .eq('page_id', page.id)
      .eq('status', 'running');

    if (experiments?.length) {
      const { data: variants } = await supabase
        .from('experiment_variants')
        .select('*')
        .in('experiment_id', experiments.map((e) => e.id));

      experimentsWithVariants = experiments.map((exp) => ({
        ...exp,
        variants: (variants || []).filter((v) => v.experiment_id === exp.id),
      }));
    }
  }

  const title = page.meta_title || page.name || 'iFood Pages';
  const description = page.meta_description || 'Gerencie seu restaurante com o ecossistema iFood.';
  const url = `/p/${verticalSlug}/${pageSlug}`;
  const schema = webPageSchema({ title, description, url });
  const breadcrumb = breadcrumbListSchema([
    { name: 'iFood', url: '/' },
    { name: vertical.name || verticalSlug, url: `/p/${verticalSlug}` },
    { name: page.name, url },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {!isEditMode && (
        <Breadcrumb
          items={[
            { label: vertical.name || verticalSlug, href: `/p/${verticalSlug}` },
            { label: page.name },
          ]}
        />
      )}
      <DynamicPage
        blocks={content.blocks ?? []}
        experiments={experimentsWithVariants}
        pageId={page.id}
        pageSlug={page.slug}
        aiEnabled={page.ai_adaptation_enabled ?? false}
      />
    </>
  );
}
