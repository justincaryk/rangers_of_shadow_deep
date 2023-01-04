'use client'

import { BoltIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { HeroicAction, heroicActions } from '../data'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import { useBpForHeroicSpells, useBuildPoints } from './atoms/build-points'
import { useRanger } from './atoms/ranger'
import { DECREASE, INCREASE } from './rules/rules'

export default function HeroicActions() {
  const [ show, toggleShow ] = useState(false)
  const [ totalBuildPoints ] = useAtom(useBuildPoints)
  const [ minorBuildPoints, updateHeroicSpellBuildPoints ] =
    useAtom(useBpForHeroicSpells)
  const [ ranger, updateRanger ] = useAtom(useRanger)

  const handleHeroicActionClicked = (action: HeroicAction) => {
    // if no build points
    if (totalBuildPoints === 0 || minorBuildPoints === 0) {
      return null
    }

    // remove it
    if (ranger.heroicActions.indexOf(action.name) > -1) {
      updateRanger({
        ...ranger,
        heroicActions: ranger.heroicActions.filter(ha => ha != action.name),
      })
      // update build points
      updateHeroicSpellBuildPoints(DECREASE)
    }
    // add it
    else {
      updateRanger({
        ...ranger,
        heroicActions: [ ...ranger.heroicActions, action.name ],
      })
      // update build points
      updateHeroicSpellBuildPoints(INCREASE)
    }
  }
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
          <span className='font-bold'>{minorBuildPoints}</span>
          <span className='italic text-slate-400'>
            (Shared between Heroic Actions and Spells)
          </span>
        </div>
      </div>
      {show && (
        <div className='px-4 py-5 sm:p-6'>
          {heroicActions.map(ha => (
            <div key={ha.name}>
              <div className='flex content-between'>
                <div className='font-semibold capitalize'>{ha.name}</div>
                <button onClick={() => handleHeroicActionClicked(ha)}>
                  {ranger.heroicActions.indexOf(ha.name) > -1
                    ? 'Remove'
                    : 'Add'}
                </button>
              </div>
              <div>{ha.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
