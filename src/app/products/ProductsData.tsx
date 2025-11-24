/**
 * Product Type Definitions
 *
 * The actual product data has been moved to /public/data/products.json
 * to prevent it from being bundled in the client-side JavaScript.
 *
 * Use getProductsData() from @/lib/products to load product data server-side.
 */

export interface Product {
  id: string;
  category: string;
  name: string;
  image: string;
}

/**
 * Type-safe mapping of category keys to display titles
 * This ensures categoryTitles keys are validated at compile-time
 */
export type CategoryTitle = Record<string, string>;

export type ProductsByCategory = Record<string, Product[]>;
