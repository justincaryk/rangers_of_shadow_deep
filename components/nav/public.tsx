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
    <div className='h-38 w-full bg-stone p-6 z-10 relative'>
      <div className='flex items-center justify-end'>
        {publicLinks.map(x => (
          <div key={x.text} className='ml-4'>
            <Link href={x.link}>
              <button className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>
                {x.text}
              </button>
            </Link>
          </div>
        ))}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Image
            src='/images/1200px-SVG_logo.svg.png'
            alt='auth navbar logo'
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  )
}
