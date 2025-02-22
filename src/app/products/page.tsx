import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { products, categoryTitles } from './ProductsData';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const ProductsPage = () => {
  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center">Products</h1>
      {categories.map(category => {
        const productsForCategory = products.filter(product => product.category === category);
        const categoryTitle = categoryTitles[category] || category;

        return (
          <div key={category}>
            <h2 className="text-2xl font-bold py-8">{categoryTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsForCategory.map((product) => (
                <Card 
                  key={product.id}
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
                    <h2 className="text-xl font-semibold mb-4 line-clamp-2">{product.name}</h2>
                    {/* <Select defaultValue="">
                        <SelectTrigger className="w-full rounded-full">
                          <SelectValue placeholder="Select Size" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.sizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;