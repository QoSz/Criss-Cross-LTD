import { productsByCategory, categoryTitles, Product } from './ProductsData';
import ProductCardDialog from './ProductCardDialog';

export default function ProductsPage() {
  const categoryKeys = Object.keys(productsByCategory);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center">Products</h1>
      <p className="text-center pt-8 text-gray-600">Note: we have a range of sizes for the products contact for more info!</p>
      {categoryKeys.map(categoryKey => {
        const productsForCategory = productsByCategory[categoryKey];
        const categoryTitle = categoryTitles[categoryKey] || categoryKey;

        return (
          <div key={categoryKey}>
            <h2 className="text-2xl font-bold py-8">{categoryTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsForCategory.map((product: Product) => (
                <ProductCardDialog key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};