"use client"
import CopyToClipboard from '@/components/CopyToClipboard';
import { DataTable } from '@/components/DataTable';
import LinkShortenerInput from '@/components/LinkShortnerInput'
import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { getShortUrl } from '@/lib/api';
import { ShortUrlsProps } from '@/types';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { ColumnDef } from '@tanstack/react-table';
import { BarChart2, Clock, Link, LinkIcon, ListFilterPlus, ListTodo, QrCode, Settings, Unlink } from 'lucide-react';
import React, { useEffect, useState } from 'react'

// Home Page (for authenticated users)
function MainHomePage() {
    const [reRender, setReRender] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState('history');
    
    const [data, setData] = useState<ShortUrlsProps[]>([]);
    const fetchShortUrl = async () => {
        const response = await getShortUrl();
        const data =  response?.data?.shortUrls as ShortUrlsProps[];
        if(data.length) {
            setData(data);
        }   
    }

    useEffect(() => {
        console.log('fetching data', reRender);
        fetchShortUrl();  
    }, [reRender]);

  const column : ColumnDef<ShortUrlsProps>[] = [
    {
      accessorKey : 'shortUrl',
      // header : 'Short URL',
      header : () => <div className='ml-2 font-semibold'>Short URL</div>,
      cell : ({row}) => {
        const data = row.getValue('shortUrl') as string
        return (
          <div className='flex items-center'>
            <div className='text-neutral-400'>{data}</div>
            <CopyToClipboard>
              {data}
            </CopyToClipboard>
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
            <p className='text-neutral-400 truncate md:w-48'>{data}</p>
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
            <div className='h-full'>
                <LinkShortenerInput 
                    setReRender={setReRender}
                />            

                {/* Tabs */}
                <div className='min-h-screen '>
                    <div className='container mx-auto py-6'>
                        <Tabs defaultValue="history" className="w-full" onValueChange={setActiveTab}>
                            <TabsList className="w-full flex justify-center bg-transparent p-0 bg-gray-50 dark:bg-neutral-900 shadow">
                                <TabsTrigger
                                    value="history"
                                    className={`flex items-center gap-2 rounded-none border-b-2 px-8 py-4 ${activeTab === "history" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-400"}`}
                                >
                                    <Clock className="h-4 w-4" />
                                    History
                                </TabsTrigger>
                                <TabsTrigger
                                    value="statistics"
                                    className={`flex items-center gap-2 rounded-none border-b-2 px-4 py-4 ${activeTab === "statistics" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-400"}`}
                                >
                                    <BarChart2 className="h-4 w-4" />
                                    Statistics
                                </TabsTrigger>
                                <TabsTrigger
                                    value="clickstream"
                                    className={`flex items-center gap-2 rounded-none border-b-2 px-4 py-4 ${activeTab === "clickstream" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-400"}`}
                                >
                                    <LinkIcon className="h-4 w-4" />
                                    Click Stream
                                </TabsTrigger>
                                <TabsTrigger
                                    value="settings"
                                    className={`flex items-center gap-2 rounded-none border-b-2 px-4 py-4 ${activeTab === "settings" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-400"}`}
                                >
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="history" className='w-2/3 mx-auto'>
                                <div className='flex justify-between items-center'>
                                    <h2>History (143)</h2>
                                    <div className='flex justify-center items-center ml-auto'>
                                        <Button variant='outline' className='mx-1'>
                                            <ListTodo className='mr-2' />
                                            Bulk Edit
                                        </Button>
                                        <Button variant='outline' className='mx-1'>
                                            <ListFilterPlus className='mr-2' />
                                            Filters
                                        </Button>
                                    </div>
                                </div>

                                <div className='w-full mt-4'>
                                    <DataTable columns={column} data={data} />
                                </div>
                            </TabsContent>

                            <TabsContent value="statistics" className="mt-6">
                                <div className="flex items-center justify-center h-64 bg-neutral-950 rounded-lg">
                                    <p className="text-gray-400">Statistics content will appear here</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="clickstream" className="mt-6">
                                <div className="flex items-center justify-center h-64 bg-neutral-950 rounded-lg">
                                    <p className="text-gray-400">Click Stream content will appear here</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="settings" className="mt-6">
                                <div className="flex items-center justify-center h-64 bg-neutral-950 rounded-lg">
                                    <p className="text-gray-400">Settings content will appear here</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainHomePage