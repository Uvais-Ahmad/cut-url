import { NextResponse } from 'next/server';

// For now, let's create a simple session check without importing authOptions
// import { authOptions } from '../auth/[...nextauth]/authOptions';

// Mock analytics data - replace with real database queries
const generateAnalyticsData = () => {
  const now = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      clicks: Math.floor(Math.random() * 100) + 20,
      uniqueVisitors: Math.floor(Math.random() * 80) + 15,
    };
  });

  const topLinks = [
    { shortUrl: 'https://linkly.com/B4eICHhMI', originalUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ', clicks: 1247, growth: 15.3 },
    { shortUrl: 'https://linkly.com/X9fMN2pQR', originalUrl: 'https://github.com/vercel/next.js', clicks: 892, growth: -2.1 },
    { shortUrl: 'https://linkly.com/K8mLp4sVt', originalUrl: 'https://www.figma.com/design-systems', clicks: 634, growth: 8.7 },
    { shortUrl: 'https://linkly.com/P5qRn7wXy', originalUrl: 'https://tailwindcss.com/docs', clicks: 521, growth: 12.4 },
    { shortUrl: 'https://linkly.com/M3hGf6kJl', originalUrl: 'https://react.dev/learn', clicks: 387, growth: 5.9 },
  ];

  const countries = [
    { country: 'United States', clicks: 2156, percentage: 34.2 },
    { country: 'India', clicks: 1432, percentage: 22.7 },
    { country: 'United Kingdom', clicks: 987, percentage: 15.6 },
    { country: 'Germany', clicks: 654, percentage: 10.4 },
    { country: 'Canada', clicks: 432, percentage: 6.8 },
    { country: 'Others', clicks: 651, percentage: 10.3 },
  ];

  const devices = [
    { device: 'Desktop', clicks: 3421, percentage: 54.2 },
    { device: 'Mobile', clicks: 2103, percentage: 33.3 },
    { device: 'Tablet', clicks: 788, percentage: 12.5 },
  ];

  const browsers = [
    { browser: 'Chrome', clicks: 3654, percentage: 57.9 },
    { browser: 'Safari', clicks: 1456, percentage: 23.1 },
    { browser: 'Firefox', clicks: 743, percentage: 11.8 },
    { browser: 'Edge', clicks: 459, percentage: 7.2 },
  ];

  const totalClicks = last30Days.reduce((sum, day) => sum + day.clicks, 0);
  const totalUniqueVisitors = last30Days.reduce((sum, day) => sum + day.uniqueVisitors, 0);
  const avgClicksPerDay = Math.round(totalClicks / 30);
  const conversionRate = ((totalUniqueVisitors / totalClicks) * 100).toFixed(1);

  return {
    overview: {
      totalClicks,
      totalUniqueVisitors,
      avgClicksPerDay,
      conversionRate: parseFloat(conversionRate),
      totalLinks: 47,
      activeLinks: 42,
    },
    clicksOverTime: last30Days,
    topLinks,
    geoData: countries,
    deviceData: devices,
    browserData: browsers,
  };
};

export async function GET() {
  try {
    // For demo purposes, we'll return mock data
    // In a real app, you would check authentication and fetch from database
    
    const analyticsData = generateAnalyticsData();

    return NextResponse.json({
      success: true,
      data: analyticsData,
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
