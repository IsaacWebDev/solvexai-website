export const PortfolioCardSkeleton = () => (
  <div className="glass-card p-6 animate-pulse" role="status" aria-label="Loading portfolio item">
    <div className="h-48 bg-gray-800 rounded-lg mb-4"></div>
    <div className="h-6 bg-gray-800 w-3/4 rounded mb-2"></div>
    <div className="h-4 bg-gray-800 w-1/2 rounded"></div>
    <span className="sr-only">Loading...</span>
  </div>
)
