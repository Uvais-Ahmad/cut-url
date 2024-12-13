"use client"
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
export default function Home() {
  const {setTheme} = useTheme();
  const [themeToggle, setThemeToggle] = useState<boolean>(false)
  return (
    <div className=''>
      hello world
      <Button onClick={() => {setTheme(themeToggle? "dark": "light");setThemeToggle(!themeToggle)}}>Click me</Button>
    </div>
  );
}
