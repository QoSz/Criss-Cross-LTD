'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log error for debugging (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Products page error:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Error Loading Products
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We couldn&apos;t load our product catalog. This might be a temporary issue.
        </p>
        {process.env.NODE_ENV === 'development' && error.message && (
          <p className="text-sm text-red-600 dark:text-red-400 mb-4 font-mono bg-red-50 dark:bg-red-900/20 p-3 rounded">
            {error.message}
          </p>
        )}
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 text-white rounded-full transition-colors"
          aria-label="Retry loading products"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
