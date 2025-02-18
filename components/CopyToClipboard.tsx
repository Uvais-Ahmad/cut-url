import React, { useState } from 'react'
import { Button } from './ui/button'
import { Check, Copy } from 'lucide-react';

function CopyToClipboard({children}: {children: React.ReactNode}) {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const handleClickToCopy = async (data: string) => {
        try {
            await navigator.clipboard.writeText(data)
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
            }, 1000)
        } catch (error) {
            console.error('Failed to copy!', error)
        }
    }
    return (
        <Button
            className='bg-gray-800 text-white rounded-full hover:bg-gray-700 ml-2'
            onClick={() => handleClickToCopy(children as string)} 
            size={'icon'} 
        >
            {isCopied ? <Check /> : <Copy />}
        </Button>
    )
}

export default CopyToClipboard