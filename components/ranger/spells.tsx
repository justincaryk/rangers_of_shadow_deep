'use client'

import { SparklesIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { spells } from '../data'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import { HeroicActionAndSpellsProps } from '../types'

export default function Spells({
  updateBp,
  bpAvail,
}: HeroicActionAndSpellsProps) {
  const [ show, toggleShow ] = useState(false)

  return (
    <div>
      <div className='mt-2'>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} onClick={() => toggleShow(!show)} />
        </div>
        <MinorHeader
          content='spells'
          icon={<SparklesIcon className='text-pink-400' />}
        />
        <div className='flex gap-2 mt-2 px-2'>
          Available build points:
          <span className='font-bold'>{bpAvail}</span>
          <span className='italic text-slate-400'>
            (Shared between Heroic Actions and Spells)
          </span>
        </div>
      </div>
      {show && (
        <div className='px-4 py-5 sm:p-6'>
          {spells.map(spell => (
            <div key={spell.name}>
              <div className='font-semibold capitalize'>{spell.name}</div>
              <div>{spell.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
