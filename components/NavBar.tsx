import React from 'react'
import { Button } from './ui/button'
import { LogIn } from 'lucide-react'

function NavBar() {
    return (
        <div className='flex justify-between items-center py-4 px-4'>
            <h1 className='text-2xl font-bold sm:font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-700'>ShortLink</h1>
            <div>
                <Button className='rounded-2xl bg-neutral-900 text-white border-2 mx-2'>
                    LogIn <LogIn/>
                </Button>
                <Button className='rounded-2xl bg-blue-500 text-white border-2'>
                    Register Now
                </Button>
            </div>
        </div>
    )
}

export default NavBar