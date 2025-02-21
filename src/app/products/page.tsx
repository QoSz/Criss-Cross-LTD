import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const products = [
  {
    id: 'fresh-fri',
    category: 'cooking-oil',
    name: 'Fresh Fri - Vegetable Cooking Oil',
    image: '/images/products/cooking-oil/FreshFri.png',
    sizes: ['1 liter', '2 liter', '3 liter']
  },
  {
    id: 'salit',
    category: 'cooking-oil',
    name: 'Salit - Vegetable Cooking Oil',
    image: '/images/products/cooking-oil/Salit.jpeg',
    sizes: ['1 liter', '2 liter', '3 liter']
  },
  {
    id: 'popco',
    category: 'cooking-oil',
    name: 'Popco - Fortified Vegetable Oil',
    image: '/images/products/cooking-oil/Popco.png',
    sizes: ['1 liter', '2 liter', '3 liter']
  },
  {
    id: 'mpishi-poa',
    category: 'cooking-oil',
    name: 'Mpishi Poa - Vegetable Cooking Fat',
    image: '/images/products/cooking-oil/MpishiPoa.png',
    sizes: ['1 liter', '2 liter', '3 liter']
  },
  {
    id: 'fry-mate',
    category: 'cooking-oil',
    name: 'Fry Mate - Vegetable Cooking Fat',
    image: '/images/products/cooking-oil/FryMate.png',
    sizes: ['1 liter', '2 liter', '3 liter']
  },
  {
    id: 'pure-mountain-canola-oil',
    category: 'cooking-oil',
    name: 'Pure Mountain - Canola Oil',
    image: '/images/products/cooking-oil/Canola.jpg',
    sizes: ['1 liter', '2 liter', '3 liter']
  },
  {
    id: 'pure-mountain-megafry',
    category: 'cooking-oil',
    name: 'Pure Mountain - Mega Fry',
    image: '/images/products/cooking-oil/MegaFry.jpg',
    sizes: ['1 liter', '2 liter', '3 liter']
  },
  {
    id: 'detrex-aloe-vera',
    category: 'soaps',
    name: 'Detrex - Aloe Vera Soap',
    image: '/images/products/soaps/Detrex-AloeVera.webp',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'detrex-cool-mint',
    category: 'soaps',
    name: 'Detrex - Cool Mint Soap',
    image: '/images/products/soaps/Detrex-CoolMint.webp',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'detrex-citronella',
    category: 'soaps',
    name: 'Detrex - Citronella Oil Soap',
    image: '/images/products/soaps/Detrex-CitronellaOil.webp',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'detrex-pine-drops',
    category: 'soaps',
    name: 'Detrex - Pine Drops Soap',
    image: '/images/products/soaps/Detrex-PineDrops.webp',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'sawa-rose',
    category: 'soaps',
    name: 'Sawa - Rose Soap',
    image: '/images/products/soaps/Sawa-Rose.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'sawa-orignal',
    category: 'soaps',
    name: 'Sawa - Original Soap',
    image: '/images/products/soaps/Sawa-Original.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'sawa-herbal',
    category: 'soaps',
    name: 'Sawa - Herbal Soap',
    image: '/images/products/soaps/Sawa-Herbal.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'sawa-strawberry',
    category: 'soaps',
    name: 'Sawa - Strawberry Soap',
    image: '/images/products/soaps/Sawa-Strawberry.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'sawa-lemon-honey',
    category: 'soaps',
    name: 'Sawa - Lemon Honey Soap',
    image: '/images/products/soaps/Sawa-Lemon-Honey.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'sawa-chocolate',
    category: 'soaps',
    name: 'Sawa - Chocolate Soap',
    image: '/images/products/soaps/Sawa-Chocolate.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'sawa-bubblegum',
    category: 'soaps',
    name: 'Sawa - Bubblegum Soap',
    image: '/images/products/soaps/Sawa-Bubblegum.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'sawa-berry-splash',
    category: 'soaps',
    name: 'Sawa - Berry Splash Body Wash',
    image: '/images/products/soaps/Sawa-Berry-Splash.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'sawa-aloe-splash',
    category: 'soaps',
    name: 'Sawa - Aloe Splash Body Wash',
    image: '/images/products/soaps/Sawa-Aloe-Splash.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'sawa-original-splash',
    category: 'soaps',
    name: 'Sawa - Original Splash Body Wash',
    image: '/images/products/soaps/Sawa-Original-Splash.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'sawa-strawberry-handwash',
    category: 'soaps',
    name: 'Sawa - Strawberry Handwash',
    image: '/images/products/soaps/Sawa-Strawberry-Handwash.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'sawa-aloe-vera-handwash',
    category: 'soaps',
    name: 'Sawa - Aloe Vera Handwash',
    image: '/images/products/soaps/Sawa-Aloe-Vera-Handwash.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'sawa-original-handwash',
    category: 'soaps',
    name: 'Sawa - Original Handwash',
    image: '/images/products/soaps/Sawa-Original-Handwash.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'diva-milky-nuts',
    category: 'soaps',
    name: 'Diva - Milky Nuts Soap',
    image: '/images/products/soaps/Diva-Milky-Nuts.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'diva-sunshine-fruit',
    category: 'soaps',
    name: 'Diva - Sunshine Fruit Soap',
    image: '/images/products/soaps/Diva-Sunshine-Fruit.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'diva-olive-n-tulip',
    category: 'soaps',
    name: 'Diva - Olive n Tulip Soap',
    image: '/images/products/soaps/Diva-Olive-n-Tulip.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'diva-mango-temptation',
    category: 'soaps',
    name: 'Diva - Mango Temptation Soap',
    image: '/images/products/soaps/Diva-Mango-Temptation.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'diva-citrus-n-cream',
    category: 'soaps',
    name: 'Diva - Citrus n Cream Soap',
    image: '/images/products/soaps/Diva-Citrus-n-Cream.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'diva-aloe-vera',
    category: 'soaps',
    name: 'Diva - Aloe Vera Soap',
    image: '/images/products/soaps/Diva-Aloe-Vera.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'afrisense-skin-toning-bathing-bar',
    category: 'soaps',
    name: 'Afrisense - Skin Toning Bathing Bar',
    image: '/images/products/soaps/Afrisense-Skin-Toning-Bathing-Bar.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'afrisense-cleansing-&-moisturizing-bar',
    category: 'soaps',
    name: 'Afrisense - Cleansing & Moisturizing Bar',
    image: '/images/products/soaps/Afrisense-Cleansing-&-Moisturizing-Bar.png',
    sizes: ['100g', '200g', '300g']
  },
  {
    id: 'afrisense-nourishing-&-hydrating-bar',
    category: 'soaps',
    name: 'Afrisense - Nourishing & Hydrating Bar',
    image: '/images/products/soaps/Afrisense-Nourishing-&-Hydrating-Bar.png',
    sizes: ['100g', '200g', '300g']
  }
];


const ProductsPage = () => {
  // Use all products so multiple categories are shown
  const filteredProducts = products;
  // Group products by their category
  const categories = Array.from(new Set(filteredProducts.map(product => product.category)));

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center">Products</h1>
      {categories.map(category => {
        const productsForCategory = filteredProducts.filter(product => product.category === category);
        let categoryTitle = category;
        if (category === 'cooking-oil') {
          categoryTitle = 'Cooking Oil/Fat';
        } else if (category === 'soaps') {
          categoryTitle = 'Soaps';
        }
        return (
          <div key={category}>
            <h2 className="text-2xl font-bold py-8">{categoryTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsForCategory.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow rounded-[1.618rem] overflow-hidden h-full flex flex-col">
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
                      <Select defaultValue="">
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
                      </Select>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;