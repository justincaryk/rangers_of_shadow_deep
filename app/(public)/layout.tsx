import { Suspense } from 'react'
import PublicNavigation from '../../components/nav/public'
import Loading from '../loading'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='relative h-screen'>
      <div className='fixed top-0 w-full'>
        <PublicNavigation />
      </div>
      <Suspense fallback={<Loading />}>
        <div className='bg-hero-2 h-full w-full bg-no-repeat bg-contain bg-left fixed right-0 top-24 -z-10' />
        <div className='px-24 mt-28 h-full w-1/2 fixed right-0'>{children}</div>
      </Suspense>
    </section>
  )
}
