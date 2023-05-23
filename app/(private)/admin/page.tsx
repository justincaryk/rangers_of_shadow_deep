import AdminFeaturesWrapper from '../../../components/admin/admin-features-wrapper'
import MercenaryStuff from '../../../components/admin/mercenary-stuff'

export default function Dashboard() {
  return (
    <div className='space-y-6'>
      {/* features + limits */}
      <AdminFeaturesWrapper />
      {/* companion items & skills assignment */}
      <MercenaryStuff />
    </div>
  )
}
