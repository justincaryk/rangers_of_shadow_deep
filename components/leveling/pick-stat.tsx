'use client'

import { useMemo, useState } from 'react'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import classnames from 'classnames'

import Decrement from '../parts/decrement'
import Increment from '../parts/increment'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import Card from '../parts/card'
import SmallButton from '../parts/small-button'

import { useCompanionsApi } from '../companions/companions-api'
import { useStatsApi } from '../stats/stats-api'
import { useLevelingApi } from './leveling-api'
import { useCurrentMember } from '../react-query/hooks'

import { MemberLevel } from './types'
import { Stat, StatWithBaseTypedName } from '../stats/types'
import { CreateMemberStatMutationVariables, StatType } from '../../graphql/generated/graphql'
import { notify } from '../parts/toast'

interface Props {
  statTypeLevel?: MemberLevel
}

export default function FriendBonusStat({ statTypeLevel }: Props) {
  const [ show, toggleShow ] = useState(false)
  const [ selection, setSelection ] = useState<string | null>(null)

  const { data: friend } = useCompanionsApi().getFriendSummary
  const { id: memberId, memberType, referenceColumnName } = useCurrentMember()

  const { data: stats } = useStatsApi().getStats
  const { data: memberStats } = useStatsApi().getMemberStats

  const { mutate: addMemberStat, status: addMemberStatStatus } = useStatsApi().createMemberStat
  const { mutate: updateMemberStat, status: updateMemberStatStatus } = useStatsApi().updateMemberStat
  const { mutate: updateMemberLevel, status: updateMemberLevelStatus } = useLevelingApi().updateLevelRef

  const getCurrentStatValue = (stat: StatWithBaseTypedName) => {
    if (memberType === 'ranger') {
      // TODO
      return 0
    }
    if (memberType === 'friend') {
      const baseVal = friend?.friendById?.mercenaryByMercenaryId?.[stat.name] ?? 0
      const additionalBonuses =
        memberStats?.allMemberStats?.nodes.reduce((prev, curr) => {
          return curr.statId === stat.id ? prev + curr.value : prev
        }, 0) ?? 0

      return baseVal + additionalBonuses
    }

    return 0
  }

  const pickIds = useMemo(() => {
    return statTypeLevel?.friendLevelGrantByFriendLevelGrantId?.featuresByFriendLevelGrantId?.nodes.find(x => x.pickIds)
      ?.pickIds
  }, [ statTypeLevel ])

  const checkCanIncrease = (stat: Stat) => {
    // check if selection
    if (selection) {
      return false
    }
    // check for pickIds, otherwise let it roll
    if (pickIds?.length) {
      return pickIds.includes(stat.id)
    }
  }

  const checkCanDecrease = (stat: Stat) => {
    return stat.id === selection
  }

  const modifyStat = () => {
    // validate request
    if (
      !statTypeLevel ||
      addMemberStatStatus !== 'idle' ||
      updateMemberLevelStatus !== 'idle' ||
      updateMemberStatStatus !== 'idle'
    ) {
      return null
    }

    // update or create a member stat lookup record
    const memberStat = memberStats?.allMemberStats?.nodes.find(ms => ms.statId === selection)

    if (memberStat) {
      updateMemberStat({
        id: memberStat.id,
        value: memberStat.value + 1,
      })
    } else {
      // add stat
      addMemberStat({
        [referenceColumnName as keyof CreateMemberStatMutationVariables]: memberId,
        statId: selection,
        value: 1,
      })
    }

    // update memberLevel with timesSpent
    updateMemberLevel({
      id: statTypeLevel.id,
      timesUsed: statTypeLevel.timesUsed + 1,
    })

    notify('Stat modified!', { type: 'success' })
  }

  return (
    <div className='space-y-6'>
      <div className='mt-2 cursor-pointer' onClick={() => toggleShow(!show)}>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader content='stat upgrade' icon={<AdjustmentsHorizontalIcon className='text-rose-600' />} />
      </div>
      {show && (
        <Card className='bg-black/50'>
          <div className='space-y-2'>
            {/* <div className='text-sm font-bold'>Choose {feat?.value} from the options below:</div> */}
            {stats?.allStats?.nodes
              .filter(stat => (pickIds?.length ? pickIds.includes(stat.id) : stat))
              .filter(stat => stat && stat?.statType === StatType.Base)
              .map(stat => {
                const canIncrement = checkCanIncrease(stat)
                const canDecrement = checkCanDecrease(stat)
                const serverStatValue = getCurrentStatValue(stat as StatWithBaseTypedName)
                return (
                  <div key={stat?.id} className='grid grid-flow-col auto-cols-min gap-x-2'>
                    <div className='uppercase font-bold text-small w-24'>{stat?.name}: &nbsp;</div>
                    <div
                      className={classnames({
                        'w-10': true,
                        'font-bold': selection === stat.id,
                      })}
                    >
                      {selection === stat.id ? serverStatValue + 1 : serverStatValue}
                    </div>
                    <div className='flex gap-2'>
                      <div
                        className={classnames({
                          'w-6 cursor-pointer': true,
                          hidden: !canIncrement,
                        })}
                      >
                        <Increment onClick={() => setSelection(stat.id)} />
                      </div>
                      <div
                        className={classnames({
                          'w-6 cursor-pointer': true,
                          hidden: !canDecrement,
                        })}
                      >
                        <Decrement onClick={() => setSelection(null)} />
                      </div>
                    </div>
                  </div>
                )
              })}
            {selection ? (
              <SmallButton primary onClick={modifyStat}>
                Save selection
              </SmallButton>
            ) : null}
          </div>
        </Card>
      )}
    </div>
  )
}
