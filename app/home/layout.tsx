import React from 'react'

function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (<>
        <div>HomeLayout</div>
        {children}
    </>)
}

export default HomeLayout