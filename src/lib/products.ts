import { promises as fs } from 'fs';
import path from 'path';
import type { Product, ProductsByCategory } from '@/components/products';

interface ProductsData {
  productsByCategory: ProductsByCategory;
  categoryTitles: Record<string, string>;
}

/**
 * Server-side utility to load products data from JSON file
 * This prevents the 46KB products data from being bundled in the client
 * Data is loaded at build time for static pages or runtime for dynamic pages
 */
export async function getProductsData(): Promise<ProductsData> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'products.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data: ProductsData = JSON.parse(fileContents);

  return data;
}

/**
 * Get all products as a flat array
 */
export async function getAllProducts(): Promise<Product[]> {
  const { productsByCategory } = await getProductsData();
  return Object.values(productsByCategory).flat();
}

/**
 * Get a single product by its slug/id
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find(p => p.id === slug) || null;
}

/**
 * Get related products from the same category, excluding the current product
 */
export async function getRelatedProducts(
  currentProductId: string,
  category: string,
  limit: number = 4
): Promise<Product[]> {
  const { productsByCategory } = await getProductsData();
  const categoryProducts = productsByCategory[category] || [];
  return categoryProducts
    .filter(p => p.id !== currentProductId)
    .slice(0, limit);
}

/**
 * Get category title from category slug
 */
export async function getCategoryTitle(categorySlug: string): Promise<string> {
  const { categoryTitles } = await getProductsData();
  return categoryTitles[categorySlug] || categorySlug;
}
