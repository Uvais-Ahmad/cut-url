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
        <h1 className='text-2xl  md:text-6xl font-bold text-center mt-6 md:mt-20'>
          {`Shorten Your Loooong Links :)`}
        </h1>
        <p className='text-center mt-6 text-base font-mono'>CutLink is an efficiently and easy-to-use URL shortening service.</p>
        <LinkShortenerInput />
      </div>
    </div>
  );
}
