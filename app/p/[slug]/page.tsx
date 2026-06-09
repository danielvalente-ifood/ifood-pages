import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DynamicPage } from './DynamicPage';

// Force dynamic rendering — no cache
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function makeSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = makeSupabase();

  const { data: page } = await supabase
    .from('pages')
    .select('name, slug, meta_title, meta_description, og_image')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!page) {
    return { title: 'Página não encontrada' };
  }

  const title = page.meta_title || page.name || 'iFood Pages';
  const description =
    page.meta_description ||
    'Gerencie seu restaurante com um ecossistema completo do iFood.';
  const images = page.og_image ? [page.og_image] : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/p/${page.slug}`,
      type: 'website',
      ...(images ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}

export default async function PublishedPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = makeSupabase();

  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!page) {
    notFound();
  }

  const { data: version } = await supabase
    .from('page_versions')
    .select('content')
    .eq('page_id', page.id)
    .eq('version_type', 'published')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!version) {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content = version.content as any;

  const { data: experiments } = await supabase
    .from('experiments')
    .select('*')
    .eq('page_id', page.id)
    .eq('status', 'running');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let experimentsWithVariants: any[] = [];

  if (experiments && experiments.length > 0) {
    const expIds = experiments.map((e) => e.id);
    const { data: variants } = await supabase
      .from('experiment_variants')
      .select('*')
      .in('experiment_id', expIds);

    experimentsWithVariants = experiments.map((exp) => ({
      ...exp,
      variants: (variants || []).filter((v) => v.experiment_id === exp.id),
    }));
  }

  return (
    <DynamicPage
      blocks={content.blocks}
      experiments={experimentsWithVariants}
      pageId={page.id}
      pageSlug={slug}
      aiEnabled={page.ai_adaptation_enabled ?? false}
    />
  );
}
