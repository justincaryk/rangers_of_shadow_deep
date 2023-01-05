import PrivateNavigation from '../../components/nav/private'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='relative h-screen w-full mb-46'>
      <div className='fixed p-14 top-0 left-0 w-14 h-full bg-red-left bg-contain bg-repeat-y bg-left -z-10' />
      <div className='fixed p-14 top-0 right-0 w-14 h-full bg-red-right bg-contain bg-repeat-y bg-right -z-10' />
      <div className='fixed top-0 w-full'>
        <PrivateNavigation />
      </div>
      <div className='px-24 mt-28 h-full w-full'>{children}</div>
    </section>
  )
}
