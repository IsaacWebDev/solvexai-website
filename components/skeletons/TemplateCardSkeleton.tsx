export const TemplateCardSkeleton = () => (
  <div className="glass-card p-4 animate-pulse" role="status" aria-label="Loading template">
    <div className="aspect-video bg-gray-800 rounded-lg mb-3"></div>
    <div className="h-5 bg-gray-800 w-2/3 rounded mb-2"></div>
    <div className="h-4 bg-gray-800 w-1/3 rounded"></div>
    <span className="sr-only">Loading...</span>
  </div>
)
