'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClicksOverTime } from '@/types/analytics';

interface ClicksChartProps {
  data: ClicksOverTime[];
}

function ClicksChart({ data }: ClicksChartProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [RechartsComponents, setRechartsComponents] = useState<any>(null);

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
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Clicks & Visitors Over Time</CardTitle>
          <p className="text-sm text-muted-foreground">
            Track your link performance over the last 30 days
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-muted rounded animate-pulse flex items-center justify-center">
            <div className="text-muted-foreground">Loading chart...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = RechartsComponents;

  return (
    <Card className="col-span-2 group overflow-hidden border-0 bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm transition-all duration-500 hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Clicks & Visitors Over Time
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track your link performance over the last 30 days
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <span className="text-muted-foreground">Clicks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <span className="text-muted-foreground">Visitors</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="strokeClicks" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563eb"/>
                  <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
                <linearGradient id="strokeVisitors" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed"/>
                  <stop offset="100%" stopColor="#8b5cf6"/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                className="stroke-muted/30" 
                vertical={false}
              />
              <XAxis 
                dataKey="date" 
                className="text-xs fill-muted-foreground"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: string) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis 
                className="text-xs fill-muted-foreground" 
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                content={({ active, payload, label }: any) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                        <p className="text-sm font-semibold text-foreground mb-3">
                          {new Date(label).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        <div className="space-y-2">
                          {payload.map((entry: any, index: number) => (
                            <div key={index} className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: entry.stroke }}
                                />
                                <span className="text-sm font-medium text-foreground capitalize">
                                  {entry.dataKey === 'uniqueVisitors' ? 'Visitors' : entry.dataKey}
                                </span>
                              </div>
                              <span className="text-sm font-bold text-foreground">
                                {entry.value.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="url(#strokeClicks)"
                fillOpacity={1}
                fill="url(#colorClicks)"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#ffffff' }}
              />
              <Area
                type="monotone"
                dataKey="uniqueVisitors"
                stroke="url(#strokeVisitors)"
                fillOpacity={1}
                fill="url(#colorVisitors)"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#7c3aed', strokeWidth: 2, stroke: '#ffffff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" 
           style={{ padding: '1px' }}>
        <div className="w-full h-full rounded-lg bg-background" />
      </div>
    </Card>
  );
}

// Export as both default and named export
export default ClicksChart;
export { ClicksChart };
