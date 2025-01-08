import { Link, MoveRight } from 'lucide-react'
import React from 'react'
import { Switch } from './ui/switch'
import { Label } from '@radix-ui/react-label'
import { Button } from './ui/button'

function LinkShortenerInput() {
    return (
        <div className='h-full'>
            <div className='w-3/4 mt-10 relative flex mx-auto  md:w-2/4 lg:w-2/5'>
                <Link className='absolute text-neutral-500 left-4 top-4 sm:left-5 sm:top-5 ' />
                <input className='w-full rounded-full bg-neutral-900 border-4 p-4 pl-12 sm:p-4 sm:pl-12' type='text' placeholder='Paste your link here' />
                <Button className='bg-blue-500 hidden w-30 lg:32 px-6 h-12 rounded-full absolute right-2 top-2 text-white p-3 sm:block sm:p-4'>Shorten Now</Button>
                <Button className='bg-blue-500 w-12 absolute text-center right-2 top-2 h-12 text-white rounded-full block sm:hidden'>
                    <MoveRight/>
                </Button>
            </div>

            <div className="flex items-center justify-center mt-6">
                <Switch id="auto-paste" className='bg-white'/>
                <Label htmlFor="auto-paste" className='text-neutral-500 mx-4'>Auto Paste from Clipboard</Label>
            </div>
        </div>
    )
}

export default LinkShortenerInput