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
    <div className="space-y-8 p-1">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 border border-blue-100 dark:border-blue-800/30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Comprehensive insights into your link performance with real-time data visualization
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Live Data</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExport}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 border-white/20 dark:border-gray-700/50"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={fetchAnalytics}
                disabled={isRefreshing}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 border-white/20 dark:border-gray-700/50"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 border-white/20 dark:border-gray-700/50"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Last 30 days
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/20 to-cyan-400/20 rounded-full blur-2xl" />
      </div>

      {/* Overview Cards with enhanced spacing */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground mb-4">Performance Overview</h2>
        <AnalyticsOverviewCards data={analyticsData.overview} />
      </div>

      {/* Charts Section with improved layout */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground mb-4">Traffic Analytics</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          <ClicksChart data={analyticsData.clicksOverTime} />
          <TopLinksComponent data={analyticsData.topLinks} />
        </div>
      </div>

      {/* Geographic and Device Analytics with section header */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground mb-4">Audience Insights</h2>
        <GeographicAnalytics 
          geoData={analyticsData.geoData}
          deviceData={analyticsData.deviceData}
          browserData={analyticsData.browserData}
        />
      </div>
    </div>
  );
}
