const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://pages.ifood.com.br';

interface WebPageSchemaInput {
  title: string;
  description: string;
  url: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function webPageSchema({ title, description, url }: WebPageSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${BASE_URL}${url}`,
    inLanguage: 'pt-BR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'iFood',
      url: BASE_URL,
    },
  };
}
