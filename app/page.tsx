"use client"
import { DataTable } from '@/components/DataTable';
import Footer from '@/components/Footer';
import LinkShortenerInput from '@/components/LinkShortnerInput';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Copy, Link, QrCode, Unlink } from 'lucide-react';
import React from 'react';
type ShortUrl =  {
  id : number;
  originalUrl : string;
  shortUrl : string;
  createdAt : string;
  updatedAt : string;
  clicks : number;
  active ?: boolean;
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
      clicks: 122,
      active : true
    },
    {
      id : 2,
      originalUrl : 'https://facebook.com',
      shortUrl : 'https://cutlink.com/xyz',
      createdAt : '2021-07-01',
      updatedAt : '2021-07-01',
      clicks : 10,
      active : false
    },
    {
      id : 1,
      originalUrl : 'https://youtube.com',
      shortUrl : 'https://cutlink.com/abc',
      createdAt : '2021-07-01',
      updatedAt : '2021-07-01',
      clicks: 122,
      active : true
    },
    {
      id : 2,
      originalUrl : 'https://facebook.com',
      shortUrl : 'https://cutlink.com/xyz',
      createdAt : '2021-07-01',
      updatedAt : '2021-07-01',
      clicks : 10,
      active : false
    },
    {
      id : 1,
      originalUrl : 'https://youtube.com',
      shortUrl : 'https://cutlink.com/abc',
      createdAt : '2021-07-01',
      updatedAt : '2021-07-01',
      clicks: 122,
      active : true
    },
    {
      id : 2,
      originalUrl : 'https://facebook.com',
      shortUrl : 'https://cutlink.com/xyz',
      createdAt : '2021-07-01',
      updatedAt : '2021-07-01',
      clicks : 10,
      active : false
    }
  ]

  const column : ColumnDef<ShortUrl>[] = [
    {
      accessorKey : 'shortUrl',
      // header : 'Short URL',
      header : () => <div className='ml-2 font-semibold'>Short URL</div>,
      cell : ({row}) => {
        const data = row.getValue('shortUrl') as string
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
      
      header : () => <div className='ml-6 font-semibold'>Original URL</div>,
      cell : ({row}) => {
        const data = row.getValue('originalUrl') as string;
        return (
          <div className='flex items-center'>
            <Link className='text-blue-500 mx-2' size={'16px'} />
            <div className='text-neutral-400'>{data}</div>
          </div>
        )
      }
    },
    {
      accessorKey : 'qrCode',
      header : 'QR Code',
      cell : ({ }) => {
        return (
          // 
          <div className='flex items-center'>
            <QrCode className='text-neutral-400'/>
          </div>
          // 
        )
      }
    },
    {
      accessorKey : 'clicks',
      header : 'Clicks',
    },
    {
      accessorKey : 'active',
      header : 'Status',
      cell : ({row}) => {
        const data = row.getValue('active') as boolean;
        return (
          <div className='flex items-center'>
            <div className={`rounded-full ml-2 p-1 ${data ? 'bg-green-900 bg-opacity-30 dark:bg-green-600 dark:bg-opacity-30' : 'bg-amber-900 bg-opacity-25 dark:bg-amber-600 dark:bg-opacity-25'}`}>
              {data ? <Link className='dark:text-green-300 text-green-600 p-1'/> : <Unlink className='dark:text-amber-400 text-amber-600 p-1'/>}
            </div>  
            <div className={`ml-2 ${data ? 'dark:text-green-300 text-green-600': 'dark:text-amber-400 text-amber-600'}`}>{data ? 'Active' : 'Inactive'}</div>
          </div>
        )
      }
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
        <h1 className='text-4xl pb-1 md:text-5xl mx-5  lg:text-6xl font-bold text-center mt-6 md:mt-20   text-transparent bg-clip-text bg-gradient-to-r from-blue-600 from-15% via-pink-500 via-50% to-blue-500 to-85%'>
          {`Shorten Your Loooong Links :)`}
        </h1>
        <p className='text-center mt-6 mx-7 text-base font-mono text-neutral-400'>Briefly is an efficiently and easy-to-use URL shortening service.</p>
        <LinkShortenerInput />
        <div className='w-3/4 mx-auto mt-12'>
          <DataTable  columns={column} data={rowData} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
