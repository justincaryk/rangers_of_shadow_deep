'use client'

import './globals.css'

import { Toaster } from 'react-hot-toast'
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
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
