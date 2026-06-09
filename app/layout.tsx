import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import './fonts.css';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://pages.ifood.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'iFood Pages',
    template: '%s | iFood Pages',
  },
  description: 'Páginas iFood',
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" href="/Font/iFoodRCTextos-Regular-web.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/Font/iFoodRCTextos-Medium-web.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/Font/iFoodRCTitulos-Bold-web.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
