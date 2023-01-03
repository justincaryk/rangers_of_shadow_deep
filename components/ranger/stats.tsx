'use client'

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import classnames from 'classnames'
import { useAtom } from 'jotai'
import { useState } from 'react'
import Decrement from '../parts/decrement'
import Increment from '../parts/increment'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import { STATS_ENUM } from '../types'
import { useBuildPoints } from './atoms/ranger-atom'
import { BASE_STATS,DECREASE, INCREASE, MAX_BP_FOR_SKILLS } from './rules/rules' 

export default function Stats() {
  // how many build points available for skills
  const [ bpAvailForSkills, setBpAvailForSkills ] = useState(MAX_BP_FOR_SKILLS)
  const [ _, updateBuildPoints ] = useAtom(useBuildPoints)
  const [ stats, setStats ] = useState(BASE_STATS)
  const [ show, toggleShow ] = useState(false)

  const updateStat = (stat: STATS_ENUM, modifier: number) => {
    let updatedStat = {
      val: stats[stat].val + modifier,
      canMod: modifier === INCREASE ? false : true,
    }

    // if decrease - check current stat not lower than base
    if (modifier === DECREASE) {
      if (stats[stat].val === BASE_STATS[stat].val) {
        return null
      }
    }

    // if increase
    if (modifier === INCREASE) {
      // has bp avail for skills?
      if (bpAvailForSkills === 0) {
        return null
      }
      // can increase this stat?
      if (!stats[stat].canMod) {
        return null
      }
    }

    setBpAvailForSkills(bpAvailForSkills - modifier)
    // update state
    updateBuildPoints(modifier)

    setStats({
      ...stats,
      [stat]: updatedStat,
    })
  }

  return (
    <div>
      <div className='mt-2'>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} onClick={() => toggleShow(!show)} />
        </div>
        <MinorHeader content='stats' icon={<AdjustmentsHorizontalIcon />} />
        <div className='flex gap-2 mt-2 px-2'>
          Available build points:
          <span className='font-bold'>{bpAvailForSkills}</span>
        </div>
      </div>
      {show && (
        <div className='px-4 py-4 sm:p-6'>
          <div className='flex flex-col space-y-2 w-1/4'>
            {Object.values(STATS_ENUM).map(stat => {
              const canIncrement = stats[stat].canMod && bpAvailForSkills !== 0
              const canDecrement = stats[stat].val !== BASE_STATS[stat].val
              return (
                <div key={stat} className='grid grid-cols-3 gap-x-4'>
                  <div className='uppercase font-bold text-small'>{stat}:</div>
                  {stats[stat].val}
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
