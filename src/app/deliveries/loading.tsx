export default function Loading() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="animate-pulse">
        {/* Page title skeleton */}
        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4" />

        {/* Subtitle skeleton */}
        <div className="h-4 w-96 max-w-full bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-12" />

        {/* Hero section skeleton */}
        <div className="mb-12">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-[1.618rem] mb-8" />
        </div>

        {/* Content sections skeleton */}
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>

        {/* Map skeleton */}
        <div className="mt-12 h-96 bg-gray-200 dark:bg-gray-700 rounded-[1.618rem]" />
      </div>
    </div>
  );
}
