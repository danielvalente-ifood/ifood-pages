/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        // Permite iframe de /preview/* e /p/* a partir de qualquer origem
        // (CMS local em localhost:3000 e CMS em produção na Vercel)
        source: '/(preview|p)/:path*',
        headers: [
          // Remove a restrição de iframe — necessário para o CMS embeddar via iframe
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
          // CSP moderna: permite frame-ancestors de qualquer origem
          // Em produção, restringir para o domínio real do CMS se necessário
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
