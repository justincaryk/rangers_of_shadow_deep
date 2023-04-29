import classnames from 'classnames'
import { sectionBaseStyles } from '../../../components/parts/styles'

import Link from 'next/link'

import MyRangers from '../../../components/characters/my-rangers'
import MyCompanions from '../../../components/characters/my-companions'
import MinorHeader from '../../../components/parts/minor-header'
import SmallButton from '../../../components/parts/small-button'
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import { PRIVATE_LINK_ROUTES } from '../../../components/nav/routes'

export default function Dashboard() {
  return (
    <div className='space-y-4 w-full'>
      <div
        className={classnames({
          ...sectionBaseStyles,
          'flex gap-x-5': true,
        })}
      >
        <Link href={PRIVATE_LINK_ROUTES.CREATE_RANGER}>
          <SmallButton>Create Ranger</SmallButton>
        </Link>
        <Link href={PRIVATE_LINK_ROUTES.CREATE_COMPANIONS}>
          <SmallButton>Create Companion</SmallButton>
        </Link>
      </div>
      <div
        className={classnames({
          ...sectionBaseStyles,
          'space-y-4': true,
        })}
      >
        <MinorHeader
          content='Rangers'
          icon={<UserIcon className='text-emerald-900' />}
        />
        <MyRangers />
      </div>

      <div
        className={classnames({
          ...sectionBaseStyles,
          'space-y-2': true,
        })}
      >
        <MinorHeader
          content='Companions'
          icon={<UserGroupIcon className='text-emerald-900' />}
        />
        <MyCompanions />
      </div>
    </div>
  )
}
