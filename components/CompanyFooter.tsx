import React from 'react'
import Link from 'next/link'

function CompanyFooter() {
    return (
        <footer className='border-t bg-background mt-16'>
            <div className='container mx-auto px-6 py-8'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                    {/* Company Info */}
                    <div className='space-y-3'>
                        <h3 className='font-semibold text-lg'>Briefly</h3>
                        <p className='text-sm text-muted-foreground'>
                            The most powerful URL shortener with advanced analytics and custom domains.
                        </p>
                    </div>

                    {/* Product */}
                    <div className='space-y-3'>
                        <h4 className='font-medium'>Product</h4>
                        <ul className='space-y-2 text-sm text-muted-foreground'>
                            <li><Link href='#' className='hover:text-foreground transition-colors'>Features</Link></li>
                            <li><Link href='#' className='hover:text-foreground transition-colors'>Pricing</Link></li>
                            <li><Link href='#' className='hover:text-foreground transition-colors'>API</Link></li>
                            <li><Link href='#' className='hover:text-foreground transition-colors'>Documentation</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className='space-y-3'>
                        <h4 className='font-medium'>Company</h4>
                        <ul className='space-y-2 text-sm text-muted-foreground'>
                            <li><Link href='#' className='hover:text-foreground transition-colors'>About</Link></li>
                            <li><Link href='#' className='hover:text-foreground transition-colors'>Blog</Link></li>
                            <li><Link href='#' className='hover:text-foreground transition-colors'>Careers</Link></li>
                            <li><Link href='#' className='hover:text-foreground transition-colors'>Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className='space-y-3'>
                        <h4 className='font-medium'>Legal</h4>
                        <ul className='space-y-2 text-sm text-muted-foreground'>
                            <li><Link href='#' className='hover:text-foreground transition-colors'>Privacy Policy</Link></li>
                            <li><Link href='#' className='hover:text-foreground transition-colors'>Terms of Service</Link></li>
                            <li><Link href='#' className='hover:text-foreground transition-colors'>Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className='border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground'>
                    <p>© 2025 Briefly. All rights reserved.</p>
                    <div className='flex space-x-4 mt-4 md:mt-0'>
                        <Link href='#' className='hover:text-foreground transition-colors'>Status</Link>
                        <Link href='#' className='hover:text-foreground transition-colors'>Support</Link>
                        <Link href='#' className='hover:text-foreground transition-colors'>Help Center</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default CompanyFooter
