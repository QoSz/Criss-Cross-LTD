interface Product {
    id: string;
    category: string;
    name: string;
    image: string;
    sizes: string[];
}

interface CategoryTitle {
    [key: string]: string;
}

export const products: Product[] = [
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
      category: 'soaps-self-care',
      name: 'Detrex - Aloe Vera Soap',
      image: '/images/products/soaps/Detrex-AloeVera.webp',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'detrex-cool-mint',
      category: 'soaps-self-care',
      name: 'Detrex - Cool Mint Soap',
      image: '/images/products/soaps/Detrex-CoolMint.webp',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'detrex-citronella',
      category: 'soaps-self-care',
      name: 'Detrex - Citronella Oil Soap',
      image: '/images/products/soaps/Detrex-CitronellaOil.webp',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'detrex-pine-drops',
      category: 'soaps-self-care',
      name: 'Detrex - Pine Drops Soap',
      image: '/images/products/soaps/Detrex-PineDrops.webp',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'sawa-rose',
      category: 'soaps-self-care',
      name: 'Sawa - Rose Soap',
      image: '/images/products/soaps/Sawa-Rose.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'sawa-orignal',
      category: 'soaps-self-care',
      name: 'Sawa - Original Soap',
      image: '/images/products/soaps/Sawa-Original.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'sawa-herbal',
      category: 'soaps-self-care',
      name: 'Sawa - Herbal Soap',
      image: '/images/products/soaps/Sawa-Herbal.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'sawa-strawberry',
      category: 'soaps-self-care',
      name: 'Sawa - Strawberry Soap',
      image: '/images/products/soaps/Sawa-Strawberry.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'sawa-lemon-honey',
      category: 'soaps-self-care',
      name: 'Sawa - Lemon Honey Soap',
      image: '/images/products/soaps/Sawa-Lemon-Honey.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'sawa-chocolate',
      category: 'soaps-self-care',
      name: 'Sawa - Chocolate Soap',
      image: '/images/products/soaps/Sawa-Chocolate.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'sawa-bubblegum',
      category: 'soaps-self-care',
      name: 'Sawa - Bubblegum Soap',
      image: '/images/products/soaps/Sawa-Bubblegum.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'sawa-berry-splash',
      category: 'soaps-self-care',
      name: 'Sawa - Berry Splash Body Wash',
      image: '/images/products/soaps/Sawa-Berry-Splash.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'sawa-aloe-splash',
      category: 'soaps-self-care',
      name: 'Sawa - Aloe Splash Body Wash',
      image: '/images/products/soaps/Sawa-Aloe-Splash.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'sawa-original-splash',
      category: 'soaps-self-care',
      name: 'Sawa - Original Splash Body Wash',
      image: '/images/products/soaps/Sawa-Original-Splash.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'sawa-strawberry-handwash',
      category: 'soaps-self-care',
      name: 'Sawa - Strawberry Handwash',
      image: '/images/products/soaps/Sawa-Strawberry-Handwash.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'sawa-aloe-vera-handwash',
      category: 'soaps-self-care',
      name: 'Sawa - Aloe Vera Handwash',
      image: '/images/products/soaps/Sawa-Aloe-Vera-Handwash.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'sawa-original-handwash',
      category: 'soaps-self-care',
      name: 'Sawa - Original Handwash',
      image: '/images/products/soaps/Sawa-Original-Handwash.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'diva-milky-nuts',
      category: 'soaps-self-care',
      name: 'Diva - Milky Nuts Soap',
      image: '/images/products/soaps/Diva-Milky-Nuts.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'diva-sunshine-fruit',
      category: 'soaps-self-care',
      name: 'Diva - Sunshine Fruit Soap',
      image: '/images/products/soaps/Diva-Sunshine-Fruit.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'diva-olive-n-tulip',
      category: 'soaps-self-care',
      name: 'Diva - Olive n Tulip Soap',
      image: '/images/products/soaps/Diva-Olive-n-Tulip.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'diva-mango-temptation',
      category: 'soaps-self-care',
      name: 'Diva - Mango Temptation Soap',
      image: '/images/products/soaps/Diva-Mango-Temptation.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'diva-citrus-n-cream',
      category: 'soaps-self-care',
      name: 'Diva - Citrus n Cream Soap',
      image: '/images/products/soaps/Diva-Citrus-n-Cream.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'diva-aloe-vera',
      category: 'soaps-self-care',
      name: 'Diva - Aloe Vera Soap',
      image: '/images/products/soaps/Diva-Aloe-Vera.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'afrisense-skin-toning-bathing-bar',
      category: 'soaps-self-care',
      name: 'Afrisense - Skin Toning Bathing Bar',
      image: '/images/products/soaps/Afrisense-Skin-Toning-Bathing-Bar.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'afrisense-cleansing-&-moisturizing-bar',
      category: 'soaps-self-care',
      name: 'Afrisense - Cleansing & Moisturizing Bar',
      image: '/images/products/soaps/Afrisense-Cleansing-&-Moisturizing-Bar.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'afrisense-nourishing-&-hydrating-bar',
      category: 'soaps-self-care',
      name: 'Afrisense - Nourishing & Hydrating Bar',
      image: '/images/products/soaps/Afrisense-Nourishing-&-Hydrating-Bar.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'whitewash-white',
      category: 'wash-day-soaps',
      name: 'Whitewash White - Brilliant for all purposes',
      image: '/images/products/soaps/Whitewash-White.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'whitewash-blue',
      category: 'wash-day-soaps',
      name: 'Whitewash Blue - Colour Retainer',
      image: '/images/products/soaps/Whitewash-Blue.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'whitewash-green',
      category: 'wash-day-soaps',
      name: 'Whitewash Green - Antiseptic',
      image: '/images/products/soaps/Whitewash-Green.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'whitewash-cream',
      category: 'wash-day-soaps',
      name: 'Whitewash Cream - Gentle Multipurpose',
      image: '/images/products/soaps/Whitewash-Cream.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'whitewash-pink',
      category: 'wash-day-soaps',
      name: 'Whitewash Pink - Pure sensations',
      image: '/images/products/soaps/Whitewash-Pink.png',
      sizes: ['100g', '200g', '300g']
    },
    {
      id: 'whitewash-bar',
      category: 'wash-day-soaps',
      name: 'Whitewash Bar Soaps',
      image: '/images/products/soaps/Whitewash-Bar.png',
      sizes: ['100g', '200g', '300g']
    },
  ];

export const categoryTitles: CategoryTitle = { 
  'cooking-oil': 'Cooking Oil/Fat',
  'soaps-self-care': 'Self-Care Soaps',
  'wash-day-soaps': 'Wash Day Soaps',
};
