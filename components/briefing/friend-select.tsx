'use client'

import classnames from 'classnames'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useCompanionsApi } from '../companions/companions-api'
import { useDeployedFriends, useSetDeployedFriends, useFriendsRestrictions } from './atoms'
import { listItemActiveStyles, listItemBaseStyles, listItemDormantStyles } from './styles'

export default function FriendSelect() {
  const [ friendsRestrictions ] = useAtom(useFriendsRestrictions)
  const [ deployedFriends ] = useAtom(useDeployedFriends)
  const [ _, setDeployedFriends ] = useAtom(useSetDeployedFriends)
  const { data } = useCompanionsApi().getFriends
  const [ remainingRp, setRemainingRp ] = useState(friendsRestrictions.recruitmentPoints)

  return (
    <div
      className={classnames({
        fade: true,
        'overflow-x-auto grow': true,
      })}
    >
      <div className='flex justify-between'>
        <div className='font-semibold overflow-y-auto space-y-2 mb-10'>
          {data?.allFriends?.nodes
            .sort((a, b) => b.progressionPoints! - a.progressionPoints!)
            .map(friend => (
              <div
                key={friend.id}
                className={classnames({
                  [listItemBaseStyles]: true,
                  [listItemDormantStyles]: !deployedFriends.includes(friend.id),
                  [listItemActiveStyles]: deployedFriends.includes(friend.id),
                })}
                onClick={() => setDeployedFriends([ friend.id ])}
              >
                <div>{friend.name}</div>
                <div className='uppercase text-xs text-gray-300'>
                  {friend.mercenaryByMercenaryId?.name} ({friend.mercenaryByMercenaryId?.cost} RP) (
                  {friend.progressionPoints} PP)
                </div>
              </div>
            ))}
        </div>
        <div className='text-lg text-white text-right'>
          <div>{friendsRestrictions.recruitmentPoints} recruitment points</div>
          <div>{friendsRestrictions.maxCompanions} companions allowed</div>
        </div>
      </div>
    </div>
  )
}
