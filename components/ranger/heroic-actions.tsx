'use client'

import { BoltIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { heroicActions } from '../data'
import Decrement from '../parts/decrement'
import Increment from '../parts/increment'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import { useBpForHeroicSpells, useBuildPoints } from './atoms/ranger-atom'
import { DECREASE, INCREASE } from './rules/rules'

export default function HeroicActions() {
  const [ show, toggleShow ] = useState(false)
  const [ _, updateBuildPoints ] = useAtom(useBuildPoints)
  const [ availBuildPoints, updateHeroicSpellBuildPoints ] =
    useAtom(useBpForHeroicSpells)

  return (
    <div>
      <div className='mt-2'>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} onClick={() => toggleShow(!show)} />
        </div>
        <MinorHeader
          content='heroic abilities'
          icon={<BoltIcon className='text-yellow-400' />}
        />
        <div className='flex gap-2 mt-2 px-2'>
          Available build points:
          <span className='font-bold'>{availBuildPoints}</span>
          <span className='italic text-slate-400'>
            (Shared between Heroic Actions and Spells)
          </span>
        </div>
      </div>
      {show && (
        <div className='px-4 py-5 sm:p-6'>
          {heroicActions.map(ha => (
            <div key={ha.name}>
              <div className='font-semibold capitalize'>{ha.name}</div>
              <div>{ha.desc}</div>
              <div className='w-6'>
                <Increment
                  onClick={() => {
                    updateHeroicSpellBuildPoints(INCREASE)
                    updateBuildPoints(INCREASE)
                  }}
                  disabled={false}
                />
              </div>

              <div className='w-6'>
                <Decrement
                  onClick={() => {
                    updateHeroicSpellBuildPoints(DECREASE)
                    updateBuildPoints(DECREASE)
                  }}
                  disabled={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
