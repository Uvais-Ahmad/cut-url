"use client"
import { AuthenticatedDataTable } from '@/components/AuthenticatedDataTable';
import LinkShortenerInput from '@/components/LinkShortnerInput'
import NavBar from '@/components/NavBar'
import CompanyFooter from '@/components/CompanyFooter'
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getShortUrl } from '@/lib/api';
import { ShortUrlsProps } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { 
  BarChart3, 
  History, 
  Settings, 
  Filter, 
  Edit3, 
  QrCode, 
  Link, 
  Copy,
  Trash2,
  Eye
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area';
import dynamic from 'next/dynamic';

// Dynamically import AnalyticsDashboard to prevent SSR issues
const AnalyticsDashboard = dynamic(
  () => import('@/components/AnalyticsDashboard').then(mod => ({ default: mod.AnalyticsDashboard })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    )
  }
);

// Dummy data matching the image
const DASHBOARD_DATA: ShortUrlsProps[] = [
  {
    id: '1',
    originalUrl: 'https://www.twitter.com/tweets/status/123',
    shortUrl: 'https://linkly.com/B4eICHhMI',
    createdAt: '2023-10-09',
    updatedAt: '2023-10-09',
    clicks: 1313,
    active: true
  },
  {
    id: '2',
    originalUrl: 'https://www.youtube.com/watch/v=8gZfm0u0eU',
    shortUrl: 'https://linkly.com/B4eICHhMI',
    createdAt: '2023-10-08',
    updatedAt: '2023-10-08',
    clicks: 4313,
    active: false
  },
  {
    id: '3',
    originalUrl: 'https://www.appium.io/getting-started.html',
    shortUrl: 'https://linkly.com/B4eICHhMI',
    createdAt: '2023-10-07',
    updatedAt: '2023-10-07',
    clicks: 1313,
    active: true
  },
  {
    id: '4',
    originalUrl: 'https://www.npmjs.com/package/5x464',
    shortUrl: 'https://linkly.com/B4eICHhMI',
    createdAt: '2023-09-30',
    updatedAt: '2023-09-30',
    clicks: 1313,
    active: true
  },
  {
    id: '5',
    originalUrl: 'https://www.appium.io/getting-started/foo',
    shortUrl: 'https://linkly.com/B4eICHhMI',
    createdAt: '2023-09-18',
    updatedAt: '2023-09-18',
    clicks: 1423,
    active: true
  },
  {
    id: '6',
    originalUrl: 'https://www.newsthatmatters.com',
    shortUrl: 'https://linkly.com/B4eICHhMI',
    createdAt: '2023-09-01',
    updatedAt: '2023-09-01',
    clicks: 3733,
    active: true
  },
  {
    id: '7',
    originalUrl: 'https://www.twitter.com/tweets/status/foo',
    shortUrl: 'https://linkly.com/B4eICHhMI',
    createdAt: '2023-10-09',
    updatedAt: '2023-10-09',
    clicks: 1313,
    active: true
  },
  {
    id: '8',
    originalUrl: 'https://www.youtube.com/watch/v=8gZfm0u',
    shortUrl: 'https://linkly.com/B4eICHhMI',
    createdAt: '2023-10-08',
    updatedAt: '2023-10-08',
    clicks: 4313,
    active: false
  }
];

