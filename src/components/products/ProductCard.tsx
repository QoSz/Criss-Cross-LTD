'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from './types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = React.memo<ProductCardProps>(({ product }) => {
  const [cardImageLoaded, setCardImageLoaded] = useState(false);

  return (
    <Link href={`/products/${product.id}`}>
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow rounded-[1.618rem] overflow-hidden h-full flex flex-col"
      >
        <CardContent className="p-0 relative aspect-square">
          {!cardImageLoaded && (
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-[1.618rem] flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-contain p-4 transition-opacity duration-300 ${
              cardImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            onLoad={() => setCardImageLoaded(true)}
            onError={() => setCardImageLoaded(true)}
          />
        </CardContent>
        <CardContent className="p-4 flex flex-col flex-1 justify-between">
          <h2 className="text-base text-center md:text-lg line-clamp-2">{product.name}</h2>
        </CardContent>
      </Card>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';
