import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.crisscross.co.ke'
  const currentDate = new Date().toISOString()

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/deliveries`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Product categories (from the old sitemap)
  const categories = [
    'Cooking Oil',
    'Soaps & Self-Care',
    'Rice & Grains',
    'Sugar',
    'Beverages',
    'Juices',
    'Household',
    'Miscellaneous',
  ]

  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/products?category=${encodeURIComponent(category)}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...mainPages, ...categoryPages]
}
