import { promises as fs } from 'fs';
import path from 'path';
import type { ProductsByCategory } from '@/app/products/ProductsData';

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
