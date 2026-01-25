'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Product } from './types';

interface ProductDetailProps {
  product: Product;
  categoryTitle: string;
}

export function ProductDetail({ product, categoryTitle }: ProductDetailProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const defaultDescription = `${product.name} from ${product.company}. Available for wholesale purchase from Criss Cross Ltd, Kenya's trusted FMCG distributor. Contact us for competitive bulk pricing and reliable delivery across Kenya.`;

  return (
    <div className="w-full">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          asChild
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/products">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>

      {/* Product Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="relative aspect-square bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-contain p-6 transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Category Badge */}
          <div>
            <Badge variant="secondary" className="text-sm">
              {categoryTitle}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {product.name}
          </h1>

          {/* Company */}
          <p className="text-lg text-muted-foreground">
            By <span className="font-medium text-foreground">{product.company}</span>
          </p>

          {/* Description */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              {product.description || defaultDescription}
            </p>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/contact">
                Enquire About This Product
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
