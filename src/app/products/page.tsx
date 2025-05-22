"use client";

import { useState, useMemo } from 'react';
import { productsByCategory, categoryTitles, Product } from './ProductsData';
import ProductCardDialog from './ProductCardDialog';
import ProductSearchInput from './ProductSearchInput';
import CategoryFilterDropdown from './CategoryFilterDropdown';
import ResetFiltersButton from './ResetFiltersButton';

// Helper function to escape regex special characters
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const allProducts = useMemo(() => {
    return Object.values(productsByCategory).flat();
  }, []);

  const filteredProducts = useMemo(() => {
    let productsToFilter = allProducts;

    // Category filtering
    if (selectedCategories.length > 0) {
      productsToFilter = productsToFilter.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Search term filtering
    if (searchTerm.trim() !== '') {
      const searchWords = searchTerm.toLowerCase().trim().split(' ').filter(w => w.length > 0);

      productsToFilter = productsToFilter.filter(product => {
        const productNameLower = product.name.toLowerCase();

        return searchWords.every(sw => { // Every search word must find a match
          // Attempt 1: Exact word match for the search word itself
          const regexExact = new RegExp(`\\b${escapeRegExp(sw)}\\b`);
          if (regexExact.test(productNameLower)) {
            return true;
          }

          // Attempt 2: Handle plural search word vs singular in product name
          // e.g., search "soaps", product name contains "soap"
          if (sw.length > 1 && sw.endsWith('s')) {
            const singularSw = sw.slice(0, -1);
            const regexSingular = new RegExp(`\\b${escapeRegExp(singularSw)}\\b`);
            if (regexSingular.test(productNameLower)) {
              return true;
            }
          }

          // Attempt 3: Handle singular search word vs plural in product name
          // e.g., search "soap", product name contains "soaps"
          // (Ensure sw itself is not empty after a potential slice if it was 's')
          if (sw.length > 0) { 
            const pluralSw = sw + 's';
            const regexPlural = new RegExp(`\\b${escapeRegExp(pluralSw)}\\b`);
            if (regexPlural.test(productNameLower)) {
              return true;
            }
          }
          
          return false;
        });
      });
    }
    return productsToFilter;
  }, [searchTerm, selectedCategories, allProducts]);

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
  }, [filteredProducts, isFiltered]);

  const categoryKeysToDisplay = Object.keys(productsGroupedForDisplay);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center">Products</h1>
      <p className="text-center pt-4 pb-8 text-gray-600">
        Note: we have a range of sizes for the products contact for more info!
      </p>

      {/* Filters Section */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <ProductSearchInput
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          className="w-full sm:flex-grow"
        />
        <CategoryFilterDropdown
          selectedCategories={selectedCategories}
          onSelectedCategoriesChange={setSelectedCategories}
          className="w-full sm:w-auto min-w-[200px]"
        />
        {isFiltered && (
          <ResetFiltersButton
            onReset={handleResetFilters}
            className="w-full sm:w-auto"
          />
        )}
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
          <div key={categoryKey}>
            <h2 className="text-2xl font-bold pt-8 pb-4">{categoryTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {productsForCategory.map((product: Product) => (
                <ProductCardDialog key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};