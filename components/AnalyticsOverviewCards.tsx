import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalyticsOverview } from '@/types/analytics';
import { TrendingUp, TrendingDown, Users, MousePointer, Link, Activity } from 'lucide-react';

interface AnalyticsOverviewCardsProps {
  data: AnalyticsOverview;
}

export function AnalyticsOverviewCards({ data }: AnalyticsOverviewCardsProps) {
  const cards = [
    {
      title: 'Total Clicks',
      value: data.totalClicks.toLocaleString(),
      icon: MousePointer,
      change: '+12.5%',
      trend: 'up' as const,
      description: 'vs last month',
    },
    {
      title: 'Unique Visitors',
      value: data.totalUniqueVisitors.toLocaleString(),
      icon: Users,
      change: '+8.2%',
      trend: 'up' as const,
      description: 'vs last month',
    },
    {
      title: 'Avg Clicks/Day',
      value: data.avgClicksPerDay.toString(),
      icon: Activity,
      change: '+5.1%',
      trend: 'up' as const,
      description: 'vs last month',
    },
    {
      title: 'Conversion Rate',
      value: `${data.conversionRate}%`,
      icon: TrendingUp,
      change: '-2.1%',
      trend: 'down' as const,
      description: 'vs last month',
    },
    {
      title: 'Total Links',
      value: data.totalLinks.toString(),
      icon: Link,
      change: '+3',
      trend: 'up' as const,
      description: 'new this month',
    },
    {
      title: 'Active Links',
      value: data.activeLinks.toString(),
      icon: Activity,
      change: `${((data.activeLinks / data.totalLinks) * 100).toFixed(1)}%`,
      trend: 'up' as const,
      description: 'success rate',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendIcon 
                  className={`h-3 w-3 ${
                    card.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                />
                <span className={card.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {card.change}
                </span>
                <span>{card.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
