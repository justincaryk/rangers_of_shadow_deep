'use client'


import MemberCard from '../parts/member-card'
import { MEMBER_TYPE_ENUM } from '../types'
import { useCompanionsApi } from './companions-api'

export default function FriendCards() {
  const { data: friends } = useCompanionsApi().getFriends

  return (
    <>
    <div className='grid grid-cols-3 gap-x-5 gap-y-5'>
      {friends?.allFriends?.nodes.map((x, i) => (
        <MemberCard
          key={x.name}
          member={{
            extras: [
              {
                text: 'Progression Points',
                value: x.progressionPoints ?? 0,
              },
            ],
            ...x,
          }}
          cardIndex={i}
          memberType={MEMBER_TYPE_ENUM.FRIEND}
        />
      ))}
    </div>
    {!friends?.allFriends?.nodes.length && (
        <div>No companions hired yet. Hire some duders before venturing out!</div>
      )}
    </>
  )
}
