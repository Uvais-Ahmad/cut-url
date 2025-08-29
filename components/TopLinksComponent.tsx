import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TopLink } from '@/types/analytics';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopLinksProps {
  data: TopLink[];
}

function TopLinksComponent({ data }: TopLinksProps) {
  return (
    <Card className="group overflow-hidden border-0 bg-white dark:bg-gray-900/50 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative pb-4">
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Top Performing Links
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Your most clicked links this month
        </p>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-3">
          {data.map((link, index) => {
            const isPositive = link.growth > 0;
            const TrendIcon = isPositive ? TrendingUp : TrendingDown;
            
            return (
              <div
                key={index}
                className="group/item relative overflow-hidden p-4 rounded-xl bg-gradient-to-r from-background to-background/50 border border-border/50 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md transition-all duration-300"
              >
                {/* Rank indicator */}
                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
                
                <div className="flex items-center justify-between pl-8">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {link.shortUrl.replace('https://', '')}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover/item:opacity-100 transition-opacity"
                        onClick={() => window.open(link.originalUrl, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {link.originalUrl}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4 ml-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">
                        {link.clicks.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">clicks</p>
                    </div>
                    
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                      isPositive 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      <TrendIcon className="h-3 w-3" />
                      <span className="text-xs font-medium">
                        {isPositive ? '+' : ''}{link.growth}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-3 w-full bg-muted/30 rounded-full h-1">
                  <div 
                    className="h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${Math.min((link.clicks / Math.max(...data.map(l => l.clicks))) * 100, 100)}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* View all button */}
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
          >
            View All Links
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Export as both default and named export
export default TopLinksComponent;
export { TopLinksComponent };
