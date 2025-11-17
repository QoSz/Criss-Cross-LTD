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
 * Calculate Levenshtein edit distance between two strings
 * @param str1 - First string
 * @param str2 - Second string
 * @returns The minimum number of single-character edits required
 */
export function editDistance(str1: string, str2: string): number {
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
