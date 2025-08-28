import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TopLink } from '@/types/analytics';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopLinksProps {
  data: TopLink[];
}

export function TopLinksComponent({ data }: TopLinksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Links</CardTitle>
        <p className="text-sm text-muted-foreground">
          Your most clicked links this month
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((link, index) => {
            const isPositive = link.growth > 0;
            const TrendIcon = isPositive ? TrendingUp : TrendingDown;
            
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <p className="text-sm font-medium truncate">
                      {link.shortUrl.replace('https://', '')}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => window.open(link.originalUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-1">
                    {link.originalUrl}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 ml-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {link.clicks.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">clicks</p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <TrendIcon 
                      className={`h-3 w-3 ${
                        isPositive ? 'text-green-500' : 'text-red-500'
                      }`}
                    />
                    <span 
                      className={`text-xs font-medium ${
                        isPositive ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {isPositive ? '+' : ''}{link.growth.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
