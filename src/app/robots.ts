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
          '/thank-you', // Prevent indexing of thank you page
          '/coming-soon', // Prevent indexing of coming soon page
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
          '/thank-you',
          '/coming-soon',
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
          '/thank-you',
          '/coming-soon',
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
