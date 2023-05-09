'use client'

import classnames from 'classnames'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import Decrement from '../parts/decrement'
import Increment from '../parts/increment'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'

import { useMemo, useState } from 'react'

// types
import { BASE_STATS, DECREASE, INCREASE } from '../rules/creation-rules'
import { BASE_STATS_ENUM } from '../types'
import { StatType } from '../../graphql/generated/graphql'
import { Stat } from './types'

// hooks
import { useAtom } from 'jotai'
import { useStatsBp } from '../ranger/atoms/build-points'
import { useStatsApi } from './stats-api'
import { useRangerApi } from '../ranger/ranger-api'

export default function Stats() {
  const [ show, toggleShow ] = useState(false)
  const [ statsBp ] = useAtom(useStatsBp)
  const { data: stats } = useStatsApi().getStats
  const { data: ranger } = useRangerApi().getRangerById

  const { mutate: mutateStat, status: mutateStatStatus } = useStatsApi().updateMemberStatById
  const { mutate: mutateRanger } = useRangerApi().updateRanger

  const spent = useMemo(() => {
    // on character create, a lookup record is generated with the default stat value for each stat.
    // so to determine how many are spent
    // we need to find the diff between the default point total and the rangers point total
    const defaultAtCreateTotal =
      stats?.allStats?.nodes.reduce((acc, curr) => (curr.rangerDefault ? curr.rangerDefault + acc : acc), 0) ?? 0
    const currentRangerTotal =
      ranger?.characterById?.memberStatsByCharacterId.nodes.reduce((acc, curr) => acc + curr.value, 0) ?? 0

    return currentRangerTotal - defaultAtCreateTotal
  }, [ ranger, stats ])

  const availablePoints = useMemo(() => {
    return statsBp - spent
  }, [ statsBp, spent ])

  // how many build points available for stats

  const checkCanIncrease = (stat: Stat) => {
    // make sure we have build points available
    if (statsBp === 0 || availablePoints === 0) {
      return false
    }

    // no armor upgrades
    if (stat.name === BASE_STATS_ENUM.armor) {
      return false
    }

    // only 1 upgrade allowed per stat at creation
    if (getCurrentStatValue(stat.id) === stat.rangerDefault) {
      return true
    }

    return false
  }

  const checkCanDecrease = (stat: Stat) => {
    if (stat.rangerDefault && getCurrentStatValue(stat.id) > stat.rangerDefault) {
      return true
    }

    return false
  }

  const updateStat = (stat: Stat, modifier: number) => {
    if (mutateStatStatus === 'loading') {
      return null
    }

    if (modifier === INCREASE) {
      if (!checkCanIncrease(stat)) {
        return null
      }
    } else {
      if (!checkCanDecrease(stat)) {
        return null
      }
    }

    const memberStat = getMemberStatFromStatId(stat.id)

    if (!memberStat) {
      console.error('no matching member stat id: ', {
        statId: stat.id,
        memberStats: ranger?.characterById?.memberStatsByCharacterId.nodes ?? [],
      })
      throw new Error()
    }

    mutateStat({
      id: memberStat.id,
      value: memberStat.value + modifier,
    })
  }

  function getMemberStatFromStatId(statId: string) {
    return ranger?.characterById?.memberStatsByCharacterId.nodes.find(x => statId && statId === x?.statId) || null
  }

  function getCurrentStatValue(statId: string) {
    return getMemberStatFromStatId(statId)?.value || 'Could not find current set value'
  }

  return (
    <div>
      <div className='mt-2' onClick={() => toggleShow(!show)}>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader
          content='stats'
          icon={<AdjustmentsHorizontalIcon className='text-rose-600' />}
          subtext='Available points:'
          subvalue={availablePoints}
        />
      </div>
      {show && (
        <div className='px-4 py-4 sm:p-6'>
          <div className='flex flex-col space-y-2'>
            {stats?.allStats?.nodes
              .filter(stat => stat && stat?.statType === StatType.Base)
              .map(stat => {
                const canIncrement = checkCanIncrease(stat)
                const canDecrement = checkCanDecrease(stat)
                return (
                  <div key={stat?.id} className='grid grid-flow-col auto-cols-min gap-x-2'>
                    <div className='uppercase font-bold text-small w-24'>
                      {BASE_STATS_ENUM[stat?.name as BASE_STATS_ENUM]}: &nbsp;
                    </div>
                    {/* <div className='w-10'>{ranger[RANGER_FIELD.STATS][stat?.name as BASE_STATS_ENUM]}</div> */}
                    <div className='w-10'>{getCurrentStatValue(stat?.id)}</div>
                    <div className='flex gap-2'>
                      <div
                        className={classnames({
                          'w-6': true,
                          'cursor-not-allowed': !canIncrement,
                          'cursor-pointer': canIncrement,
                        })}
                      >
                        <Increment onClick={() => stat && updateStat(stat, INCREASE)} disabled={!canIncrement} />
                      </div>
                      <div
                        className={classnames({
                          'w-6': true,
                          'cursor-not-allowed': !canDecrement,
                          'cursor-pointer': canDecrement,
                        })}
                      >
                        <Decrement onClick={() => stat && updateStat(stat, DECREASE)} disabled={!canDecrement} />
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}
