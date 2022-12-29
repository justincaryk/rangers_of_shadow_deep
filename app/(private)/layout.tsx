import PrivateNavigation from '../../components/nav/private'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <PrivateNavigation />
      {children}
    </section>
  )
}
