/**
 * Search Utilities - Fuzzy matching and search scoring functions
 * Extracted from ProductSearchInput to reduce duplication and improve maintainability
 */

/**
 * Search score constants for relevance ranking
 */
export const SEARCH_SCORES = {
  EXACT_MATCH: 100,
  STARTS_WITH: 80,
  CONTAINS: 60,
  FUZZY_MATCH: 40,
  CATEGORY_MATCH: 20,
  PLURAL_SINGULAR: 50,
} as const;

/**
 * Simple fuzzy matching for common variations and misspellings
 * @param text - The text to search in
 * @param pattern - The pattern to search for
 * @returns True if pattern matches text with fuzzy logic
 */
export function fuzzyMatch(text: string, pattern: string): boolean {
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

/**
 * LRU (Least Recently Used) Cache implementation
 * Automatically evicts oldest entries when max size is reached
 * Maintains cache effectiveness even with heavy usage
 */
class LRUCache<K, V> {
  private cache: Map<K, V>;
  private maxSize: number;

  constructor(maxSize: number) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Move to end (most recently used) by deleting and re-inserting
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    // If key exists, delete it first to update position
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used (first item in Map)
      // Safe to assert non-null since we check size >= maxSize
      const firstKey = this.cache.keys().next().value as K;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  get size(): number {
    return this.cache.size;
  }
}

/**
 * Memoization cache for edit distance calculations with LRU eviction
 * Improves performance by avoiding redundant calculations for common word pairs
 * Maintains consistent cache hit rate even with heavy usage
 */
const editDistanceCache = new LRUCache<string, number>(1000);

/**
 * Calculate Levenshtein edit distance between two strings with LRU memoization
 * @param str1 - First string
 * @param str2 - Second string
 * @returns The minimum number of single-character edits required
 */
export function editDistance(str1: string, str2: string): number {
  // Create cache key (order-independent for symmetric caching)
  const cacheKey = str1 < str2 ? `${str1}:${str2}` : `${str2}:${str1}`;

  // Check cache first - LRU will automatically update access time
  const cached = editDistanceCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  // Calculate edit distance using dynamic programming
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

  const distance = matrix[str2.length][str1.length];

  // Cache result - LRU will automatically evict oldest entry if full
  editDistanceCache.set(cacheKey, distance);

  return distance;
}
