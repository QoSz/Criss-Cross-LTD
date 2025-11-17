import { ProductSchema } from '@/components/structured-data/OrganizationSchema';
import { Product } from './ProductsData';

interface ProductSchemaListProps {
  products: Product[];
}

export function ProductSchemaList({ products }: ProductSchemaListProps) {
  return (
    <>
      {products.map((product) => {
        // Extract brand from product name (first word) or use category as fallback
        const brandName = product.name.split(' ')[0] || product.category;

        return (
          <ProductSchema
            key={product.id}
            name={product.name}
            description={`Wholesale ${product.name} available at competitive prices from Criss Cross Ltd, Kenya's trusted FMCG distributor.`}
            image={`https://www.crisscross.co.ke${product.image}`}
            category={product.category}
            brand={brandName}
            availability="InStock"
          />
        );
      })}
    </>
  );
}
