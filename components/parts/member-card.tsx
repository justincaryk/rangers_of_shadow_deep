'use client'

import { UseMutateFunction } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { Exact } from '../../graphql/generated/graphql'
import { useCompanionsApi } from '../companions/companions-api'
import { PRIVATE_LINK_ROUTES } from '../nav/routes'
import { useRangerApi } from '../ranger/ranger-api'
import { MEMBER_TYPE_ENUM } from '../types'
import { getLetterAt } from '../utils'

interface MemberCardProps {
  member: {
    id: string
    name: string
    avatarUrl?: string
    extras?: {
      text: string
      value: string | number
    }[]
  }
  memberType: MEMBER_TYPE_ENUM
  cardIndex?: number
}

type MemberHash = {
  [K in typeof MEMBER_TYPE_ENUM[keyof typeof MEMBER_TYPE_ENUM]]: {
    delete: UseMutateFunction<any, unknown, Exact<{ id: any }>, unknown>
    memberUrl: string
  }
}

export default function MemberCard({ member, memberType, cardIndex }: MemberCardProps) {
  const { mutate: deleteRanger } = useRangerApi().deleteRanger
  const { mutate: deleteFriend } = useCompanionsApi().deleteFriend

  const memberHash: MemberHash = useMemo(() => ({
    [MEMBER_TYPE_ENUM.RANGER]: {
      delete: deleteRanger,
      memberUrl: PRIVATE_LINK_ROUTES.A_RANGER.replace('[id]', member.id),
    },
    [MEMBER_TYPE_ENUM.FRIEND]: {
      delete: deleteFriend,
      memberUrl: PRIVATE_LINK_ROUTES.A_COMPANION.replace('[id]', member.id),
    },
  }), [ member, deleteFriend, deleteRanger ])

  const deleteMember = () => {
    memberHash[memberType].delete({ id: member.id })
  }

  const generateEditMemberLink = () => {
    return memberHash[memberType].memberUrl
  }

  return (
    <div className='rounded shadow-lg'>
      <div className='p-2 flex justify-between rounded-t bg-orange-900'>
        <div>
          <div className='text-xl font-bold'>{member.name}</div>
          {member.extras?.map((x, i) => (
            <div
              key={i}
              className='whitespace-nowrap overflow-ellipsis uppercase font-roboto text-xs text-slate-400 font-bold'
            >
              <span>
                {x.text} {x.value}
              </span>
            </div>
          ))}
        </div>
        <div className='w-16 h-16 relative'>
          <Image
            className='object-cover'
            src={member.avatarUrl ?? `/images/avatars/avatar-${getLetterAt(cardIndex ?? 0)}.png`}
            alt={'avatar'}
            fill
          />
        </div>
      </div>
      <div className='p-2 flex justify-between rounded-b bg-slate-500/30'>
        <div>
          <button
            className='text-sky-blue font-roboto uppercase hover:no-underline cursor-pointer outline-none'
            // onClick={() => history.push(`/create/${char?.characterId}/sheet`)}
          >
            View
          </button>
        </div>
        <div>
          <Link href={generateEditMemberLink()}>
            <button className='text-sky-blue font-roboto uppercase hover:no-underline cursor-pointer outline-none'>
              Edit
            </button>
          </Link>
        </div>
        <div>
          <button
            className='text-red-500 font-roboto uppercase hover:no-underline cursor-pointer outline-none'
            onClick={deleteMember}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
