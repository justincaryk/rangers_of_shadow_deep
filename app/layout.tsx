import './globals.css'

import { Suspense } from 'react'
import Providers from './providers'
import LoadingSkeleton from '../components/loading-skeleton'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='bg-amber-600/20'>
        <Suspense fallback={<LoadingSkeleton />}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  )
}
