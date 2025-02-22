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
    {
        id: 'ushindi-blue',
        category: 'wash-day-soaps',
        name: 'Ushindi - Blue Multi-Purpose Stain Remover',
        image: '/images/products/soaps/Ushindi-Blue.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'ushindi-yellow',
        category: 'wash-day-soaps',
        name: 'Ushindi - Yellow Lemon Fragrance',
        image: '/images/products/soaps/Ushindi-Yellow.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'ushindi-white',
        category: 'wash-day-soaps',
        name: 'Ushindi - White With Glycerin',
        image: '/images/products/soaps/Ushindi-White.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'ushindi-green-antiseptic-plus',
        category: 'wash-day-soaps',
        name: 'Ushindi - GreenAntiseptic Plus',
        image: '/images/products/soaps/Ushindi-Green.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'ushindi-cream',
        category: 'wash-day-soaps',
        name: 'Ushindi - Cream',
        image: '/images/products/soaps/Ushindi-Cream.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'ushindi-bar-soap',
        category: 'wash-day-soaps',
        name: 'Ushindi - Cream Bar Soap',
        image: '/images/products/soaps/Ushindi-Cream-Bar.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'ushindi-washing-powder',
        category: 'wash-day-soaps',
        name: 'Ushindi - Washing-Powder',
        image: '/images/products/soaps/Ushindi-Washing-Powder.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'ushindi-orange-dish-washing-liquid',
        category: 'wash-day-soaps',
        name: 'Ushindi - Orange Dish Washing Liquid',
        image: '/images/products/soaps/Ushindi-Orange-DWL.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'ushindi-lemon-dish-washing-liquid',
        category: 'wash-day-soaps',
        name: 'Ushindi - Lemon Dish Washing Liquid',
        image: '/images/products/soaps/Ushindi-Lemon-DWL.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'ushindi-orange-dish-washing-paste',
        category: 'wash-day-soaps',
        name: 'Ushindi - Orange Dish Washing Paste',
        image: '/images/products/soaps/Ushindi-Orange-DWP.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'ushindi-lemon-dish-washing-paste',
        category: 'wash-day-soaps',
        name: 'Ushindi - Lemon Dish Washing Paste',
        image: '/images/products/soaps/Ushindi-Lemon-DWP.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'ushindi-multi-floor-cleaner',
        category: 'wash-day-soaps',
        name: 'Ushindi - Multi-Floor Cleaner',
        image: '/images/products/soaps/Ushindi-Multi-Floor-Cleaner.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'ushindi-mfc-jerrican',
        category: 'wash-day-soaps',
        name: 'Ushindi - Multi-Floor Cleaner Jerrican',
        image: '/images/products/soaps/Ushindi-MFC-Jerrican.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'ndume-white-laundry-soap',
        category: 'wash-day-soaps',
        name: 'Ndume - White Laundry Soap',
        image: '/images/products/soaps/Ndume-White-Laundry-Soap.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'nudume-cream-laundry-soap',
        category: 'wash-day-soaps',
        name: 'Ndume - Cream Laundry Soap',
        image: '/images/products/soaps/Ndume-Cream-Laundry-Soap.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'nudume-herbal-laundry-soap',
        category: 'wash-day-soaps',
        name: 'Ndume - Herbal Laundry Soap',
        image: '/images/products/soaps/Ndume-Herbal-Laundry-Soap.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-tomato-sauce',
        category: 'sauces',
        name: 'Zesta - Tomato Sauce',
        image: '/images/products/sauces/Zesta-Tomato-Sauce.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-chilli-sauce',
        category: 'sauces',
        name: 'Zesta - Chilli Sauce',
        image: '/images/products/sauces/Zesta-Chilli-Sauce.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-hot-sweet-sauce',
        category: 'sauces',
        name: 'Zesta - Hot & Sweet Sauce',
        image: '/images/products/sauces/Zesta-Hot-&-Sweet-Sauce.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-tomato-ketchup',
        category: 'sauces',
        name: 'Zesta - Tomato Ketchup',
        image: '/images/products/sauces/Zesta-Tomato-Ketchup.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-tomato-ketchup-hot',
        category: 'sauces',
        name: 'Zesta - Tomato Ketchup Hot',
        image: '/images/products/sauces/Zesta-Tomato-Ketchup-Hot.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-choma-sauce',
        category: 'sauces',
        name: 'Zesta - Choma Sauce',
        image: '/images/products/sauces/Zesta-Choma-Sauce.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-tomato-garlic-sauce',
        category: 'sauces',
        name: 'Zesta - Tomato Garlic Sauce',
        image: '/images/products/sauces/Zesta-Tomato-Garlic-Sauce.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-chilli-garlic-sauce',
        category: 'sauces',
        name: 'Zesta - Chilli Garlic Sauce',
        image: '/images/products/sauces/Zesta-Chilli-Garlic-Sauce.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-mayonnaise',
        category: 'sauces',
        name: 'Zesta - Mayonnaise',
        image: '/images/products/sauces/Zesta-Mayonnaise.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-mayocue',
        category: 'sauces',
        name: 'Zesta - Mayocue',
        image: '/images/products/sauces/Zesta-Mayocue-Sauce.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-mayochup',
        category: 'sauces',
        name: 'Zesta - Mayochup',
        image: '/images/products/sauces/Zesta-Mayochup-Sauce.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-yellow-mustard',
        category: 'sauces',
        name: 'Zesta - Yellow Mustard',
        image: '/images/products/sauces/Zesta-Yellow-Mustard.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-chilli-tamarind-sauce',
        category: 'sauces',
        name: 'Zesta - Chilli Tamarind Sauce',
        image: '/images/products/sauces/Zesta-Chilli-Tamarind-Sauce.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-fruit-spicy-sauce',
        category: 'sauces',
        name: 'Zesta - Fruit Spicy Sauce',
        image: '/images/products/sauces/Zesta-Fruit-Spicy-Sauce.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-mango-chutney',
        category: 'sauces',
        name: 'Zesta - Mango Chutney',
        image: '/images/products/sauces/Zesta-Mango-Chutney.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-fruit-chutney',
        category: 'sauces',
        name: 'Zesta - Fruit Chutney',
        image: '/images/products/sauces/Zesta-Fruit-Chutney.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-gravy-browning',
        category: 'condiments',
        name: 'Zesta - Gravy Browning',
        image: '/images/products/condiments/Zesta-Gravy-Browning.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-soy-sauce',
        category: 'condiments',
        name: 'Zesta - Soy Sauce',
        image: '/images/products/condiments/Zesta-Soy-Sauce.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-vanilla-essence',
        category: 'condiments',
        name: 'Zesta - Vanilla Essence',
        image: '/images/products/condiments/Zesta-Vanilla-Essence.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-baking-powder',
        category: 'powders',
        name: 'Zesta - Baking Powder',
        image: '/images/products/powders/Zesta-Baking-Powder.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'bi-carbonate-soda',
        category: 'powders',
        name: 'Bi Carbonate Soda',
        image: '/images/products/powders/Zesta-Bi-Carbonate-Soda.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'caster-sugar',
        category: 'powders',
        name: 'Caster Sugar',
        image: '/images/products/powders/Zesta-Caster-Sugar.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'corn-flour',
        category: 'powders',
        name: 'Corn Flour',
        image: '/images/products/powders/Zesta-Corn-Flour.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'custard-powder',
        category: 'powders',
        name: 'Custard Powder',
        image: '/images/products/powders/Zesta-Custard-Powder.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'icing-sugar',
        category: 'powders',
        name: 'Icing Sugar',
        image: '/images/products/powders/Zesta-Icing-Sugar.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-white-vinegar',
        category: 'vinegar',
        name: 'Zesta - White Vinegar',
        image: '/images/products/vinegar/Zesta-White-Vinegar.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-brown-vinegar',
        category: 'vinegar',
        name: 'Zesta - Brown Vinegar',
        image: '/images/products/vinegar/Zesta-Brown-Vinegar.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-gooseberry-jam',
        category: 'jams',
        name: 'Zesta - Gooseberry Jam',
        image: '/images/products/jams/Zesta-Gooseberry-Jam.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-raspberry-jam',
        category: 'jams',
        name: 'Zesta - Raspberry Jam',
        image: '/images/products/jams/Zesta-Raspberry-Jam.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-very-berry-jam',
        category: 'jams',
        name: 'Zesta - Very Berry Jam',
        image: '/images/products/jams/Zesta-Very-Berry-Jam.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-apricot-jam',
      category: 'jams',
      name: 'Zesta - Apricot Jam',
      image: '/images/products/jams/Zesta-Apricot-Jam.png',
      sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-mango-jam',
        category: 'jams',
        name: 'Zesta - Mango Jam',
        image: '/images/products/jams/Zesta-Mango-Jam.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-mixed-fruit-jam',
        category: 'jams',
        name: 'Zesta - Mixed Fruit Jam',
        image: '/images/products/jams/Zesta-Mixed-Fruit-Jam.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-orange-marmalade-jam',
        category: 'jams',
        name: 'Zesta - Orange Marmalade Jam',
        image: '/images/products/jams/Zesta-Orange-Marmalade-Jam.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-pineapple-jam',
        category: 'jams',
        name: 'Zesta - Pineapple Jam',
        image: '/images/products/jams/Zesta-Pineapple-Jam.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-red-plum-jam',
        category: 'jams',
        name: 'Zesta - Red Plum Jam',
        image: '/images/products/jams/Zesta-Red-Plum-Jam.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-strawberry-jam',
        category: 'jams',
        name: 'Zesta - Strawberry Jam',
        image: '/images/products/jams/Zesta-Strawberry-Jam.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-no-sugar-mixed-fruit-jam',
        category: 'jams',
        name: 'Zesta - No Sugar Mixed Fruit Jam',
        image: '/images/products/jams/Zesta-No-Sugar-Mixed-Fruit-Jam.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-no-sugar-orange-marmalade-jam',
        category: 'jams',
        name: 'Zesta - No Sugar Orange Marmalade Jam',
        image: '/images/products/jams/Zesta-No-Sugar-Orange-Marmalade-Jam.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-no-sugar-red-plum-jam',
        category: 'jams',
        name: 'Zesta - No Sugar Red Plum Jam',
        image: '/images/products/jams/Zesta-No-Sugar-Red-Plum-Jam.png',
        sizes: ['100g', '200g', '300g']
    },
    {
        id: 'zesta-no-sugar-strawberry-jam',
        category: 'jams',
        name: 'Zesta - No Sugar Strawberry Jam',
        image: '/images/products/jams/Zesta-No-Sugar-Strawberry-Jam.png',
        sizes: ['100g', '200g', '300g']
    }
    
  ];

export const categoryTitles: CategoryTitle = { 
  'cooking-oil': 'Cooking Oil/Fat',
  'soaps-self-care': 'Self-Care Soaps',
  'wash-day-soaps': 'Wash Day Soaps',
  'sauces': 'Sauces',
  'condiments': 'Condiments',
  'powders': 'Powders',
  'vinegar': 'Vinegar',
  'jams': 'Jams'
};
