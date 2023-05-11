'use client'

import classnames from 'classnames'
import { sectionBaseStyles } from '../../../components/parts/styles'

import InitCreate from '../../../components/dashboard/init-create'
import MyRangers from '../../../components/ranger/all-rangers'
import CompanionsList from '../../../components/companions/mercenaries'
import MinorHeader from '../../../components/parts/minor-header'
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/solid'

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
        <MyRangers />
      </div>

      <div
        className={classnames({
          ...sectionBaseStyles,
          'space-y-2': true,
        })}
      >
        <MinorHeader content='Companions' icon={<UserGroupIcon className='text-emerald-900' />} />
        <CompanionsList />
      </div>
    </div>
  )
}
