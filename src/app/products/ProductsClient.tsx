"use client";

import { useState, useMemo } from 'react';
import type { Product, ProductsByCategory } from './ProductsData';
import ProductCardDialog from './ProductCardDialog';
import ProductSearchInput, { useProductSearch, useSearchSuggestions } from './ProductSearchInput';
import CategoryFilterDropdown, { useCategoryFilter } from './CategoryFilterDropdown';
import ResetFiltersButton from './ResetFiltersButton';

interface ProductsClientProps {
  productsByCategory: ProductsByCategory;
  categoryTitles: Record<string, string>;
}

export default function ProductsClient({
  productsByCategory,
  categoryTitles,
}: ProductsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get all products once and memoize
  const allProducts = useMemo(() => {
    return Object.values(productsByCategory).flat();
  }, [productsByCategory]);

  // Get filtered results from both filters
  const searchFilteredProducts = useProductSearch(allProducts, searchTerm);
  const categoryFilteredProducts = useCategoryFilter(allProducts, selectedCategories);
  const searchSuggestions = useSearchSuggestions(allProducts, searchTerm);

  // Apply filters with OR logic: show products that match search OR are in selected categories
  const filteredProducts = useMemo(() => {
    const hasSearch = searchTerm.trim() !== '';
    const hasCategories = selectedCategories.length > 0;

    // If no filters are active, return all products
    if (!hasSearch && !hasCategories) {
      return allProducts;
    }

    // If only search is active, return search results
    if (hasSearch && !hasCategories) {
      return searchFilteredProducts;
    }

    // If only categories are active, return category results
    if (!hasSearch && hasCategories) {
      return categoryFilteredProducts;
    }

    // If both filters are active, combine with OR logic and deduplicate
    const uniqueProductsMap = new Map<string, Product>();

    searchFilteredProducts.forEach(p => uniqueProductsMap.set(p.id, p));
    categoryFilteredProducts.forEach(p => uniqueProductsMap.set(p.id, p));

    return Array.from(uniqueProductsMap.values());
  }, [allProducts, searchTerm, selectedCategories, searchFilteredProducts, categoryFilteredProducts]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
  };

  const isFiltered = searchTerm.trim() !== '' || selectedCategories.length > 0;

  // Group filtered products by their original category for display
  const productsGroupedForDisplay = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    
    filteredProducts.forEach(product => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });

    // If no filters are active, display all products grouped by their original category hierarchy
    if (!isFiltered) {
      return productsByCategory; 
    }

    return grouped;
  }, [filteredProducts, isFiltered, productsByCategory]);

  const categoryKeysToDisplay = Object.keys(productsGroupedForDisplay);

  return (
    <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold text-center">Products</h1>
      <p className="text-center pt-4 pb-8 text-gray-600 dark:text-gray-400">
        Note: We have a range of sizes for all products. Contact us for more information!
      </p>

      {/* Filters Section */}
      <div
        className="mb-8 flex flex-col sm:flex-row gap-4 items-center"
        role="search"
        aria-label="Filter products by search term or category"
      >
        <ProductSearchInput
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          className="w-full sm:flex-grow"
          suggestions={searchSuggestions}
          showSuggestions={true}
        />
        <CategoryFilterDropdown
          selectedCategories={selectedCategories}
          onSelectedCategoriesChange={setSelectedCategories}
          categoryTitles={categoryTitles}
          productsByCategory={productsByCategory}
          className="w-full sm:w-auto min-w-[200px]"
        />
        {isFiltered && (
          <ResetFiltersButton
            onReset={handleResetFilters}
            className="w-full sm:w-auto"
          />
        )}
      </div>

      {/* Results count - live region for screen readers */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {isFiltered
          ? `Showing ${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'} matching your criteria`
          : `Showing all ${allProducts.length} products`}
      </div>

      {categoryKeysToDisplay.length === 0 && isFiltered && (
        <p className="text-center text-gray-500 text-xl py-10">
          No products found matching your criteria.
        </p>
      )}

      {categoryKeysToDisplay.map(categoryKey => {
        const productsForCategory = productsGroupedForDisplay[categoryKey];
        if (!productsForCategory || productsForCategory.length === 0) {
            return null;
        }
        const categoryTitle = categoryTitles[categoryKey] || categoryKey;

        return (
          <section
            key={categoryKey}
            aria-labelledby={`category-${categoryKey}`}
          >
            <h2
              id={`category-${categoryKey}`}
              className="text-2xl font-bold pt-8 pb-4"
            >
              {categoryTitle}
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {productsForCategory.map((product: Product) => (
                <li key={product.id}>
                  <ProductCardDialog product={product} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
} 