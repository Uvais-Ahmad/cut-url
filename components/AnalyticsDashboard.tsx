'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnalyticsData } from '@/types/analytics';
import { AnalyticsOverviewCards } from './AnalyticsOverviewCards';
import { TopLinksComponent } from './TopLinksComponent';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { RefreshCw, Download, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { AnalyticsLoadingSkeleton } from './AnalyticsLoadingSkeleton';

// Dynamic imports for chart components to avoid SSR issues
const ClicksChart = dynamic(() => import('./ClicksChart'), {
  ssr: false,
  loading: () => (
    <Card className="col-span-2">
      <CardContent className="p-6">
        <div className="h-[300px] bg-muted rounded animate-pulse" />
      </CardContent>
    </Card>
  )
});

const GeographicAnalytics = dynamic(() => import('./GeographicAnalytics'), {
  ssr: false,
  loading: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="h-[200px] bg-muted rounded animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
});

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAnalytics = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch('/api/analytics');
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      const result = await response.json();
      setAnalyticsData(result.data);
      toast.success('Analytics updated successfully');
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleExport = () => {
    toast.info('Export functionality coming soon!');
  };

  if (isLoading) {
    return <AnalyticsLoadingSkeleton />;
  }

  if (!analyticsData) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <p className="text-muted-foreground">No analytics data available</p>
            <Button 
              onClick={fetchAnalytics} 
              variant="outline" 
              className="mt-4"
              disabled={isRefreshing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive insights into your link performance
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={fetchAnalytics}
            disabled={isRefreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <AnalyticsOverviewCards data={analyticsData.overview} />

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <ClicksChart data={analyticsData.clicksOverTime} />
        <TopLinksComponent data={analyticsData.topLinks} />
      </div>

      {/* Geographic and Device Analytics */}
      <GeographicAnalytics 
        geoData={analyticsData.geoData}
        deviceData={analyticsData.deviceData}
        browserData={analyticsData.browserData}
      />
    </div>
  );
}
