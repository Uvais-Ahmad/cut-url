"use client"
import LinkShortenerInput from '@/components/LinkShortnerInput';
import NavBar from '@/components/NavBar';
import React from 'react';

// Public Home Page (for non-authenticated users)
export default function Home() {
  return (
    <div className='h-full'>
      <NavBar />
      <div>
        <h1 className='text-4xl md:text-5xl mx-5  lg:text-6xl font-bold text-center mt-6 md:mt-20   text-transparent bg-clip-text bg-gradient-to-r from-blue-600 from-15% via-pink-500 via-50% to-blue-500 to-85%'>
          {`Shorten Your Loooong Links :)`}
        </h1>
        <p className='text-center mt-6 mx-7 text-base font-mono text-neutral-400'>CutLink is an efficiently and easy-to-use URL shortening service.</p>
        <LinkShortenerInput />
      </div>
    </div>
  );
}
