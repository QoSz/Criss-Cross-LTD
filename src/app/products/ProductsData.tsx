/**
 * Product Type Definitions
 *
 * The actual product data has been moved to /public/data/products.json
 * to prevent it from being bundled in the client-side JavaScript.
 *
 * Use the server-side utilities from @/lib/products to load product data:
 * - getProductsData() - Get all data (products + category titles)
 * - getAllProducts() - Get flat array of all products
 * - getProductsByCategory() - Get products grouped by category
 * - getCategoryTitles() - Get category title mappings
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
