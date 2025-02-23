import React from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { LogIn, Moon, Sun } from 'lucide-react'

function NavBar() {
    const { theme, setTheme } = useTheme()
    return (
        <div className='flex justify-between items-center py-4 px-4'>
            <h1 className='text-2xl font-bold sm:font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-700'>Briefly</h1>
            <div className='flex items-center gap-2'>

                <Button
                    variant="ghost"
                    size="icon"
                    className='rounded-full'
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
                <Button className='rounded-2xl bg-neutral-900 text-white border-2 mx-2 hover:bg-neutral-800'>
                    LogIn <LogIn/>
                </Button>
                <Button className='rounded-2xl bg-blue-500 text-white border-2 hover:bg-blue-400'>
                    Register Now
                </Button>
            </div>
        </div>
    )
}

export default NavBar