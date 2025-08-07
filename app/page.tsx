"use client"
import CopyToClipboard from '@/components/CopyToClipboard';
import { DataTable } from '@/components/DataTable';
import Footer from '@/components/Footer';
import LinkShortenerInput from '@/components/LinkShortnerInput';
import NavBar from '@/components/NavBar';
import { getShortUrl } from '@/lib/api';
import { ShortUrlsProps } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Link, QrCode, Unlink, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';


const DUMMY_DATA: ShortUrlsProps[] = [
  {
    id: '1',
    originalUrl: 'https://youtube.com/dfbnjdsf/dfdsyiue/asdfercr',
    shortUrl: 'https://cutlink.com/abcmnpe',
    createdAt: '2021-07-01',
    updatedAt: '2021-07-01',
    clicks: 122,
    active: true
  },
  {
    id: '2',
    originalUrl: 'https://facebook.com/page/example',
    shortUrl: 'https://cutlink.com/xyzmnpe',
    createdAt: '2021-07-01',
    updatedAt: '2021-07-01',
    clicks: 10,
    active: false
  },
  {
    id: '3',
    originalUrl: 'https://facebook.com/page/example',
    shortUrl: 'https://cutlink.com/xyzmnpe',
    createdAt: '2021-07-01',
    updatedAt: '2021-07-01',
    clicks: 10,
    active: false
  }
]

// Public Home Page (for non-authenticated users) // // //
export default function Home() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<ShortUrlsProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!session;
  const isSessionLoading = status === 'loading';

  const fetchShortUrl = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getShortUrl();
      
      if (response.data?.shortUrls?.length) {
        setData(response.data.shortUrls);
      } else {
        // Use dummy data for demonstration
        setData(DUMMY_DATA);
      }
    } catch (err) {
      console.error('Error fetching URLs:', err);
      setError('Failed to load URLs');
      setData(DUMMY_DATA); // Fallback to dummy data
      toast.error('Failed to load your URLs. Showing sample data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShortUrl();
  }, [fetchShortUrl]);

  const handleRefresh = useCallback(() => {
    fetchShortUrl();
  }, [fetchShortUrl]);

  const columns: ColumnDef<ShortUrlsProps>[] = [
    {
      accessorKey: 'shortUrl',
      header: () => <div className='font-semibold text-left'>Short URL</div>,
      cell: ({ row }) => {
        const data = row.getValue('shortUrl') as string;
        return (
          <div className='flex items-center min-w-0'>
            <div className='text-neutral-400 truncate flex-1 mr-2' title={data}>
              {data}
            </div>
            <CopyToClipboard>
              {data}
            </CopyToClipboard>
          </div>
        );
      }
    },
    {
      accessorKey: 'originalUrl',
      header: () => <div className='font-semibold text-left'>Original URL</div>,
      cell: ({ row }) => {
        const data = row.getValue('originalUrl') as string;
        return (
          <div className='flex items-center min-w-0'>
            <Link className='text-blue-500 mr-2 flex-shrink-0' size={16} />
            <p className='text-neutral-400 truncate flex-1' title={data}>
              {data}
            </p>
          </div>
        );
      }
    },
    {
      accessorKey: 'qrCode',
      header: () => <div className='font-semibold text-center'>QR Code</div>,
      cell: () => {
        return (
          <div className='flex items-center justify-center'>
            <QrCode className='text-neutral-400 cursor-pointer hover:text-blue-500 transition-colors' size={20} />
          </div>
        );
      }
    },
    {
      accessorKey: 'clicks',
      header: () => <div className='font-semibold text-center'>Clicks</div>,
      cell: ({ row }) => {
        const clicks = row.getValue('clicks') as number;
        return (
          <div className='font-medium text-center'>
            {clicks.toLocaleString()}
          </div>
        );
      }
    },
    {
      accessorKey: 'active',
      header: () => <div className='font-semibold text-center'>Status</div>,
      cell: ({ row }) => {
        const isActive = row.getValue('active') as boolean;
        return (
          <div className='flex items-center justify-center'>
            <div className={`rounded-full p-1 ${
              isActive 
                ? 'bg-green-900 bg-opacity-30 dark:bg-green-600 dark:bg-opacity-30' 
                : 'bg-amber-900 bg-opacity-25 dark:bg-amber-600 dark:bg-opacity-25'
            }`}>
              {isActive ? (
                <Link className='dark:text-green-300 text-green-600' size={12} />
              ) : (
                <Unlink className='dark:text-amber-400 text-amber-600' size={12} />
              )}
            </div>
            <div className={`ml-1 text-xs hidden md:block ${
              isActive 
                ? 'dark:text-green-300 text-green-600' 
                : 'dark:text-amber-400 text-amber-600'
            }`}>
              {isActive ? 'Active' : 'Inactive'}
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'createdAt',
      header: () => <div className='font-semibold text-center'>Date</div>,
      cell: ({ row }) => {
        const date = row.getValue('createdAt') as string;
        return (
          <div className='text-sm text-neutral-500 text-center'>
            <div className='hidden sm:block'>
              {new Date(date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: '2-digit'
              })}
            </div>
            <div className='block sm:hidden'>
              {new Date(date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        );
      }
    }
  ];

  if (isLoading || isSessionLoading) {
    return (
      <div className='h-full'>
        <NavBar />
        <div className='flex items-center justify-center min-h-[50vh]'>
          <div className='flex flex-col items-center gap-4'>
            <Loader2 className='animate-spin h-8 w-8 text-blue-500' />
            <p className='text-neutral-500'>
              {isSessionLoading ? 'Checking authentication...' : 'Loading your URLs...'}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='h-full'>
      <NavBar />
      <div className={`${!isAuthenticated ? '' : ''}`}>
        <h1 className='text-4xl pb-1 md:text-5xl mx-5 lg:text-6xl font-bold text-center mt-6 md:mt-20 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 from-15% via-pink-500 via-50% to-blue-500 to-85%'>
          {`Shorten Your Loooong Links :)`}
        </h1>
        <p className='text-center mt-6 mx-7 text-base font-mono text-neutral-400'>
          Briefly is an efficient and easy-to-use URL shortening service.
        </p>
        
        <LinkShortenerInput onUrlCreated={handleRefresh} />

        <div className='w-full max-w-6xl mx-auto mt-12 px-4'>
          {error && (
            <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-4'>
              {error}
            </div>
          )}
          <div className='w-full overflow-hidden'>
            <DataTable 
              columns={columns} 
              data={data} 
              isAuthenticated={isAuthenticated}
              maxRowsForGuest={2}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
