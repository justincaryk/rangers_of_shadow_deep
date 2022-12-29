import PrivateNavigation from '../../components/nav/private'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <PrivateNavigation />
      <div className='flex justify-center'>{children}</div>
    </section>
  )
}
