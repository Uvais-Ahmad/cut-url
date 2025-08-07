import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

function Footer() {
    const { data: session } = useSession()
    const isAuthenticated = !!session

    if (isAuthenticated) {
        // Show regular footer for authenticated users
        return (
            <footer className='w-full bg-background border-t mt-16'>
                <div className='flex justify-center items-center py-6 px-4'>
                    <p className='text-sm text-muted-foreground'>© 2025 Briefly. All rights reserved.</p> 
                </div>
            </footer>
        )
    }

    // Show promotional footer for non-authenticated users
    return (
        <div className='fixed bottom-0 w-full'>
            {/* Blur overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-sm'></div>
            
            {/* Content */}
            <div className='relative z-10 bg-background/90 border-t backdrop-blur-md'>
                <div className='flex flex-col sm:flex-row justify-center items-center gap-2 py-4 px-6'>
                    <div className='flex items-center gap-2'>
                        <span className='text-red-500'>🔒</span>
                        <p className='text-sm text-muted-foreground'>
                            Limited view for guests.
                        </p>
                    </div>
                    
                    <Link 
                        href="/register" 
                        className='text-sm text-blue-500 hover:text-blue-600 font-medium underline underline-offset-2 transition-colors'
                    >
                        Register Now
                    </Link>
                    
                    <span className='text-sm text-muted-foreground hidden sm:inline'>
                        to enjoy Unlimited History
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Footer