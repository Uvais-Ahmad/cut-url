"use client"
import { DataTable } from '@/components/DataTable';
import LinkShortenerInput from '@/components/LinkShortnerInput';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Copy } from 'lucide-react';
import React from 'react';
import Image from 'next/image'
import getFaviconUrl from '@/lib/getFavicon';
import WebsiteIcon from '@/components/WebsiteIcon';
type ShortUrl =  {
  id : number;
  originalUrl : string;
  shortUrl : string;
  createdAt : string;
  updatedAt : string;
}

// Public Home Page (for non-authenticated users)
export default function Home() {

  const rowData : ShortUrl[] = [
    {
      id : 1,
      originalUrl : 'https://youtube.com',
      shortUrl : 'https://cutlink.com/abc',
      createdAt : '2021-07-01',
      updatedAt : '2021-07-01',
    },
    {
      id : 2,
      originalUrl : 'https://facebook.com',
      shortUrl : 'https://cutlink.com/xyz',
      createdAt : '2021-07-01',
      updatedAt : '2021-07-01',
    }
  ]

  const column : ColumnDef<ShortUrl>[] = [
    {
      accessorKey : 'shortUrl',
      // header : 'Short URL',
      header : () => <div className='ml-2 font-semibold'>Short URL</div>,
      cell : ({row}) => {
        const data = row.getValue('shortUrl')
        return (
          <div className='flex items-center'>
            <div className='text-neutral-400'>{data}</div>
            <Button size={'icon'} className='bg-gray-800 text-white rounded-full hover:bg-gray-700 ml-2'>
              <Copy />
            </Button>
          </div>
        )
      }
    },
    {
      accessorKey : 'originalUrl',
      header : 'Original URL',
      cell : ({row}) => {
        const data = row.getValue('originalUrl');
        const faviconUrl = getFaviconUrl(data);
        return (
          <div className='flex items-center'>
            {/* <WebsiteIcon websiteUrl={data} /> */}
            <div className='text-neutral-400'>{data}</div>
          </div>
        )
      }
    },
    {
      accessorKey : 'qrCode',
      header : 'QR Code',
    },
    {
      accessorKey : 'clicks',
      header : 'Clicks',
    },
    {
      accessorKey : 'status',
      header : 'status',
    },
    {
      accessorKey : 'createdAt',
      header : 'Date',
    }
  ]
  return (
    <div className='h-full'>
      <NavBar />
      <div>
        <h1 className='text-4xl md:text-5xl mx-5  lg:text-6xl font-bold text-center mt-6 md:mt-20   text-transparent bg-clip-text bg-gradient-to-r from-blue-600 from-15% via-pink-500 via-50% to-blue-500 to-85%'>
          {`Shorten Your Loooong Links :)`}
        </h1>
        <p className='text-center mt-6 mx-7 text-base font-mono text-neutral-400'>CutLink is an efficiently and easy-to-use URL shortening service.</p>
        <LinkShortenerInput />
        <div className='w-3/4 mx-auto mt-12'>
          <DataTable  columns={column} data={rowData} />
        </div>
      </div>
    </div>
  );
}
