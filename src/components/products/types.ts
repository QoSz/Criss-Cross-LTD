/**
 * Product Type Definitions
 *
 * Centralized types for the products feature.
 * Product data is loaded from /public/data/products.json server-side.
 */

export interface Product {
  id: string;
  category: string;
  company: string;
  name: string;
  image: string;
  description?: string;
}

export type CategoryTitle = Record<string, string>;
export type ProductsByCategory = Record<string, Product[]>;

export interface SearchIndex {
  product: Product;
  nameLower: string;
  categoryLower: string;
  nameWords: string[];
}
