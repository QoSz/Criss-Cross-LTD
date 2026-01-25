import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from './types';

interface RelatedProductsProps {
  products: Product[];
  categoryTitle: string;
}

export function RelatedProducts({ products, categoryTitle }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">
        More from {categoryTitle}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group"
          >
            <Card className="h-full overflow-hidden rounded-xl transition-shadow hover:shadow-lg">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-white dark:bg-gray-900">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
