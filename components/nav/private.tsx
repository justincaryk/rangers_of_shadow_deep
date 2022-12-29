export default function PrivateNavigation() {
  const privateLinks = [
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
    <div className='h-38 w-full bg-black p-4 z-10 relative'>
      <div className='flex items-center justify-end'>
        {privateLinks.map(x => (
          <div key={x.text} className='ml-2'>
            <button
              className='text-off-white font-roboto uppercase hover:text-hover-white hover:no-underline cursor-pointer outline-none'
              // onClick={() => history.push(x.link)}
            >
              {x.text}
            </button>
          </div>
        ))}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <img className='w-24' src='DD-Logo-1024x487.png' alt='broken logo' />
        </div>
      </div>
    </div>
  )
}
