import PublicNavigation from '../../components/nav/public'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <PublicNavigation />
      <div className='flex justify-center'>{children}</div>
    </section>
  )
}
