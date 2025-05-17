"use client"
import LinkShortenerInput from '@/components/LinkShortnerInput'
import NavBar from '@/components/NavBar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { History } from 'lucide-react';
import React, { useState } from 'react'

// Home Page (for authenticated users)
function MainHomePage() {
    const [reRender, setReRender] = useState<boolean>(false);
    console.log("MainHomePage re-rendered", reRender);
    return (
        <div className='h-full'>
            <NavBar />
            <div className='h-full'>
                <LinkShortenerInput 
                    setReRender={setReRender}
                />            

                {/* Tabs */}
                <div className='flex flex-row justify-center m-5 border border-gray-200 w-full'>
                    <Tabs defaultValue="shortened" className="my-6">
                        <TabsList className="grid w-full grid-cols-4 gap-8 ">
                            <div className="flex flex-row justify-center items-center">
                                <History className="h-6 w-6 text-gray-500" />
                                <TabsTrigger value="statistics" className="w-full text-center font-semibold text-gray-500 ">Shortened</TabsTrigger>
                            </div>
                            <TabsTrigger value="history" className="w-full text-center font-semibold text-gray-500 ">History</TabsTrigger>
                            <TabsTrigger value="clickstream" className="w-full text-center font-semibold text-gray-500 ">Shortened</TabsTrigger>
                            <TabsTrigger value="setting" className="w-full text-center font-semibold text-gray-500 ">History</TabsTrigger>
                        </TabsList>
                        <TabsContent value="shortened">
                            {/* Shortened URLs Table */}
                        </TabsContent>
                        <TabsContent value="history">
                            {/* History Table */}
                        </TabsContent>
                        <TabsContent value="shortened">
                            {/* Shortened URLs Table */}
                        </TabsContent>
                        <TabsContent value="history">
                            {/* History Table */}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default MainHomePage