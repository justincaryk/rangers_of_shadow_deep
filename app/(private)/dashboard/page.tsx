import classnames from 'classnames'
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/solid'

import { sectionBaseStyles } from '../../../components/parts/styles'

import InitCreate from '../../../components/dashboard/init-create'
import RangerCards from '../../../components/ranger/ranger-cards'
import FriendsCards from '../../../components/companions/friends-cards'

import MinorHeader from '../../../components/parts/minor-header'

export default function Dashboard() {
  return (
    <div className='space-y-4 w-full'>
      <InitCreate />
      <div
        className={classnames({
          ...sectionBaseStyles,
          'space-y-4': true,
        })}
      >
        <MinorHeader content='Rangers' icon={<UserIcon className='text-emerald-900' />} />
        <RangerCards />
      </div>

      <div
        className={classnames({
          ...sectionBaseStyles,
          'space-y-2': true,
        })}
      >
        <MinorHeader content='Companions' icon={<UserGroupIcon className='text-emerald-900' />} />
        <FriendsCards />
      </div>
    </div>
  )
}
