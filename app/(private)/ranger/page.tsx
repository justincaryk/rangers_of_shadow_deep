'use client'

import { useState } from 'react'
import Input from '../../../components/parts/input'
import MinorHeader from '../../../components/parts/minor-header'
import { IdentificationIcon } from '@heroicons/react/24/outline'

import Stats from '../../../components/ranger/stats'
import HeroicActions from '../../../components/ranger/heroic-actions'
import Spells from '../../../components/ranger/spells'
import Equipment from '../../../components/ranger/equipment'
import Skills from '../../../components/ranger/skills'

const MAX_BASE_BP = 10

export default function Ranger() {
  // how many total build points available
  const [ bp, setBp ] = useState(MAX_BASE_BP)

  const updateBp = (modifier: number) => {
    setBp(bp - modifier)
  }

  return (
    <div className='space-y-6 bg-white divide-y divide-dashed'>
      {/* PERSONAL INFO */}
      <div>
        <MinorHeader
          content='personal'
          icon={<IdentificationIcon className='text-emerald-400' />}
        />
        <div className='px-4 py-5 sm:p-6'>
          <Input placeholder='Ranger Name' label='Ranger Name' />
        </div>
        <div className='font-bold'>Total BP Remaining: {bp}</div>
      </div>
      <Stats updateBp={updateBp} />
      <HeroicActions updateBp={updateBp} />
      <Spells updateBp={updateBp} />
      <Skills updateBp={updateBp} />
      <Equipment />
    </div>
  )
}
