import { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Products | Criss Cross - Premium Quality Products',
  description: 'Browse our comprehensive collection of premium products across multiple categories. Find exactly what you need with our easy-to-use search and filter tools. Quality guaranteed with various sizes available.',
  keywords: [
    'products',
    'premium quality',
    'criss cross',
    'search products',
    'filter products',
    'categories',
    'quality products',
    'various sizes',
    'product catalog',
    'online shopping',
    'product search',
    'product filter',
    'multiple categories',
    'quality guarantee'
  ].join(', '),
  authors: [{ name: 'Criss Cross' }],
  creator: 'Criss Cross',
  publisher: 'Criss Cross',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Products | Criss Cross - Premium Quality Products',
    description: 'Browse our comprehensive collection of premium products across multiple categories. Find exactly what you need with our easy-to-use search and filter tools.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Criss Cross',
    images: [
      {
        url: '/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'Criss Cross Products Collection',
      },
    ],
  },
  alternates: {
    canonical: '/products',
  },
  category: 'E-commerce',
};

export default function ProductsPage() {
  return <ProductsClient />;
}