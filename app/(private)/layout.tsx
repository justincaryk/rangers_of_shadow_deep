import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import PrivateNavigation from '../../components/nav/private'
import Loading from '../loading'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='relative h-screen w-full mb-46'>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: 'green',
            },
          },
          error: {
            style: {
              background: 'red',
            },
          },
        }}
        containerStyle={{
          top: '20%',
        }}
      />
      <div className='fixed p-14 top-0 left-0 w-14 h-full bg-red-left bg-contain bg-repeat-y bg-left -z-10' />
      <div className='fixed p-14 top-0 right-0 w-14 h-full bg-red-right bg-contain bg-repeat-y bg-right -z-10' />
      <div className='fixed top-0 w-full z-20'>
        <PrivateNavigation />
      </div>
      <Suspense fallback={<Loading />}>
        <div className='px-24 mt-28 h-full w-full relative z-10'>{children}</div>
      </Suspense>
    </section>
  )
}
