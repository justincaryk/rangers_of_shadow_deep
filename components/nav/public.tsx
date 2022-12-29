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
              <button className='text-off-white font-roboto uppercase hover:text-hover-white hover:no-underline cursor-pointer outline-none'>
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
          {/* <img className='w-24' src='DD-Logo-1024x487.png' alt='broken logo' /> */}
        </div>
      </div>
    </div>
  )
}
