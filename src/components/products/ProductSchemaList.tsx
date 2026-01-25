import type { Product } from './types';

interface ProductSchemaListProps {
  products: Product[];
}

/**
 * Optimized ItemList schema for product catalog
 * Replaces 400+ individual Product schemas with a single ItemList
 * Reduces structured data size from ~120-200KB to ~2-3KB
 */
export function ProductSchemaList({ products }: ProductSchemaListProps) {
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
            "@type": "AggregateOffer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "KES",
            "offerCount": 1,
            "seller": {
              "@type": "Organization",
              "name": "Criss Cross Ltd",
              "url": "https://www.crisscross.co.ke"
            },
            "businessFunction": "http://purl.org/goodrelations/v1#Sell",
            "eligibleQuantity": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "unitText": "Case"
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "priceCurrency": "KES",
              "valueAddedTaxIncluded": true,
              "eligibleTransactionVolume": {
                "@type": "PriceSpecification",
                "priceCurrency": "KES",
                "description": "Wholesale pricing for bulk orders"
              }
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
