import { PageHeader } from '../../../components/parts/page-header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='bg-hero-3 h-full w-full bg-no-repeat bg-contain bg-top fixed right-0 top-24 -z-10 opacity-40' />
      <PageHeader title="Game Rules" />
      <main>
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>{children}</div>
      </main>
    </div>
  )
}
