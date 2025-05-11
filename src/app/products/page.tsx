import { products, categoryTitles, Product } from './ProductsData';
import ProductCardDialog from './ProductCardDialog';

export default function ProductsPage() {
  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center">Products</h1>
      <p className="text-center pt-8 text-gray-600">Note: we have a range of sizes for the products contact for more info!</p>
      {categories.map(category => {
        const productsForCategory = products.filter(product => product.category === category);
        const categoryTitle = categoryTitles[category] || category;

        return (
          <div key={category}>
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