import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalyticsOverview } from '@/types/analytics';
import { TrendingUp, TrendingDown, Users, MousePointer, Link, Activity } from 'lucide-react';

interface AnalyticsOverviewCardsProps {
  data: AnalyticsOverview;
}

function AnalyticsOverviewCards({ data }: AnalyticsOverviewCardsProps) {
  const cards = [
    {
      title: 'Total Clicks',
      value: data.totalClicks.toLocaleString(),
      icon: MousePointer,
      change: '+12.5%',
      trend: 'up' as const,
      description: 'vs last month',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Unique Visitors',
      value: data.totalUniqueVisitors.toLocaleString(),
      icon: Users,
      change: '+8.2%',
      trend: 'up' as const,
      description: 'vs last month',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Avg Clicks/Day',
      value: data.avgClicksPerDay.toString(),
      icon: Activity,
      change: '+5.1%',
      trend: 'up' as const,
      description: 'vs last month',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Conversion Rate',
      value: `${data.conversionRate}%`,
      icon: TrendingUp,
      change: '-2.1%',
      trend: 'down' as const,
      description: 'vs last month',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      title: 'Total Links',
      value: data.totalLinks.toString(),
      icon: Link,
      change: '+3',
      trend: 'up' as const,
      description: 'new this month',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50 dark:bg-pink-950/20',
      iconColor: 'text-pink-600 dark:text-pink-400',
    },
    {
      title: 'Active Links',
      value: data.activeLinks.toString(),
      icon: Activity,
      change: `${((data.activeLinks / data.totalLinks) * 100).toFixed(1)}%`,
      trend: 'up' as const,
      description: 'success rate',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <Card 
            key={index} 
            className="group relative overflow-hidden border-0 bg-white dark:bg-gray-900/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Icon Background */}
            <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`h-6 w-6 ${card.iconColor}`} />
            </div>

            <CardHeader className="relative pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {card.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative pt-0">
              <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-3">
                {card.value}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <TrendIcon 
                    className={`h-4 w-4 ${
                      card.trend === 'up' 
                        ? 'text-emerald-500 dark:text-emerald-400' 
                        : 'text-red-500 dark:text-red-400'
                    }`} 
                  />
                  <span 
                    className={`text-sm font-medium ${
                      card.trend === 'up' 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {card.change}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {card.description}
                </span>
              </div>

              {/* Animated progress bar */}
              <div className="mt-3 w-full bg-muted/30 rounded-full h-1">
                <div 
                  className={`h-1 bg-gradient-to-r ${card.color} rounded-full transition-all duration-1000 ease-out group-hover:w-full`}
                  style={{ 
                    width: card.trend === 'up' ? '75%' : '45%',
                    animationDelay: `${index * 100}ms`
                  }}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// Export as both default and named export
export default AnalyticsOverviewCards;
export { AnalyticsOverviewCards };
