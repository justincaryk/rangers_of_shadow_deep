'use client'

import { useState } from 'react'

import Personal from '../../../components/ranger/personal'
import Stats from '../../../components/ranger/stats'
import HeroicActionsAndSpells from '../../../components/ranger/heroic-actions-spells'
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
      <Personal bp={bp} />
      <Stats updateBp={updateBp} />
      <HeroicActionsAndSpells updateBp={updateBp} />
      <Skills updateBp={updateBp} />
      <Equipment />
    </div>
  )
}
