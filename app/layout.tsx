'use client'

import './globals.css'

import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import Loading from './loading'
// import ErrorFallback from './error'
// import { ErrorBoundary } from 'react-error-boundary'

import Providers from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='bg-amber-600/20'>
        <Suspense fallback={<Loading />}>
          <Toaster />
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  )
}
