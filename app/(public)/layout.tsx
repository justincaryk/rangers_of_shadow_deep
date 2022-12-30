import PublicNavigation from '../../components/nav/public'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='relative h-screen'>
      <PublicNavigation />
      <div className='bg-hero-2 bg-no-repeat bg-contain h-full'>
        <div className='flex justify-end px-20'>{children}</div>
      </div>
    </section>
  )
}
