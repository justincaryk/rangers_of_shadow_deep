import Image from 'next/image'
import Link from 'next/link'

export default function PublicNavigation() {
  const publicLinks = [
    {
      link: '/auth/signup',
      text: 'Signup',
    },
    {
      link: '/auth/signin',
      text: 'Signin',
    },
  ]

  return (
    <div className='h-38 w-full bg-stone px-4 z-10 relative'>
      <div className='flex items-center justify-between py-6 md:justify-start md:space-x-10'>
        <div className='flex justify-start lg:w-0 lg:flex-1'>
          <span className='sr-only'>Rangers of Shadow Deep Companion App</span>
          <Image
            width={200}
            height={100}
            src='/images/logo-lg.png'
            alt=''
          />
        </div>
        {publicLinks.map(x => (
          <div key={x.text} className='ml-4'>
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
