"use client"
// import { Button } from '@/components/ui/button';
// import { useTheme } from 'next-themes';
import React from 'react';
export default function Home() {
  // const {setTheme} = useTheme();
  // const [themeToggle, setThemeToggle] = useState<boolean>(false)
  return (
    <div>
      <div>
        <h1 className='text-2xl md:text-4xl font-bold text-center'>
          {`Shorten Your Loooong Links :)`}
        </h1>
        <p className='text-center mt-6'>CutLink is an efficiently and easy-to-use URL shortening service that streamlines your online experience.</p>
      </div>

      <div className='w-3/4 md:w-2/5 mt-10 relative flex mx-auto'>
        <input className='w-full p-4 rounded-full bg-neutral-900 border-4' type='text' placeholder='Paste your link here' />
        <button className='bg-blue-500 w-40 absolute right-1 top-1 text-white p-4 px-6 rounded-full'>Shorten Now</button>
      </div>
    </div>
  );
}
