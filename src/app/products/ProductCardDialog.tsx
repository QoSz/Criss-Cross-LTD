'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Product } from './ProductsData';

interface ProductCardDialogProps {
  product: Product;
}

const ProductCardDialog: React.FC<ProductCardDialogProps> = ({ product }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow rounded-[1.618rem] overflow-hidden h-full flex flex-col"
        >
          <CardContent className="p-0 relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </CardContent>
          <CardContent className="p-4 flex flex-col flex-1 justify-between">
            <h2 className="text-base text-center md:text-lg line-clamp-2">{product.name}</h2>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] p-0">
        <DialogHeader className="p-6 pb-0 relative"> {/* Added relative for positioning close button */}
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="relative aspect-square w-full max-w-md mx-auto mb-4">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 80vw, 50vw"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCardDialog; 