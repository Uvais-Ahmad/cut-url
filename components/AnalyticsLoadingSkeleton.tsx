import { Card, CardContent, CardHeader } from '@/components/ui/card';

function AnalyticsLoadingSkeleton() {
  return (
    <div className="space-y-8 p-6">
      {/* Overview Cards Skeleton */}
      <div>
        <div className="h-6 w-32 bg-gradient-to-r from-muted to-muted/50 rounded-md mb-6 animate-pulse" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Card 
              key={index} 
              className="overflow-hidden border-0 bg-white dark:bg-gray-900/50 shadow-lg"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="h-4 w-24 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
                  <div className="w-12 h-12 bg-gradient-to-br from-muted to-muted/50 rounded-xl animate-pulse" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-8 w-20 bg-gradient-to-r from-muted to-muted/50 rounded mb-3 animate-pulse" />
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <div className="h-4 w-4 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
                    <div className="h-4 w-12 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
                  </div>
                  <div className="h-3 w-16 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
                </div>
                <div className="w-full bg-muted/30 rounded-full h-1">
                  <div className="h-1 bg-gradient-to-r from-muted to-muted/50 rounded-full w-3/4 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts Section Skeleton */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Clicks Chart Skeleton */}
        <Card className="p-6 border-0 bg-white dark:bg-gray-900/50 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 w-32 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
          </div>
          <div className="h-64 bg-gradient-to-br from-muted to-muted/50 rounded-lg animate-pulse" />
        </Card>

        {/* Geographic Analytics Skeleton */}
        <Card className="p-6 border-0 bg-white dark:bg-gray-900/50 shadow-lg">
          <div className="h-6 w-40 bg-gradient-to-r from-muted to-muted/50 rounded mb-6 animate-pulse" />
          <div className="space-y-4">
            <div className="flex items-center justify-center h-48 bg-gradient-to-br from-muted to-muted/50 rounded-lg animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Top Links Section Skeleton */}
      <Card className="p-6 border-0 bg-white dark:bg-gray-900/50 shadow-lg">
        <div className="h-6 w-24 bg-gradient-to-r from-muted to-muted/50 rounded mb-6 animate-pulse" />
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-muted to-muted/50 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="h-4 w-16 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
                <div className="h-3 w-12 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Data Table Skeleton */}
      <Card className="p-6 border-0 bg-white dark:bg-gray-900/50 shadow-lg">
        <div className="h-6 w-32 bg-gradient-to-r from-muted to-muted/50 rounded mb-6 animate-pulse" />
        <div className="space-y-4">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 pb-3 border-b border-muted">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
            ))}
          </div>
          {/* Table Rows */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 py-3">
              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse" />
              ))}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Export as both default and named export
export default AnalyticsLoadingSkeleton;
export { AnalyticsLoadingSkeleton };
