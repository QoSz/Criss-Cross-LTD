import { createMetadata } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/structured-data/OrganizationSchema';
import { getProductsData } from '@/lib/products';
import { ProductsSection, ProductSchemaList } from '@/components/products';

export const metadata = createMetadata({
  title: 'Wholesale FMCG Products',
  description: 'Browse our comprehensive wholesale FMCG product catalog. Cooking oil, soaps, rice, sugar, beverages, and household products at competitive wholesale prices. Bulk orders welcome with reliable delivery across Kenya.',
  keywords: [
    'wholesale FMCG products Kenya',
    'bulk consumer goods Kenya',
    'wholesale cooking oil Kenya',
    'wholesale soaps detergents Kenya',
    'wholesale rice grains Kenya',
    'wholesale sugar Kenya',
    'wholesale beverages Kenya',
    'wholesale household products Kenya',
    'FMCG product catalog Kenya',
    'bulk product prices Kenya',
    'wholesale food products Nairobi',
    'consumer goods distributor Kenya',
    'wholesale merchandise Kenya',
    'bulk purchasing FMCG Kenya',
    'wholesale product sourcing Kenya',
    'FMCG supply chain Kenya',
    'competitive wholesale prices Kenya',
    'minimum order quantities FMCG',
    'wholesale distribution Kenya',
    'bulk orders FMCG Kenya'
  ],
  path: '/products'
});

export default async function ProductsPage() {
  // Load products data server-side to prevent client bundle bloat
  const { productsByCategory, categoryTitles } = await getProductsData();
  const allProducts = Object.values(productsByCategory).flat();

  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.crisscross.co.ke' },
    { name: 'Products', url: 'https://www.crisscross.co.ke/products' }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      {/* Structured data rendered server-side - not in client bundle */}
      <ProductSchemaList products={allProducts} />
      <ProductsSection
        productsByCategory={productsByCategory}
        categoryTitles={categoryTitles}
      />
    </>
  );
}