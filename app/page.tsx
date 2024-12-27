"use client"
import LinkShortenerInput from '@/components/LinkShortnerInput';
import NavBar from '@/components/NavBar';
// import { Button } from '@/components/ui/button';
// import { useTheme } from 'next-themes';
import React from 'react';
export default function Home() {
  // const {setTheme} = useTheme();
  // const [themeToggle, setThemeToggle] = useState<boolean>(false)
  return (
    <div className='h-full'>
      <NavBar />
      <div>
        <h1 className='text-2xl md:text-4xl font-bold text-center'>
          {`Shorten Your Loooong Links :)`}
        </h1>
        <p className='text-center mt-6'>CutLink is an efficiently and easy-to-use URL shortening service that streamlines your online experience.</p>
        <LinkShortenerInput />
      </div>
    </div>
  );
}
