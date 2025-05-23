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
import { categoryTitles, Product } from './ProductsData';
import { ChevronDown } from 'lucide-react';

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button variant="outline" className="flex items-center justify-between w-full sm:w-auto">
          {getTriggerText()}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto">
        <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categoryKeys.map((key) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={selectedCategories.includes(key)}
            onCheckedChange={() => handleSelectCategory(key)}
            onSelect={(e) => e.preventDefault()} // Prevent closing on item select
          >
            {categoryTitles[key]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 