import Image from 'next/image'
import Loader from './loader'

export default function LoadingSkeleton() {
  return (
    <div>
      <div className='w-full bg-stone px-4 relative'>
        <div className='flex items-center justify-between md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <span className='sr-only'>Rangers of Shadow Deep Companion App</span>
            <Image width={200} height={100} src='/images/logo-lg.png' alt='' />
          </div>
        </div>
      </div>
      <section>
        <div className='bg-hero-2 h-full w-full bg-no-repeat bg-contain bg-left fixed right-0 top-24 -z-10' />
        <div className='px-24 mt-28 h-full w-1/2 fixed right-0'>
          <Loader />
        </div>
      </section>
    </div>
  )
}
