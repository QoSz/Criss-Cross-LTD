"use client";

import { useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Product } from './ProductsData';

interface ProductSearchInputProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  className?: string;
}

// Custom hook for product search logic
export function useProductSearch(products: Product[], searchTerm: string): Product[] {
  return useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }

    const searchWords = searchTerm
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0);

    return products.filter(product => {
      const productName = product.name.toLowerCase();
      
      return searchWords.every(searchWord => {
        // Direct substring match (most common case)
        if (productName.includes(searchWord)) {
          return true;
        }

        // Handle simple plural/singular variations
        if (searchWord.endsWith('s') && searchWord.length > 2) {
          const singular = searchWord.slice(0, -1);
          if (productName.includes(singular)) {
            return true;
          }
        } else {
          const plural = searchWord + 's';
          if (productName.includes(plural)) {
            return true;
          }
        }

        return false;
      });
    });
  }, [products, searchTerm]);
}

export default function ProductSearchInput({
  searchTerm,
  onSearchTermChange,
  className,
}: ProductSearchInputProps) {
  return (
    <Input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => onSearchTermChange(e.target.value)}
      className={className}
    />
  );
} 