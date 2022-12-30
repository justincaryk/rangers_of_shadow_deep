import PrivateNavigation from '../../components/nav/private'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='relative h-screen w-full mb-46'>
      <PrivateNavigation />
      <div className='bg-hero-1 h-full bg-no-repeat bg-contain bg-right'>{children}</div>
    </section>
  )
}
