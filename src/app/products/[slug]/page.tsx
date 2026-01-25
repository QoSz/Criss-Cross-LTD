import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createMetadata, siteConfig } from '@/lib/seo';
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  getCategoryTitle,
} from '@/lib/products';
import { ProductDetail } from '@/components/products/ProductDetail';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import {
  BreadcrumbSchema,
  ProductSchema,
} from '@/components/structured-data/OrganizationSchema';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return createMetadata({
      title: 'Product Not Found',
      noIndex: true,
    });
  }

  const categoryTitle = await getCategoryTitle(product.category);
  const defaultDescription = `Buy ${product.name} wholesale from Criss Cross Ltd, Kenya's trusted FMCG distributor. Competitive bulk pricing on ${categoryTitle.toLowerCase()} with reliable delivery across Kenya.`;

  return createMetadata({
    title: product.name,
    description: product.description || defaultDescription,
    keywords: [
      `wholesale ${product.name} Kenya`,
      `bulk ${product.company} products`,
      `${categoryTitle} wholesale Kenya`,
      `${product.company} distributor Kenya`,
      'FMCG wholesale Nairobi',
    ],
    path: `/products/${product.id}`,
    image: `${siteConfig.url}${product.image}`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryTitle = await getCategoryTitle(product.category);
  const relatedProducts = await getRelatedProducts(
    product.id,
    product.category,
    4
  );

  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Products', url: `${siteConfig.url}/products` },
    { name: product.name, url: `${siteConfig.url}/products/${product.id}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductSchema
        name={product.name}
        description={product.description}
        image={`${siteConfig.url}${product.image}`}
        category={categoryTitle}
        brand={product.company}
        availability="InStock"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-100/70 via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-black">
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <ProductDetail product={product} categoryTitle={categoryTitle} />
          <RelatedProducts
            products={relatedProducts}
            categoryTitle={categoryTitle}
          />
        </div>
      </div>
    </>
  );
}
