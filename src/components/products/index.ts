export { ProductsSection } from './ProductsSection';
export { ProductCard } from './ProductCard';
export { ProductSchemaList } from './ProductSchemaList';
export { ProductDetail } from './ProductDetail';
export { RelatedProducts } from './RelatedProducts';

// Re-export types
export type { Product, ProductsByCategory, CategoryTitle, SearchIndex } from './types';

// Re-export hooks for testing/extension
export * from './hooks';

// Re-export filters for customization
export * from './filters';
