'use client'

import classnames from 'classnames'
import { sectionBaseStyles } from '../../../components/parts/styles'

import { useAtom } from 'jotai'
import { useCurrentUser } from '../../../components/auth/atoms/current-user';
import { useRangerApi } from '../../../components/ranger/ranger-api'

import { useEffect } from 'react'

import { PRIVATE_LINK_ROUTES } from '../../../components/nav/routes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import MyRangers from '../../../components/ranger/all-rangers'
import MyCompanions from '../../../components/characters/my-companions'
import MinorHeader from '../../../components/parts/minor-header'
import SmallButton from '../../../components/parts/small-button'
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/solid'

export default function Dashboard() {
  const router = useRouter()

  const {
    mutate: createRangerMutate,
    data: rangerCreateResult,
    status: rangerCreateStatus,
  } = useRangerApi().createRanger

  const [ currentUser ] = useAtom(useCurrentUser)

  useEffect(() => {
    if (rangerCreateStatus === 'success') {
      const rangerId = rangerCreateResult?.createCharacter?.character?.id
      const newRangerUrl = PRIVATE_LINK_ROUTES.CREATE_RANGER.replace('[id]', rangerId)
      router.push(newRangerUrl)
    }
  }, [ rangerCreateResult, rangerCreateStatus, router ])

  const createRanger = () => {
    if (currentUser) {
      createRangerMutate({
        name: `${currentUser?.username}'s New Ranger`,
        userId: currentUser?.userId,
      })
    }
  }

  return (
    <div className='space-y-4 w-full'>
      <div
        className={classnames({
          ...sectionBaseStyles,
          'flex gap-x-5': true,
        })}
      >
        <SmallButton onClick={createRanger}>Create Ranger</SmallButton>
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
