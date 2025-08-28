'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClicksOverTime } from '@/types/analytics';

interface ClicksChartProps {
  data: ClicksOverTime[];
}

export default function ClicksChart({ data }: ClicksChartProps) {
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
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Clicks & Visitors Over Time</CardTitle>
        <p className="text-sm text-muted-foreground">
          Track your link performance over the last 30 days
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                className="text-xs fill-muted-foreground"
                tick={{ fontSize: 12 }}
                tickFormatter={(value: string) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
              <Tooltip 
                content={({ active, payload, label }: any) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="text-sm font-medium">{new Date(label).toLocaleDateString()}</p>
                        <div className="space-y-1 mt-2">
                          {payload.map((entry: any, index: number) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div 
                                className="w-3 h-3 rounded-sm" 
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="capitalize">{entry.dataKey}: {entry.value}</span>
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
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorClicks)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="uniqueVisitors"
                stroke="hsl(var(--secondary))"
                fillOpacity={1}
                fill="url(#colorVisitors)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Also export as named export for backward compatibility
export { ClicksChart };
