export default function Loading() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="animate-pulse">
        {/* Page title skeleton */}
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-8" />

        {/* Subtitle skeleton */}
        <div className="h-4 w-96 max-w-full bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-8" />

        {/* Product grid skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-[1.618rem]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
