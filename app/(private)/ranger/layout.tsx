import React from 'react'

export default function RangerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className='bg-hero-1 h-full w-full bg-no-repeat bg-contain bg-right fixed right-0 top-24 -z-10' />
      <header>
        <div className='mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            Create a Ranger
          </h1>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
          {children}
        </div>
      </main>
    </div>
  )
}
