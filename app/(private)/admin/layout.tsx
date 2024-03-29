import React from 'react'

export default function RangerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='bg-hero-3 h-full w-full bg-no-repeat bg-contain bg-top fixed right-0 top-24 -z-10 opacity-40' />
      <header>
        <div className='mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Area 51</h1>
          <div>...I hope you know what you&apos;re doing!</div>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>{children}</div>
      </main>
    </div>
  )
}
