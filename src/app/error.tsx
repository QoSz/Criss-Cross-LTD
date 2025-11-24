'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Something went wrong!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error.message || 'We encountered an unexpected error. Please try again.'}
        </p>
        {process.env.NODE_ENV === 'development' && error.digest && (
          <p className="text-xs text-gray-500 dark:text-gray-600 mb-4">
            Error ID: {error.digest}
          </p>
        )}
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
