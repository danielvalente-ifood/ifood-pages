import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://pages.ifood.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: pages } = await supabase
      .from('pages')
      .select('slug, updated_at')
      .eq('status', 'published');

    return (pages ?? []).map((page) => ({
      url: `${BASE_URL}/p/${page.slug}`,
      lastModified: new Date(page.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    return [];
  }
}
