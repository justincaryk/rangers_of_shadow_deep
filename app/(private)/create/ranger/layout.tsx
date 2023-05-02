import React from 'react'
import { PageHeader } from '../../../../components/parts/page-header'

export default function RangerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className='bg-hero-1 h-full w-full bg-no-repeat bg-contain bg-right fixed right-0 top-24 -z-10' />
      <PageHeader title='Build a Ranger'/>
      <main>
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>{children}</div>
      </main>
    </div>
  )
}
