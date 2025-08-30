'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GeoData, DeviceData, BrowserData } from '@/types/analytics';

interface GeographicAnalyticsProps {
  geoData: GeoData[];
  deviceData: DeviceData[];
  browserData: BrowserData[];
}

const COLORS = [
  '#3b82f6', // Blue
  '#10b981', // Emerald  
  '#8b5cf6', // Purple
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#06b6d4', // Cyan
  '#ec4899', // Pink
  '#84cc16'  // Lime
];

function GeographicAnalytics({ geoData, deviceData, browserData }: GeographicAnalyticsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [RechartsComponents, setRechartsComponents] = useState<typeof import('recharts') | null>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Dynamically import Recharts only on client side
    const loadRecharts = async () => {
      try {
        const recharts = await import('recharts');
        setRechartsComponents(recharts);
      } catch (error) {
        console.error('Failed to load Recharts:', error);
      }
    };
    
    loadRecharts();
  }, []);

  if (!isMounted || !RechartsComponents) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="group overflow-hidden border-0 bg-white dark:bg-gray-900/50 shadow-lg backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Loading...</CardTitle>
              <p className="text-sm text-muted-foreground">Preparing analytics data</p>
            </CardHeader>
            <CardContent>
              <div className="h-[240px] bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl animate-pulse flex items-center justify-center">
                <div className="text-muted-foreground text-sm">Loading chart...</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } = RechartsComponents;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Geographic Distribution */}
      <Card className="group overflow-hidden border-0 bg-white dark:bg-gray-900/50 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="relative pb-4">
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Geographic Distribution
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Where your visitors are from
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={geoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="clicks"
                >
                  {geoData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={(props) => {
                    const { active, payload } = props;
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-xl">
                          <p className="font-semibold text-foreground">{data.country}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: payload[0].fill }}
                            />
                            <span className="text-sm text-muted-foreground">
                              {data.clicks.toLocaleString()} clicks ({data.percentage}%)
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {geoData.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-xs text-muted-foreground truncate">
                  {item.country}
                </span>
                <span className="text-xs font-medium ml-auto">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Device Types */}
      <Card className="group overflow-hidden border-0 bg-white dark:bg-gray-900/50 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="relative pb-4">
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Device Types
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            How users access your links
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceData} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                <XAxis 
                  dataKey="device" 
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  content={(props) => {
                    const { active, payload, label } = props;
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-xl">
                          <p className="font-semibold text-foreground">{label}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                            <span className="text-sm text-muted-foreground">
                              {payload[0].value?.toLocaleString()} clicks
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="clicks" 
                  radius={[8, 8, 0, 0]}
                  fill="url(#deviceGradient)"
                />
                <defs>
                  <linearGradient id="deviceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {deviceData.map((item, index) => (
              <div key={index} className="text-center p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20">
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {item.percentage}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.device}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Browser Types */}
      <Card className="group overflow-hidden border-0 bg-white dark:bg-gray-900/50 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="relative pb-4">
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Browser Types
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Browser preferences of your visitors
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={browserData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="clicks"
                >
                  {browserData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[(index + 2) % COLORS.length]}
                      stroke={COLORS[(index + 2) % COLORS.length]}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={(props) => {
                    const { active, payload } = props;
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-xl">
                          <p className="font-semibold text-foreground">{data.browser}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: payload[0].fill }}
                            />
                            <span className="text-sm text-muted-foreground">
                              {data.clicks.toLocaleString()} clicks ({data.percentage}%)
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="mt-4 space-y-2">
            {browserData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[(index + 2) % COLORS.length] }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {item.browser}
                  </span>
                </div>
                <span className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Export as both default and named export
export default GeographicAnalytics;
export { GeographicAnalytics };
