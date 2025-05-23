"use client"
import LinkShortenerInput from '@/components/LinkShortnerInput'
import NavBar from '@/components/NavBar'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { BarChart2, Clock, LinkIcon, Settings } from 'lucide-react';
import React, { useState } from 'react'

// Home Page (for authenticated users)
function MainHomePage() {
    const [reRender, setReRender] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState('history');
    console.log("MainHomePage re-rendered", reRender);
    return (
        <div className='h-full'>
            <NavBar />
            <div className='h-full'>
                <LinkShortenerInput 
                    setReRender={setReRender}
                />            

                {/* Tabs */}
                <div className='min-h-screen '>
                    <div className='container mx-auto py-6'>
                        <Tabs defaultValue="history" className="w-full bg-gray-50 dark:bg-neutral-900 shadow" onValueChange={setActiveTab}>
                            <TabsList className="w-full flex justify-center bg-transparent p-0">
                                <TabsTrigger
                                    value="history"
                                    className={`flex items-center gap-2 rounded-none border-b-2 px-8 py-4 ${activeTab === "history" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-400"}`}
                                >
                                    <Clock className="h-4 w-4" />
                                    History
                                </TabsTrigger>
                                <TabsTrigger
                                    value="statistics"
                                    className={`flex items-center gap-2 rounded-none border-b-2 px-4 py-4 ${activeTab === "statistics" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-400"}`}
                                >
                                    <BarChart2 className="h-4 w-4" />
                                    Statistics
                                </TabsTrigger>
                                <TabsTrigger
                                    value="clickstream"
                                    className={`flex items-center gap-2 rounded-none border-b-2 px-4 py-4 ${activeTab === "clickstream" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-400"}`}
                                >
                                    <LinkIcon className="h-4 w-4" />
                                    Click Stream
                                </TabsTrigger>
                                <TabsTrigger
                                    value="settings"
                                    className={`flex items-center gap-2 rounded-none border-b-2 px-4 py-4 ${activeTab === "settings" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-400"}`}
                                >
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainHomePage