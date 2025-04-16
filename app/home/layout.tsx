import React from 'react'

function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (<>
        {children}
    </>)
}

export default HomeLayout