export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-[450px] animate-pulse">
      <div className="h-6 w-48 bg-muted rounded mb-2"></div>
      <div className="h-4 w-64 bg-muted rounded mb-6"></div>
      <div className="h-[350px] bg-muted rounded"></div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 animate-pulse">
      <div className="p-6 border-b border-gray-200">
        <div className="h-6 w-48 bg-muted rounded mb-2"></div>
        <div className="h-4 w-32 bg-muted rounded"></div>
      </div>
      <div className="p-6 space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-12 bg-muted rounded"></div>
        ))}
      </div>
    </div>
  );
}

export function FiltersSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
      <div className="h-6 w-32 bg-muted rounded mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-20 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
