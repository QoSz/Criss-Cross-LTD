"use client";

import { useMemo } from 'react';
import type { Product } from '../types';
import { useSearchIndex } from './useProductSearch';

/**
 * Hook for search suggestions with early exit optimization
 */
export function useSearchSuggestions(products: Product[], searchTerm: string): string[] {
  const searchIndex = useSearchIndex(products);

  return useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) {
      return [];
    }

    const suggestions = new Set<string>();
    const searchLower = searchTerm.toLowerCase();

    for (const { nameWords } of searchIndex) {
      for (const word of nameWords) {
        if (word.startsWith(searchLower) && word !== searchLower) {
          suggestions.add(word);
          if (suggestions.size >= 5) {
            return Array.from(suggestions);
          }
        }
      }
    }

    return Array.from(suggestions);
  }, [searchIndex, searchTerm]);
}
