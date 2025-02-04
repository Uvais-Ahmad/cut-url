import { Copy, Link, MoveRight } from 'lucide-react'
import React, { useState } from 'react'
import { Switch } from './ui/switch'
import { Label } from '@radix-ui/react-label'
import { Button } from './ui/button'
import { createShortUrl } from '@/lib/api'

function LinkShortenerInput() {
    const [originalUrl, setOriginalUrl] = useState<string| ''>('');
    const [shortUrl, setShortUrl] = useState<string| ''>('');

    const handleSubmit = async () => {
        console.log("Original Url : ",originalUrl);
        const data = await createShortUrl(originalUrl);
        setShortUrl(data.shortUrl);
    }

    return (
        <div className='h-full'>
            <div className='w-3/4 mt-10 relative flex mx-auto  md:w-2/4 lg:w-2/5'>
                <Link className='absolute text-neutral-500 left-4 top-4 sm:left-5 sm:top-5 ' />
                <input 
                    className='w-full rounded-full dark:bg-neutral-900 border-4 p-4 pl-12 sm:p-4 sm:pl-12' 
                    type='text' 
                    placeholder='Paste your link here' 
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                />
                <Button 
                    className='bg-blue-500 hidden w-30 lg:32 px-6 h-12 rounded-full absolute right-2 top-2 text-white p-3 sm:block sm:p-4 hover:bg-blue-400'
                    onClick={handleSubmit}>
                    Shorten Now
                </Button>
                <Button 
                    className='bg-blue-500 w-12 absolute text-center right-2 top-2 h-12 text-white rounded-full block sm:hidden'
                    onClick={handleSubmit}>
                    <MoveRight/>
                </Button>
            </div>

            <div className="flex items-center justify-center mt-6">
                <Switch id="auto-paste" className='bg-white'/>
                <Label htmlFor="auto-paste" className='text-neutral-500 mx-4'>Auto Paste from Clipboard</Label>
            </div>

            {shortUrl && (
                <div className='flex items-center mt-6 dark:bg-neutral-900 border-1 w-1/4 mx-auto rounded-lg p-2 px-6'>
                    <div className='flex items-center'>
                        <div className='w-2 h-2 bg-green-500 rounded-full mr-2'></div>
                        <div className='text-neutral-400'>{shortUrl}</div>
                        <Button size={'icon'} className='bg-gray-800 text-white rounded-full hover:bg-gray-700 ml-8'>
                            <Copy />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LinkShortenerInput