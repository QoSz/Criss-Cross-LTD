import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.crisscross.co.ke'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/products/',
          '/about/',
          '/contact/',
          '/deliveries/',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/products/',
          '/about/',
          '/contact/',
          '/deliveries/',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
