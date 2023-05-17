'use client'

import MemberCard from '../parts/member-card'
import { MEMBER_TYPE_ENUM } from '../types'
import { useRangerApi } from './ranger-api'

export default function RangerCards() {
  const { data } = useRangerApi().getAllRangers

  return (
    <>
      <div className='grid grid-cols-3 gap-x-5 gap-y-5'>
        {data?.allCharacters?.nodes.map(
          (ranger, i) =>
            ranger && (
              <MemberCard
                key={ranger.id}
                member={{
                  extras: [
                    { text: 'Level', value: ranger.level },
                    {
                      text: 'XP',
                      value: ranger.xp,
                    },
                  ],
                  ...ranger,
                }}
                cardIndex={i}
                memberType={MEMBER_TYPE_ENUM.RANGER}
              />
            )
        ) ?? null}
      </div>
      {!data?.allCharacters?.nodes.length && (
        <div>No rangers created yet. Get to work and reclaim Shadow Deep for the Light!</div>
      )}
    </>
  )
}
