'use client'

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import classnames from 'classnames'
import { useAtom } from 'jotai'
import { useState } from 'react'
import Decrement from '../parts/decrement'
import Increment from '../parts/increment'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import { RANGER_FIELD, STATS_ENUM } from '../types'
import { useGetTrueAvailBp } from '../utils'
import { useBpForStats } from './atoms/build-points'
import { useRanger } from './atoms/ranger'
import { BASE_STATS, DECREASE, INCREASE } from './rules/rules'

export default function Stats() {
  const [ show, toggleShow ] = useState(false)

  // how many build points available for stats
  const [ bpForStats, updateBuildPoints ] = useAtom(useBpForStats)
  const trueAvailBp = useGetTrueAvailBp(bpForStats)

  const [ ranger, updateRanger ] = useAtom(useRanger)

  const checkCanIncrease = (stat: STATS_ENUM) => {
    if (stat === STATS_ENUM.notes) {
      return false
    }

    // make sure we have build points available
    if (trueAvailBp === 0) {
      return false
    }

    // no armor upgrades
    if (stat === STATS_ENUM.armor) {
      return false
    }

    // only 1 upgrade allowed per stat at creation
    if (ranger[RANGER_FIELD.STATS][stat] === BASE_STATS[stat]) {
      return true
    }

    return false
  }

  const checkCanDecrease = (stat: STATS_ENUM) => {
    if (stat === STATS_ENUM.notes) {
      return false
    }
    
    if (ranger[RANGER_FIELD.STATS][stat] > BASE_STATS[stat]) {
      return true
    }

    return false
  }

  const updateStat = (stat: STATS_ENUM, modifier: number) => {
    if (modifier === INCREASE) {
      if (!checkCanIncrease(stat)) {
        return null
      }
    } else {
      if (!checkCanDecrease(stat)) {
        return null
      }
    }
    const currentStats = ranger[RANGER_FIELD.STATS]
    const currentSkillValue = currentStats[stat]

    // update ranger state
    updateRanger({
      ...ranger,
      [RANGER_FIELD.STATS]: {
        ...currentStats,
        [stat]: currentSkillValue + modifier,
      },
    })

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
          minorBuildPoints={trueAvailBp}
        />
      </div>
      {show && (
        <div className='px-4 py-4 sm:p-6'>
          <div className='flex flex-col space-y-2 w-1/4'>
            {Object.values(STATS_ENUM)
              .filter(stat => stat != STATS_ENUM.notes)
              .map(stat => {
              const canIncrement = checkCanIncrease(stat)
              const canDecrement = checkCanDecrease(stat)
              return (
                <div key={stat} className='grid grid-cols-3 gap-x-4'>
                  <div className='uppercase font-bold text-small'>{stat}:</div>
                  {ranger[RANGER_FIELD.STATS][stat]}
                  <div className='flex gap-2'>
                    <div
                      className={classnames({
                        'w-6': true,
                        'cursor-not-allowed': !canIncrement,
                        'cursor-pointer': canIncrement,
                      })}
                    >
                      <Increment
                        onClick={() => updateStat(stat, INCREASE)}
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
                        onClick={() => updateStat(stat, DECREASE)}
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
