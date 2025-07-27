"use client";

import { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categoryTitles, Product, productsByCategory } from './ProductsData';
import { ChevronDown, Filter } from 'lucide-react';

interface CategoryFilterDropdownProps {
  selectedCategories: string[];
  onSelectedCategoriesChange: (categories: string[]) => void;
  className?: string;
}

// Custom hook for category filtering logic
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

export default function CategoryFilterDropdown({
  selectedCategories,
  onSelectedCategoriesChange,
  className,
}: CategoryFilterDropdownProps) {
  const categoryKeys = Object.keys(categoryTitles);

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categoryKeys.forEach(key => {
      counts[key] = productsByCategory[key]?.length || 0;
    });
    return counts;
  }, [categoryKeys]);

  // Sort categories by product count (descending)
  const sortedCategoryKeys = useMemo(() => {
    return [...categoryKeys].sort((a, b) => categoryCounts[b] - categoryCounts[a]);
  }, [categoryKeys, categoryCounts]);

  const handleSelectCategory = (categoryKey: string) => {
    const newSelectedCategories = selectedCategories.includes(categoryKey)
      ? selectedCategories.filter((key) => key !== categoryKey)
      : [...selectedCategories, categoryKey];
    onSelectedCategoriesChange(newSelectedCategories);
  };

  const getTriggerText = () => {
    if (selectedCategories.length === 0) {
      return "Filter by category";
    }
    if (selectedCategories.length === 1) {
      return categoryTitles[selectedCategories[0]] || selectedCategories[0];
    }
    return `${selectedCategories.length} categories selected`;
  };

  const clearAllCategories = () => {
    onSelectedCategoriesChange([]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button variant="outline" className="flex items-center justify-between w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          {getTriggerText()}
          <ChevronDown className="ml-2 h-4 w-4" />
          {selectedCategories.length > 0 && (
            <span className="ml-1 bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
              {selectedCategories.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
        <DropdownMenuLabel className="flex items-center justify-between">
          Filter by Category
          {selectedCategories.length > 0 && (
            <button
              onClick={clearAllCategories}
              className="text-xs text-blue-600 hover:text-blue-800 font-normal"
            >
              Clear all
            </button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sortedCategoryKeys.map((key) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={selectedCategories.includes(key)}
            onCheckedChange={() => handleSelectCategory(key)}
            onSelect={(e) => e.preventDefault()} // Prevent closing on item select
            className="flex items-center justify-between"
          >
            <span className="flex-1">{categoryTitles[key]}</span>
            <span className="text-xs text-gray-500 ml-2 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
              {categoryCounts[key]}
            </span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 