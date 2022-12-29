'use client'

import { useState } from 'react'
import Input from '../../../components/parts/input'
import MinorHeader from '../../../components/parts/minor-header'
import {
  AdjustmentsHorizontalIcon,
  BoltIcon,
  IdentificationIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import Increment from '../../../components/parts/increment'
import Decrement from '../../../components/parts/decrement'
import classnames from 'classnames'

const MAX_BASE_BP = 10
const MAX_BP_FOR_SKILLS = 3

enum STATS {
  move = 'move',
  fight = 'fight',
  shoot = 'shoot',
  armor = 'armor',
  will = 'will',
  health = 'health',
}

const BASE_STATS = {
  [STATS.move]: { val: 6, canMod: true },
  [STATS.fight]: { val: 2, canMod: true },
  [STATS.shoot]: { val: 1, canMod: true },
  [STATS.armor]: { val: 10, canMod: true },
  [STATS.will]: { val: 4, canMod: true },
  [STATS.health]: { val: 18, canMod: true },
}

const INCREASE = 1
const DECREASE = -1

export default function Ranger() {
  // how many total build points available
  const [bp, setBp] = useState(MAX_BASE_BP)
  // how many build points available for skills
  const [bpAvailForSkills, setBpAvailForSkills] = useState(MAX_BP_FOR_SKILLS)
  const [stats, setStats] = useState(BASE_STATS)

  const updateStat = (stat: STATS, operation: number) => {
    let updatedStat = {
      val: stats[stat].val + operation,
      canMod: operation === INCREASE ? false : true,
    }

    // if decrease - check current stat not lower than base
    if (operation === DECREASE) {
      if (stats[stat].val === BASE_STATS[stat].val) {
        return null
      }
    }

    // if increase
    if (operation === INCREASE) {
      // has bp avail for skills?
      if (bpAvailForSkills === 0) {
        return null
      }
      // can increase this stat?
      if (!stats[stat].canMod) {
        return null
      }
    }

    setBpAvailForSkills(bpAvailForSkills - operation)
    setBp(bp - operation)

    setStats({
      ...stats,
      [stat]: updatedStat,
    })
  }

  return (
    <div className='space-y-6 bg-white'>
      <div>
        <MinorHeader content='personal' icon={<IdentificationIcon />} />
        <div className='px-4 py-5 sm:p-6'>
          <Input placeholder='Ranger Name' label='Ranger Name' />
        </div>
        <div className='font-bold'>Total BP Remaining: {bp}</div>
      </div>
      <div>
        <MinorHeader content='stats' icon={<AdjustmentsHorizontalIcon />} />
        <div className='flex gap-2 mt-2 px-2'>
          Available build points:
          <span className='font-bold'>{bpAvailForSkills}</span>
        </div>
        <div className='py-7 px-2'>
          <div className='flex flex-col space-y-2 w-1/4'>
            {Object.values(STATS).map(stat => {
              const canIncrement =stats[stat].canMod && bpAvailForSkills !== 0
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
      </div>
      <div>
        <MinorHeader content='heroic abilities' icon={<BoltIcon />} />
        <div className='px-4 py-5 sm:p-6'>TODO</div>
      </div>
      <div>
        <MinorHeader content='spells' icon={<SparklesIcon />} />
        <div className='px-4 py-5 sm:p-6'>TODO</div>
      </div>
    </div>
  )
}
