import Image from 'next/image'
import Link from 'next/link'
import { PUBLIC_ROUTE_URLS, PublicRouteType } from './routes'

const PUBLIC_ROUTES: PublicRouteType[] = [
  {
    link: PUBLIC_ROUTE_URLS.SIGN_UP,
    text: 'Signup',
    hasNav: true,
  },
  {
    link: PUBLIC_ROUTE_URLS.SIGN_IN,
    text: 'Signin',
    hasNav: true,
  },
]
export default function PublicNavigation() {
  return (
    <div className='w-full bg-stone px-4 relative z-20'>
      <div className='flex items-center justify-between md:justify-start md:space-x-10'>
        <div className='flex justify-start lg:w-0 lg:flex-1'>
          <span className='sr-only'>Rangers of Shadow Deep Companion App</span>
          <Image
            width={200}
            height={100}
            // className='h-8 w-auto sm:h-10'
            src='/images/logo-lg.png'
            alt=''
          />
        </div>
        {PUBLIC_ROUTES.map(x => (
          <div key={x.text}>
            <Link href={x.link}>
              <button className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>
                {x.text}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
