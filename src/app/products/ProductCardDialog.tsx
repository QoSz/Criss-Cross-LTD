'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Product } from './ProductsData';

interface ProductCardDialogProps {
  product: Product;
}

const ProductCardDialog: React.FC<ProductCardDialogProps> = ({ product }) => {
  const [cardImageLoaded, setCardImageLoaded] = useState(false);
  const [dialogImageLoaded, setDialogImageLoaded] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
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
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAMBAgQRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli+Ta7p1w=="
              onLoad={() => setCardImageLoaded(true)}
            />
          </CardContent>
          <CardContent className="p-4 flex flex-col flex-1 justify-between">
            <h2 className="text-base text-center md:text-lg line-clamp-2">{product.name}</h2>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] p-0">
        <DialogHeader className="p-6 pb-0 relative">
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="relative aspect-square w-full max-w-md mx-auto mb-4">
            {!dialogImageLoaded && (
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-contain transition-opacity duration-300 ${
                dialogImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 768px) 80vw, 50vw"
              priority={false}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAMBAgQRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli+Ta7p1w=="
              onLoad={() => setDialogImageLoaded(true)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCardDialog; 