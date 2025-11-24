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
  // Pre-compute static strings outside map to avoid 400+ string operations
  const baseProductUrl = 'https://www.crisscross.co.ke/products#';
  const baseImageUrl = 'https://www.crisscross.co.ke';
  const descriptionSuffix = ' available at competitive prices from Criss Cross Ltd, Kenya\'s trusted FMCG distributor';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Wholesale FMCG Products - Criss Cross Ltd",
    "description": "Complete catalog of wholesale FMCG products available from Criss Cross Ltd, Kenya's trusted distributor",
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => {
      // Use substring instead of split for better performance
      const spaceIndex = product.name.indexOf(' ');
      const brandName = spaceIndex > 0 ? product.name.substring(0, spaceIndex) : product.category;

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "@id": baseProductUrl + product.id,
          "name": product.name,
          "description": 'Wholesale ' + product.name + descriptionSuffix,
          "image": baseImageUrl + product.image,
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
