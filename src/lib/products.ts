import { promises as fs } from 'fs';
import path from 'path';
import type { Product, ProductsByCategory } from '@/app/products/ProductsData';

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
 * Get products grouped by category
 */
export async function getProductsByCategory(): Promise<ProductsByCategory> {
  const { productsByCategory } = await getProductsData();
  return productsByCategory;
}

/**
 * Get category titles mapping
 */
export async function getCategoryTitles(): Promise<Record<string, string>> {
  const { categoryTitles } = await getProductsData();
  return categoryTitles;
}
