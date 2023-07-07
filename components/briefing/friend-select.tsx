'use client'

import classnames from 'classnames'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useCompanionsApi } from '../companions/companions-api'
import { useRangerApi } from '../ranger/ranger-api'
import { useDeployedFriends, useSetDeployedFriends, useFriendsRestrictions, useDeployedRanger } from './atoms'
import { listItemActiveStyles, listItemBaseStyles, listItemDormantStyles } from './styles'

export default function FriendSelect() {
  const [ deployedRanger ] = useAtom(useDeployedRanger)
  const [ friendsRestrictions ] = useAtom(useFriendsRestrictions)
  const [ deployedFriends ] = useAtom(useDeployedFriends)
  const [ _, setDeployedFriends ] = useAtom(useSetDeployedFriends)
  const { data } = useCompanionsApi().getFriends
  const { data: rangerSkillData, status: rangerSkillStatus } = useRangerApi(deployedRanger?.id).getRangerLeadership
  const [ maxRp, setMaxRp ] = useState(-1)
  const [ remainingRp, setRemainingRp ] = useState(-1)

  // TODO: add RP + max player count validation???
  useEffect(() => {
    if (rangerSkillStatus === 'success' && remainingRp === -1) {
      const rp = friendsRestrictions.recruitmentPoints
      const leadershipBonus = rangerSkillData?.allSkills?.nodes[0].memberSkillsBySkillId.nodes[0].value ?? 0
      setMaxRp(rp + leadershipBonus)
      setRemainingRp(rp + leadershipBonus)
    }
  }, [ rangerSkillStatus, remainingRp, rangerSkillData, friendsRestrictions ])

  const handleFriendClick = (friendId: string) => {
    const isFriendActive = deployedFriends.includes(friendId)
    const updatedList = isFriendActive ? deployedFriends.filter(id => id !== friendId) : [ friendId, ...deployedFriends ]

    setDeployedFriends(updatedList)

    const party = data?.allFriends?.nodes.filter(friend => updatedList.includes(friend.id))
    const totalCost =
      party?.reduce((prev, curr) => {
        if (curr.mercenaryByMercenaryId?.cost) {
          return prev + curr.mercenaryByMercenaryId.cost
        }
        return prev
      }, 0) ?? 0

    setRemainingRp(maxRp - totalCost)
  }

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
                onClick={() => handleFriendClick(friend.id)}
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
          <div>{remainingRp} recruitment points</div>
          <div>{friendsRestrictions.maxCompanions} companions allowed</div>
        </div>
      </div>
    </div>
  )
}
