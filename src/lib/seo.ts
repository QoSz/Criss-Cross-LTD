import { Metadata } from "next";

export const siteConfig = {
  name: "Criss Cross Ltd",
  description: "Kenya's trusted wholesale FMCG distributor offering competitive prices on cooking oil, soaps, rice, sugar, water, juices and more. Reliable delivery across Nairobi and Kenya.",
  url: "https://www.crisscross.co.ke",
  ogImage: "https://www.crisscross.co.ke/cc-logos/CC-Logo.png",
  logo: "https://www.crisscross.co.ke/cc-logos/CC-Logo.png",
};

export const defaultKeywords = [
  'wholesale FMCG Kenya',
  'fast moving consumer goods distributor',
  'wholesale cooking oil Kenya',
  'wholesale soaps Kenya',
  'wholesale rice Kenya',
  'wholesale sugar Kenya',
  'FMCG distributor Nairobi',
  'wholesale consumer goods Kenya',
  'bulk food products Kenya',
  'wholesale household products',
  'FMCG supply chain Kenya',
  'wholesale distributor Nairobi',
  'competitive wholesale prices',
  'reliable FMCG delivery',
  'Criss Cross Ltd Kenya'
];

interface CreateMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  path?: string;
}

export function createMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
  keywords = [],
  path = "",
}: CreateMetadataProps): Metadata {
  const url = `${siteConfig.url}${path}`;
  const combinedKeywords = [...defaultKeywords, ...keywords];

  return {
    title: title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | Wholesale FMCG Distributor in Kenya`,
    description,
    keywords: combinedKeywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_KE',
      url,
      siteName: siteConfig.name,
      title: title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | Wholesale FMCG Distributor in Kenya`,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Wholesale FMCG Distributor in Kenya`,
        },
      ],
    },
    verification: {
      google: 'google-site-verification=crisscross-verification-code',
      other: {
        'msvalidate.01': 'crisscross-bing-verification-code',
      },
    },
    category: 'business',
    classification: 'Wholesale Distribution, FMCG, Fast Moving Consumer Goods',
    other: {
      'geo.region': 'KE',
      'geo.placename': 'Nairobi, Kenya',
      'geo.position': '-1.286389;36.817223',
      'ICBM': '-1.286389, 36.817223',
      'business.contact_data.locality': 'Nairobi',
      'business.contact_data.region': 'Kenya',
      'business.contact_data.country_name': 'Kenya',
    },
    alternates: {
      canonical: url,
    },
  };
}

// Product-specific metadata helper
export function createProductMetadata(productName: string, productDescription?: string, productImage?: string): Metadata {
  return createMetadata({
    title: `${productName} - Wholesale FMCG Products`,
    description: productDescription || `Buy ${productName} at wholesale prices from Criss Cross Ltd, Kenya's trusted FMCG distributor. Competitive prices and reliable delivery across Nairobi.`,
    image: productImage,
    keywords: [`wholesale ${productName.toLowerCase()}`, `${productName.toLowerCase()} distributor Kenya`, `bulk ${productName.toLowerCase()}`],
    path: `/products/${productName.toLowerCase().replace(/\s+/g, '-')}`,
  });
}

// Category-specific metadata helper
export function createCategoryMetadata(categoryName: string, categoryDescription?: string): Metadata {
  return createMetadata({
    title: `${categoryName} - Wholesale FMCG Products`,
    description: categoryDescription || `Explore our wholesale ${categoryName.toLowerCase()} products. Criss Cross Ltd offers competitive prices on quality ${categoryName.toLowerCase()} with reliable delivery across Kenya.`,
    keywords: [`wholesale ${categoryName.toLowerCase()}`, `${categoryName.toLowerCase()} distributor Kenya`, `bulk ${categoryName.toLowerCase()} products`],
    path: `/products/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`,
  });
}

// Page-specific metadata helper
export function createPageMetadata(pageName: string, pageDescription?: string): Metadata {
  return createMetadata({
    title: pageName,
    description: pageDescription,
    path: `/${pageName.toLowerCase().replace(/\s+/g, '-')}`,
  });
} 