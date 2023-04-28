import MyRangers from '../../../components/characters/my-rangers'
import MyCompanions from '../../../components/characters/my-companions'
import MinorHeader from '../../../components/parts/minor-header'
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/solid'

export default function Dashboard() {
  return (
    <div className='space-y-4'>
      <MinorHeader content='Rangers' icon={<UserIcon className='text-emerald-900' />}/>
      <MyRangers />

      <MinorHeader content='Companions' icon={<UserGroupIcon className='text-emerald-900' />} />
      <MyCompanions />
    </div>
  )
}