// Home Page (for authenticated users)
function MainHomePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [reRender, setReRender] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState('history');
    const [data, setData] = useState<ShortUrlsProps[]>(DASHBOARD_DATA); // Start with dummy data
    const [isLoading, setIsLoading] = useState(false); // Don't show loading initially

    // Prevent hydration mismatch by only mounting after client-side load
    // (Removed for better performance - using suppressHydrationWarning in providers instead)

    // Fetch data
    const fetchShortUrl = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getShortUrl();
            const responseData = response?.data?.shortUrls as ShortUrlsProps[];
            
            if (responseData?.length) {
                setData(responseData);
            }
            // If no data from API, keep dummy data (don't set it again)
        } catch (error) {
            console.error('Error fetching URLs:', error);
            // Keep dummy data on error
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (session) {
            fetchShortUrl();
        }
    }, [fetchShortUrl, session, reRender]);

    const handleRefresh = useCallback(() => {
        setReRender(prev => !prev);
    }, []);

    // Redirect if not authenticated - only after component is mounted
    useEffect(() => {
        if (status !== 'loading' && !session) {
            router.push('/');
        }
    }, [session, status, router]);

    // Show loading state during authentication check
    if (status === 'loading') {
        return (
            <div className='h-screen flex items-center justify-center'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
                    <p className='text-neutral-500'>Loading...</p>
                </div>
            </div>
        );
    }

    // Show loading state if redirecting
    if (!session) {
        return (
            <div className='h-screen flex items-center justify-center'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
                    <p className='text-neutral-500'>Redirecting...</p>
                </div>
            </div>
        );
    }

    // Enhanced column definitions for the dashboard
    const columns: ColumnDef<ShortUrlsProps>[] = [
        {
            accessorKey: 'shortUrl',
            header: () => <div className='font-medium text-left'>Short Link</div>,
            cell: ({ row }) => {
                const data = row.getValue('shortUrl') as string;
                const domain = new URL(data).hostname;
                return (
                    <div className='flex items-center space-x-3'>
                        <div className='w-6 h-6 rounded-sm bg-blue-100 dark:bg-blue-900 flex items-center justify-center'>
                            <Link className='w-3 h-3 text-blue-600' />
                        </div>
                        <div className='flex flex-col min-w-0'>
                            <div className='font-medium text-sm truncate' title={data}>
                                {data.split('/').pop()}
                            </div>
                            <div className='text-xs text-muted-foreground'>
                                {domain}
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Copy className='w-4 h-4' />
                        </Button>
                    </div>
                );
            }
        },
        {
            accessorKey: 'originalUrl',
            header: () => <div className='font-medium text-left'>Original Link</div>,
            cell: ({ row }) => {
                const data = row.getValue('originalUrl') as string;
                const favicon = `https://www.google.com/s2/favicons?domain=${new URL(data).hostname}&sz=16`;
                return (
                    <div className='flex items-center space-x-3'>
                        <img 
                            src={favicon} 
                            alt="" 
                            width={16}
                            height={16}
                            className='w-4 h-4 rounded-sm'
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                        <div className='truncate max-w-[300px]' title={data}>
                            {data}
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: 'qrCode',
            header: () => <div className='font-medium text-center'>QR Code</div>,
            cell: () => {
                return (
                    <div className='flex justify-center'>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <QrCode className='w-4 h-4 text-muted-foreground hover:text-foreground' />
                        </Button>
                    </div>
                );
            }
        },
        {
            accessorKey: 'clicks',
            header: () => <div className='font-medium text-center'>Clicks</div>,
            cell: ({ row }) => {
                const clicks = row.getValue('clicks') as number;
                return (
                    <div className='text-center font-medium'>
                        {clicks.toLocaleString()}
                    </div>
                );
            }
        },
        {
            accessorKey: 'active',
            header: () => <div className='font-medium text-center'>Status</div>,
            cell: ({ row }) => {
                const isActive = row.getValue('active') as boolean;
                return (
                    <div className='flex justify-center'>
                        <Badge 
                            variant={isActive ? "default" : "secondary"}
                            className={`${
                                isActive 
                                    ? 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100' 
                                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100'
                            }`}
                        >
                            {isActive ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>
                );
            }
        },
        {
            accessorKey: 'createdAt',
            header: () => <div className='font-medium text-center'>Date ↓</div>,
            cell: ({ row }) => {
                const date = row.getValue('createdAt') as string;
                return (
                    <div className='text-center text-sm text-muted-foreground'>
                        {new Date(date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </div>
                );
            }
        },
        {
            id: 'actions',
            header: () => <div className='font-medium text-center'>Actions</div>,
            cell: () => {
                return (
                    <div className='flex justify-center space-x-1'>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit3 className='w-4 h-4' />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className='w-4 h-4' />
                        </Button>
                    </div>
                );
            }
        }
    ];

    if (isLoading) {
        return (
            <div className='min-h-screen bg-background'>
                <NavBar />
                <div className='flex items-center justify-center h-96'>
                    <div className='text-center'>
                        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
                        <p className='mt-4 text-muted-foreground'>Loading dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!session) {
        return null; // Will redirect
    }

    return (
        <>
            <div className='min-h-screen bg-background'>
                <NavBar />
                
                {/* Header Section */}
                <div className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                    <div className='container mx-auto px-6 py-6'>
                        <LinkShortenerInput onUrlCreated={handleRefresh} />
                    </div>
                </div>

                {/* Main Dashboard */}
                <div className='container mx-auto px-6 py-6'>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <div className='flex items-center justify-between mb-6'>
                            <TabsList className="grid w-auto grid-cols-4">
                                <TabsTrigger value="history" className="flex items-center gap-2">
                                    <History className='w-4 h-4' />
                                    History
                                </TabsTrigger>
                                <TabsTrigger value="statistics" className="flex items-center gap-2">
                                    <BarChart3 className='w-4 h-4' />
                                    Statistics
                                </TabsTrigger>
                                <TabsTrigger value="stream" className="flex items-center gap-2">
                                    <Eye className='w-4 h-4' />
                                    Click Stream
                                </TabsTrigger>
                                <TabsTrigger value="settings" className="flex items-center gap-2">
                                    <Settings className='w-4 h-4' />
                                    Settings
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="history" className="space-y-4">
                            {/* History Header */}
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <h2 className='text-lg font-semibold'>
                                        History ({data.length})
                                    </h2>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                                        <Edit3 className='w-4 h-4' />
                                        Bulk Edit
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                                        <Filter className='w-4 h-4' />
                                        Filter
                                    </Button>
                                </div>
                            </div>

                            {/* Enhanced Data Table */}
                            <div className='border rounded-lg bg-card'>
                                <ScrollArea className="h-[600px]">
                                    <AuthenticatedDataTable 
                                        columns={columns} 
                                        data={data}
                                    />
                                </ScrollArea>
                            </div>
                        </TabsContent>

                        <TabsContent value="statistics" className="space-y-4">
                            <AnalyticsDashboard />
                        </TabsContent>

                        <TabsContent value="stream" className="space-y-4">
                            <div className='text-center py-12'>
                                <Eye className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                                <h3 className='text-lg font-semibold mb-2'>Click Stream Coming Soon</h3>
                                <p className='text-muted-foreground'>Real-time click tracking and user behavior.</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="settings" className="space-y-4">
                            <div className='text-center py-12'>
                                <Settings className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                                <h3 className='text-lg font-semibold mb-2'>Settings Coming Soon</h3>
                                <p className='text-muted-foreground'>Customize your dashboard and preferences.</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <CompanyFooter />
        </>
    );
}

export default MainHomePage