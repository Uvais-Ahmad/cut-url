import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

function LogInForm() {
    return (
        <div className='flex flex-col gap-6'>
            <Card className='overflow-hidden'>
                <CardContent className='grid p-0 md:grid-cols-2'>
                    <form className='p-6 md:p-8'>
                        <div className='flex flex-col gap-6'>
                            {/* Header */}
                            <div className='flex flex-col items-center text-center'>
                                <h1 className='text-2xl font-bold'>Welcome back</h1>
                                <p className='text-balance text-muted-foreground'>Login to your Briefly account</p>
                            </div>

                            <div className='grid gap-2'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>

                            <div className='grid gap-2'>
                                <div className='flex items-center'>
                                    <Label htmlFor='password'>Password</Label>
                                    <a href='#' className='ml-auto text-sm underline-offset-2 hover:underline'>
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    type='password' id='password' required
                                />
                            </div>
                            <Button type='submit' className='w-full'>
                                Login
                            </Button>
                        </div>
                    </form>
                    {/* Image of Card */}
                    <div>

                    </div>
                </CardContent>
            </Card>
            {/* Privacy policy */}
            <div>

            </div>
        </div>
    )
}

export default LogInForm