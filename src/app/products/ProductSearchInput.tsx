"use client";

import { useMemo, useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Search, X } from 'lucide-react';
import { Product } from './ProductsData';

interface ProductSearchInputProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  className?: string;
}

// Enhanced search hook with fuzzy matching and relevance scoring
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

    // Score products based on search relevance
    const scoredProducts = products.map(product => {
      const productName = product.name.toLowerCase();
      const productCategory = product.category.toLowerCase();
      let score = 0;

      searchWords.forEach(searchWord => {
        // Exact match in name (highest score)
        if (productName === searchWord) {
          score += 100;
        }
        // Starts with search word (high score)
        else if (productName.startsWith(searchWord)) {
          score += 80;
        }
        // Contains search word (medium score)
        else if (productName.includes(searchWord)) {
          score += 60;
        }
        // Fuzzy match for common misspellings and variations
        else if (fuzzyMatch(productName, searchWord)) {
          score += 40;
        }
        // Category match (lower score)
        else if (productCategory.includes(searchWord)) {
          score += 20;
        }
        // Handle plural/singular variations
        else {
          if (searchWord.endsWith('s') && searchWord.length > 2) {
            const singular = searchWord.slice(0, -1);
            if (productName.includes(singular)) {
              score += 50;
            }
          } else {
            const plural = searchWord + 's';
            if (productName.includes(plural)) {
              score += 50;
            }
          }
        }
      });

      return { product, score };
    });

    // Filter products with score > 0 and sort by relevance
    return scoredProducts
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
  }, [products, searchTerm]);
}

// Simple fuzzy matching for common variations
function fuzzyMatch(text: string, pattern: string): boolean {
  // Handle common substitutions and misspellings
  const substitutions: Record<string, string[]> = {
    'oil': ['oel', 'oyl'],
    'soap': ['sope', 'soep'],
    'rice': ['ryce', 'rise'],
    'tea': ['te', 'tee'],
    'sugar': ['suggar', 'suger'],
    'spice': ['spise', 'spyse'],
    'sauce': ['sause', 'souce'],
  };

  // Check direct substitutions
  for (const [correct, variations] of Object.entries(substitutions)) {
    if (pattern === correct && variations.some(v => text.includes(v))) {
      return true;
    }
    if (variations.includes(pattern) && text.includes(correct)) {
      return true;
    }
  }

  // Simple edit distance for short words
  if (pattern.length <= 4 && text.length <= 10) {
    return editDistance(text, pattern) <= 1;
  }

  return false;
}

// Simple edit distance calculation
function editDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + substitutionCost // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
}

// Hook for search suggestions
export function useSearchSuggestions(products: Product[], searchTerm: string): string[] {
  return useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) {
      return [];
    }

    const suggestions = new Set<string>();
    const searchLower = searchTerm.toLowerCase();

    products.forEach(product => {
      const words = product.name.toLowerCase().split(/\s+/);
      words.forEach(word => {
        if (word.startsWith(searchLower) && word !== searchLower) {
          suggestions.add(word);
        }
      });
    });

    return Array.from(suggestions).slice(0, 5);
  }, [products, searchTerm]);
}

interface ProductSearchInputProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  className?: string;
  suggestions?: string[];
  showSuggestions?: boolean;
}

export default function ProductSearchInput({
  searchTerm,
  onSearchTermChange,
  className,
  suggestions = [],
  showSuggestions = false,
}: ProductSearchInputProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const debounceRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onSearchTermChange(localSearchTerm);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [localSearchTerm, onSearchTermChange]);

  // Sync with external changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          const suggestion = suggestions[selectedSuggestionIndex];
          setLocalSearchTerm(suggestion);
          onSearchTermChange(suggestion);
          setShowSuggestionsList(false);
          setSelectedSuggestionIndex(-1);
        }
        break;
      case 'Escape':
        setShowSuggestionsList(false);
        setSelectedSuggestionIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setLocalSearchTerm(suggestion);
    onSearchTermChange(suggestion);
    setShowSuggestionsList(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  // Clear search
  const clearSearch = () => {
    setLocalSearchTerm('');
    onSearchTermChange('');
    setShowSuggestionsList(false);
    inputRef.current?.focus();
  };

  // Show suggestions when input is focused and has content
  const handleFocus = () => {
    if (showSuggestions && suggestions.length > 0 && localSearchTerm.length > 1) {
      setShowSuggestionsList(true);
    }
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestionsList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search products... (e.g., oil, soap, rice)"
          value={localSearchTerm}
          onChange={(e) => {
            setLocalSearchTerm(e.target.value);
            if (showSuggestions && e.target.value.length > 1) {
              setShowSuggestionsList(true);
              setSelectedSuggestionIndex(-1);
            } else {
              setShowSuggestionsList(false);
            }
          }}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10"
        />
        {localSearchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && showSuggestionsList && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                index === selectedSuggestionIndex ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="text-sm">
                <span className="font-medium">{suggestion.slice(0, localSearchTerm.length)}</span>
                {suggestion.slice(localSearchTerm.length)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 