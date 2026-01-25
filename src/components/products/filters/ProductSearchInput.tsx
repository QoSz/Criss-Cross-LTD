"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Search, X } from 'lucide-react';

interface ProductSearchInputProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  className?: string;
  suggestions?: string[];
  showSuggestions?: boolean;
}

export function ProductSearchInput({
  searchTerm,
  onSearchTermChange,
  className,
  suggestions = [],
  showSuggestions = false,
}: ProductSearchInputProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);
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

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
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
  }, [showSuggestions, suggestions, selectedSuggestionIndex, onSearchTermChange]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setLocalSearchTerm(suggestion);
    onSearchTermChange(suggestion);
    setShowSuggestionsList(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  }, [onSearchTermChange]);

  const clearSearch = useCallback(() => {
    setLocalSearchTerm('');
    onSearchTermChange('');
    setShowSuggestionsList(false);
    inputRef.current?.focus();
  }, [onSearchTermChange]);

  const handleFocus = useCallback(() => {
    if (showSuggestions && suggestions.length > 0 && localSearchTerm.length > 1) {
      setShowSuggestionsList(true);
    }
  }, [showSuggestions, suggestions.length, localSearchTerm]);

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (
        suggestionsRef.current &&
        target instanceof Node &&
        !suggestionsRef.current.contains(target)
      ) {
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
