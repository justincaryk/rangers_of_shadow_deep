'use client'

import classnames from 'classnames'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import Decrement from '../parts/decrement'
import Increment from '../parts/increment'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'

import { useMemo, useState } from 'react'

// types
import { DECREASE, INCREASE } from '../rules/creation-rules'
import { BASE_STATS_ENUM } from '../types'
import { MechanicClassType, StatType } from '../../graphql/generated/graphql'
import { Stat } from './types'

// hooks
import { useStatsApi } from './stats-api'
import { useRangerApi } from '../ranger/ranger-api'
import { useAtom } from 'jotai'
import { useStatsBp } from '../ranger/atoms/build-points'

export default function Stats() {
  const [ show, toggleShow ] = useState(false)
  const [ bpSpent ] = useAtom(useStatsBp)
  const { data: stats } = useStatsApi().getStats
  const { data: ranger } = useRangerApi().getRangerById

  const { mutate: mutateStat, status: mutateStatStatus } = useStatsApi().updateMemberStatById

  const totalSpentOnStats = useMemo(() => {
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
    const availablePointsLocal = {
      remainingFromBp: 0,
      remainingFromLvl: 0,
      statLvlGrantCount: 0,
      total: 0,
    }

    if (ranger) {
      const bpAllottedForStats = ranger?.characterById?.characterBpLookupsByCharacterId?.nodes?.[0]?.bpSpentOnStats ?? 0
      const statLevelUps =
        ranger?.characterById?.memberLevelsByCharacterId.nodes.reduce((prev, curr) => {
          if (curr.levelGrantByLevelGrantId?.grantType === MechanicClassType.Stat) {
            return prev + curr.timesGranted
          }
          return prev
        }, 0) ?? 0

      let spentDecremented = totalSpentOnStats
      let pointsFromBpLeft = bpAllottedForStats
      let pointsFromLvlLeft = statLevelUps

      if (totalSpentOnStats > bpAllottedForStats) {
        spentDecremented = spentDecremented - bpAllottedForStats
        pointsFromBpLeft = 0
      } else {
        spentDecremented = 0
        pointsFromBpLeft = bpAllottedForStats - totalSpentOnStats
      }

      if (spentDecremented > 0) {
        pointsFromLvlLeft = pointsFromLvlLeft - spentDecremented
      }

      availablePointsLocal.statLvlGrantCount = statLevelUps
      availablePointsLocal.remainingFromBp = pointsFromBpLeft
      availablePointsLocal.remainingFromLvl = pointsFromLvlLeft
      availablePointsLocal.total = pointsFromBpLeft + pointsFromLvlLeft
    }

    return availablePointsLocal
  }, [ totalSpentOnStats, ranger ])

  // how many build points available for stats

  const checkCanIncrease = (stat: Stat) => {
    // make sure we have points from some source available
    if (availablePoints?.total === 0) {
      return false
    }

    // no armor upgrades
    if (stat.name === BASE_STATS_ENUM.armor) {
      return false
    }

    const currentStatValue = getCurrentStatValue(stat.id)

    if (typeof currentStatValue !== 'number') {
      return false
    }

    const timesUpgraded = currentStatValue - stat.rangerDefault!

    // only allow 1 upgrade per stat at create
    if (timesUpgraded === 0 && availablePoints.remainingFromBp > 0) {
      return true
    }

    const spentBpAtCreate = bpSpent > 0
    const timesUpgradedOnLevels = spentBpAtCreate ? timesUpgraded - 1 : timesUpgraded

    // only 1 upgrade per stat level up
    if (timesUpgradedOnLevels < availablePoints?.remainingFromLvl && availablePoints.remainingFromBp === 0) {
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
      <div className='mt-2 cursor-pointer' onClick={() => toggleShow(!show)}>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader
          content='stats'
          icon={<AdjustmentsHorizontalIcon className='text-rose-600' />}
          // {...(availablePoints.remainingFromBp !== 0
          //   ? {
          //       subtext: 'Available points (from build):',
          //       subvalue: availablePoints.remainingFromBp,
          //     }
          //   : {})}
          subtext='Available points (from build):'
          subvalue={availablePoints?.remainingFromBp}
        />
        <MinorHeader
          content=''
          // {...(availablePoints.remainingFromLvl !== 0
          //   ? {
          //       subtext: 'Available points (from build):',
          //       subvalue: availablePoints.remainingFromLvl,
          //     }
          //   : {})}
          subtext='Available points (from leveling):'
          subvalue={availablePoints?.remainingFromLvl}
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
