'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Error Loading Products
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We couldn&apos;t load our product catalog. This might be a temporary issue.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
