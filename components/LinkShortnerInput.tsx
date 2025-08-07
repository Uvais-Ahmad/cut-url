import { Link, MoveRight } from 'lucide-react'
import React, { useState } from 'react'
import { Switch } from './ui/switch'
import { Label } from '@radix-ui/react-label'
import { Button } from './ui/button'
import { createShortUrl } from '@/lib/api'
import { toast } from 'sonner'

interface LinkShortenerInputProps {
  onUrlCreated?: () => void;
}

function LinkShortenerInput({ onUrlCreated }: LinkShortenerInputProps) {
    const [url, setUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [autoPaste, setAutoPaste] = useState(false)

    const validateUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    const handleShortenUrl = async () => {
        if (!url.trim()) {
            toast.error('Please enter a URL');
            return;
        }

        if (!validateUrl(url)) {
            toast.error('Please enter a valid URL');
            return;
        }

        setIsLoading(true);
        
        try {
            const response = await createShortUrl(url);

            if (response?.shortUrl) {
                toast.success('URL shortened successfully!');
                setUrl(''); // Clear input
                onUrlCreated?.(); // Refresh the list
            } else {
                toast.error('Failed to shorten URL');
            }
        } catch (error) {
            console.error('Error shortening URL:', error);
            toast.error('Failed to shorten URL. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoading) {
            handleShortenUrl();
        }
    }

    return (
        <div className='h-full'>
            <div className='w-3/4 mt-10 relative flex mx-auto md:w-2/4 lg:w-2/5'>
                <Link className='absolute text-neutral-500 left-4 top-4 sm:left-5 sm:top-5 z-10' size={20} />
                <input 
                    className='w-full rounded-full dark:bg-neutral-900 border-4 p-4 pl-12 sm:p-4 sm:pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                    type='text' 
                    placeholder='Paste your link here'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                />
                <Button 
                    className='bg-blue-500 hidden w-32 px-6 h-12 rounded-full absolute right-2 top-2 text-white p-3 sm:block sm:p-4 hover:bg-blue-400 disabled:cursor-not-allowed'
                    onClick={handleShortenUrl}
                    disabled={isLoading || !url.trim()}
                >
                    {isLoading ? 'Shortening...' : 'Shorten Now'}
                </Button>
                <Button 
                    className='bg-blue-500 w-12 absolute text-center right-2 top-2 h-12 text-white rounded-full block sm:hidden disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={handleShortenUrl}
                    disabled={isLoading || !url.trim()}
                >
                    <MoveRight size={16} />
                </Button>
            </div>

            <div className="flex items-center justify-center mt-6">
                <Switch 
                    id="auto-paste" 
                    className='bg-white'
                    checked={autoPaste}
                    onCheckedChange={setAutoPaste}
                />
                <Label htmlFor="auto-paste" className='text-neutral-500 mx-4 cursor-pointer'>
                    Auto Paste from Clipboard
                </Label>
            </div>
        </div>
    )
}

export default LinkShortenerInput