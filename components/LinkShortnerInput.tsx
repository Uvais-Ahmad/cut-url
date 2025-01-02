import { Link, MoveRight } from 'lucide-react'
import React from 'react'
import { Switch } from './ui/switch'
import { Label } from '@radix-ui/react-label'

function LinkShortenerInput() {
    return (
        <div className='h-full'>
            <div className='w-3/4  md:w-2/4 lg:w-2/5 mt-10 relative flex mx-auto'>
                <Link className='absolute left-5 top-5 text-neutral-500' />
                <input className='w-full p-4 rounded-full bg-neutral-900 border-4 pl-12' type='text' placeholder='Paste your link here' />
                <button className='bg-blue-500 hidden sm:block w-30  absolute right-1 top-1 text-white p-4 px-6 rounded-full'>Shorten Now</button>
                <button className='bg-blue-500 block sm:hidden w-15 absolute right-1 top-1 text-white p-4 px-6 rounded-full'>
                    <MoveRight/>
                </button>
            </div>

            <div className="flex items-center justify-center mt-6">
                <Switch id="auto-paste" className='bg-white'/>
                <Label htmlFor="auto-paste" className='text-neutral-500 mx-4'>Auto Paste from Clipboard</Label>
            </div>
        </div>
    )
}

export default LinkShortenerInput