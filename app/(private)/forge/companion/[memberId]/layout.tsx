import React from 'react'
import { PageHeader } from '../../../../../components/parts/page-header'

export default function RangerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='bg-hero-3 h-full w-full bg-no-repeat bg-contain bg-top fixed right-0 top-24 -z-10 opacity-40' />
      <PageHeader title='Hire a Companion' />
      <main>
        <div className='mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8'>{children}</div>
      </main>
    </div>
  )
}
