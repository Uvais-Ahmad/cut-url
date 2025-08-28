export interface AnalyticsOverview {
  totalClicks: number;
  totalUniqueVisitors: number;
  avgClicksPerDay: number;
  conversionRate: number;
  totalLinks: number;
  activeLinks: number;
}

export interface ClicksOverTime {
  date: string;
  clicks: number;
  uniqueVisitors: number;
}

export interface TopLink {
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  growth: number;
}

export interface GeoData {
  country: string;
  clicks: number;
  percentage: number;
}

export interface DeviceData {
  device: string;
  clicks: number;
  percentage: number;
}

export interface BrowserData {
  browser: string;
  clicks: number;
  percentage: number;
}

export interface AnalyticsData {
  overview: AnalyticsOverview;
  clicksOverTime: ClicksOverTime[];
  topLinks: TopLink[];
  geoData: GeoData[];
  deviceData: DeviceData[];
  browserData: BrowserData[];
}
