'use client'

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import classnames from 'classnames'
import { useAtom } from 'jotai'
import { useState } from 'react'
import Decrement from '../parts/decrement'
import Increment from '../parts/increment'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import { RANGER_FIELD, BASE_STATS_ENUM } from '../types'
import { useGetTrueAvailBp } from '../utils'
import { useBpForStats } from '../ranger/atoms/build-points'
import { useRanger } from '../ranger/atoms/ranger'
import { BASE_STATS, DECREASE, INCREASE } from '../rules/ranger-rules'
import { useStatsApi } from './stats-api'
import { StatCondition, StatType } from '../../graphql/generated/graphql'

export default function Stats() {
  const [ show, toggleShow ] = useState(false)

  const { data, status } = useStatsApi().getStats

  // how many build points available for stats
  const [ bpForStats, updateBuildPoints ] = useAtom(useBpForStats)
  const trueAvailBp = useGetTrueAvailBp(bpForStats)

  const [ ranger, updateRanger ] = useAtom(useRanger)

  const checkCanIncrease = (stat: BASE_STATS_ENUM) => {
    // make sure we have build points available
    if (trueAvailBp === 0) {
      return false
    }

    // no armor upgrades
    if (stat === BASE_STATS_ENUM.armor) {
      return false
    }

    // only 1 upgrade allowed per stat at creation
    if (ranger[RANGER_FIELD.STATS][stat] === BASE_STATS[stat]) {
      return true
    }

    return false
  }

  const checkCanDecrease = (stat: BASE_STATS_ENUM) => {
    if (ranger[RANGER_FIELD.STATS][stat] > BASE_STATS[stat]) {
      return true
    }

    return false
  }

  const updateStat = (stat: StatCondition, modifier: number) => {
    if (modifier === INCREASE) {
      if (!checkCanIncrease(stat.name as BASE_STATS_ENUM)) {
        return null
      }
    } else {
      if (!checkCanDecrease(stat.name as BASE_STATS_ENUM)) {
        return null
      }
    }
    // const currentStats = ranger[RANGER_FIELD.STATS]
    // const currentSkillValue = currentStats[stat]

    // update ranger state
    // updateRanger({
    //   ...ranger,
    //   [RANGER_FIELD.STATS]: {
    //     ...currentStats,
    //     [stat]: currentSkillValue + modifier,
    //   },
    // })

    // update build points
    updateBuildPoints(modifier)
  }

  return (
    <div>
      <div className='mt-2'>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} onClick={() => toggleShow(!show)} />
        </div>
        <MinorHeader
          content='stats'
          icon={<AdjustmentsHorizontalIcon />}
          subtext='Available build points:'
          subvalue={trueAvailBp}
        />
      </div>
      {show && (
        <div className='px-4 py-4 sm:p-6'>
          <div className='flex flex-col space-y-2'>
            {data?.allStats?.nodes
              .filter(stat => stat?.statType === StatType.Base)
              .map(stat => {
                const canIncrement = checkCanIncrease(
                  stat?.name as BASE_STATS_ENUM
                )
                const canDecrement = checkCanDecrease(
                  stat?.name as BASE_STATS_ENUM
                )
                return (
                  <div key={stat?.id} className='grid grid-flow-col auto-cols-min gap-x-2'>
                    <div className='uppercase font-bold text-small w-24'>
                      {BASE_STATS_ENUM[stat?.name as BASE_STATS_ENUM]}: &nbsp;
                    </div>
                    <div className='w-10'>{ranger[RANGER_FIELD.STATS][stat?.name as BASE_STATS_ENUM]}</div>
                    <div className='flex gap-2'>
                      <div
                        className={classnames({
                          'w-6': true,
                          'cursor-not-allowed': !canIncrement,
                          'cursor-pointer': canIncrement,
                        })}
                      >
                        <Increment
                          onClick={() => stat && updateStat(stat, INCREASE)}
                          disabled={!canIncrement}
                        />
                      </div>
                      <div
                        className={classnames({
                          'w-6': true,
                          'cursor-not-allowed': !canDecrement,
                          'cursor-pointer': canDecrement,
                        })}
                      >
                        <Decrement
                          onClick={() => stat && updateStat(stat, DECREASE)}
                          disabled={!canDecrement}
                        />
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
