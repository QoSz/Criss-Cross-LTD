"use client";

import { useMemo } from 'react';
import type { Product, SearchIndex } from '../types';
import { fuzzyMatch, SEARCH_SCORES } from '@/lib/search-utils';

/**
 * Pre-compute search index for faster lookups
 */
export function useSearchIndex(products: Product[]): SearchIndex[] {
  return useMemo(() => {
    return products.map(product => ({
      product,
      nameLower: product.name.toLowerCase(),
      categoryLower: product.category.toLowerCase(),
      nameWords: product.name.toLowerCase().split(/\s+/),
    }));
  }, [products]);
}

/**
 * Enhanced search hook with fuzzy matching and relevance scoring
 */
export function useProductSearch(products: Product[], searchTerm: string): Product[] {
  const searchIndex = useSearchIndex(products);

  return useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }

    const searchWords = searchTerm
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0);

    const scoredProducts = searchIndex.map(({ product, nameLower, categoryLower }) => {
      let score = 0;

      for (const searchWord of searchWords) {
        if (nameLower === searchWord) {
          score += SEARCH_SCORES.EXACT_MATCH;
        } else if (nameLower.startsWith(searchWord)) {
          score += SEARCH_SCORES.STARTS_WITH;
        } else if (nameLower.includes(searchWord)) {
          score += SEARCH_SCORES.CONTAINS;
        } else if (fuzzyMatch(nameLower, searchWord)) {
          score += SEARCH_SCORES.FUZZY_MATCH;
        } else if (categoryLower.includes(searchWord)) {
          score += SEARCH_SCORES.CATEGORY_MATCH;
        } else {
          if (searchWord.endsWith('s') && searchWord.length > 2) {
            const singular = searchWord.slice(0, -1);
            if (nameLower.includes(singular)) {
              score += SEARCH_SCORES.PLURAL_SINGULAR;
            }
          } else {
            const plural = searchWord + 's';
            if (nameLower.includes(plural)) {
              score += SEARCH_SCORES.PLURAL_SINGULAR;
            }
          }
        }
      }

      return { product, score };
    });

    return scoredProducts
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
  }, [searchIndex, products, searchTerm]);
}
