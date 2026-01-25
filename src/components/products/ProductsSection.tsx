"use client";

import { useState, useMemo } from 'react';
import type { Product, ProductsByCategory } from './types';
import { ProductCard } from './ProductCard';
import { ProductSearchInput, CategoryFilterDropdown, ResetFiltersButton } from './filters';
import { useProductSearch, useSearchSuggestions, useCategoryFilter } from './hooks';

interface ProductsSectionProps {
  productsByCategory: ProductsByCategory;
  categoryTitles: Record<string, string>;
}

export function ProductsSection({
  productsByCategory,
  categoryTitles,
}: ProductsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const allProducts = useMemo(() => {
    return Object.values(productsByCategory).flat();
  }, [productsByCategory]);

  const searchFilteredProducts = useProductSearch(allProducts, searchTerm);
  const categoryFilteredProducts = useCategoryFilter(allProducts, selectedCategories);
  const searchSuggestions = useSearchSuggestions(allProducts, searchTerm);

  const filteredProducts = useMemo(() => {
    const hasSearch = searchTerm.trim() !== '';
    const hasCategories = selectedCategories.length > 0;

    if (!hasSearch && !hasCategories) {
      return allProducts;
    }

    if (hasSearch && !hasCategories) {
      return searchFilteredProducts;
    }

    if (!hasSearch && hasCategories) {
      return categoryFilteredProducts;
    }

    // Both filters active: OR logic with deduplication
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

  const productsGroupedForDisplay = useMemo(() => {
    if (!isFiltered) {
      return productsByCategory;
    }

    const grouped: Record<string, Product[]> = {};
    filteredProducts.forEach(product => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });

    return grouped;
  }, [filteredProducts, isFiltered, productsByCategory]);

  const categoryKeysToDisplay = Object.keys(productsGroupedForDisplay);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center">Products</h1>
      <p className="text-center pt-4 pb-8 text-gray-600 dark:text-gray-400">
        Note: We have a range of sizes for all products. Contact us for more information!
      </p>

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
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
