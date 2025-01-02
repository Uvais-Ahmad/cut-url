import { Link, MoveRight } from 'lucide-react'
import React from 'react'
import { Switch } from './ui/switch'
import { Label } from '@radix-ui/react-label'

function LinkShortenerInput() {
    return (
        <div className='h-full'>
            <div className='w-3/4 mt-10 relative flex mx-auto  md:w-2/4 lg:w-2/5'>
                <Link className='absolute text-neutral-500 left-4 top-4 sm:left-5 sm:top-5 ' />
                <input className='w-full rounded-full bg-neutral-900 border-4 p-3 pl-12 sm:p-4 sm:pl-12' type='text' placeholder='Paste your link here' />
                <button className='bg-blue-500 hidden w-30 px-6 rounded-full absolute right-1 top-1 text-white p-3 sm:block sm:p-4'>Shorten Now</button>
                <button className='bg-blue-500 w-15 absolute right-1 top-1 text-white px-6 rounded-full p-3 block sm:hidden sm:p-4'>
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