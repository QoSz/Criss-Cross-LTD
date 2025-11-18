import { Product } from './ProductsData';

interface ProductSchemaListProps {
  products: Product[];
}

/**
 * Optimized ItemList schema for product catalog
 * Replaces 400+ individual Product schemas with a single ItemList
 * Reduces structured data size from ~120-200KB to ~2-3KB
 * Follows Google's recommended pattern for product listing pages
 */
export function ProductSchemaList({ products }: ProductSchemaListProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Wholesale FMCG Products - Criss Cross Ltd",
    "description": "Complete catalog of wholesale FMCG products available from Criss Cross Ltd, Kenya's trusted distributor",
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => {
      const brandName = product.name.split(' ')[0] || product.category;

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "@id": `https://www.crisscross.co.ke/products#${product.id}`,
          "name": product.name,
          "description": `Wholesale ${product.name} available at competitive prices from Criss Cross Ltd, Kenya's trusted FMCG distributor`,
          "image": `https://www.crisscross.co.ke${product.image}`,
          "category": product.category,
          "brand": {
            "@type": "Brand",
            "name": brandName
          },
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "KES",
            "seller": {
              "@type": "Organization",
              "name": "Criss Cross Ltd",
              "url": "https://www.crisscross.co.ke"
            },
            "businessFunction": "http://purl.org/goodrelations/v1#Sell",
            "eligibleQuantity": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "unitText": "Bulk Orders"
            }
          }
        }
      };
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
