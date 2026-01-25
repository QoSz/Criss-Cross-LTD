"use client";

import { useMemo } from 'react';
import type { Product } from '../types';

/**
 * Hook for filtering products by selected categories
 */
export function useCategoryFilter(products: Product[], selectedCategories: string[]): Product[] {
  return useMemo(() => {
    if (selectedCategories.length === 0) {
      return products;
    }

    return products.filter(product =>
      selectedCategories.includes(product.category)
    );
  }, [products, selectedCategories]);
}
