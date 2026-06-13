import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://digipin.io',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://digipin.io/decoder',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://digipin.io/generator',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://digipin.io/api-docs',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://digipin.io/sos',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    { url: 'https://digipin.io/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://digipin.io/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://digipin.io/privacy', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://digipin.io/terms', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://digipin.io/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://digipin.io/pricing', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://digipin.io/careers', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://digipin.io/faq', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://digipin.io/help', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://digipin.io/disclaimer', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://digipin.io/map', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
