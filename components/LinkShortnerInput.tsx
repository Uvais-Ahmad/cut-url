import React from 'react'

function LinkShortenerInput() {
    return (
        <div>
            <div className='w-3/4 md:w-2/5 mt-10 relative flex mx-auto'>
                <input className='w-full p-4 rounded-full bg-neutral-900 border-4' type='text' placeholder='Paste your link here' />
                <button className='bg-blue-500 w-40 absolute right-1 top-1 text-white p-4 px-6 rounded-full'>Shorten Now</button>
            </div>
        </div>
    )
}

export default LinkShortenerInput