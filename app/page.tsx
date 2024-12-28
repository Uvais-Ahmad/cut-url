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
        <h1 className='text-2xl  md:text-4xl font-bold text-center'>
          {`Shorten Your Loooong Links :)`}
        </h1>
        <p className='text-center mt-6'>CutLink is an efficiently and easy-to-use URL shortening service that streamlines your online experience.</p>
        {/* Component which contain search bar */}
        <LinkShortenerInput />
      </div>
    </div>
  );
}
