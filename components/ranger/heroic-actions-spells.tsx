'use client'

import { useState } from 'react'
import { RangerComponentProps } from '../types'
import { MAX_BP_FOR_HEROIC_ACTIONS_AND_SPELLS } from '../utils'
import HeroicActions from './heroic-actions'
import Spells from './spells'

export default function HeroicActionsAndSpells({
  updateBp,
}: RangerComponentProps) {
  const [ bpAvail, setBpAvail ] = useState(MAX_BP_FOR_HEROIC_ACTIONS_AND_SPELLS)

  return (
    <>
      <HeroicActions updateBp={updateBp} bpAvail={bpAvail} />
      <Spells updateBp={updateBp} bpAvail={bpAvail} />
    </>
  )
}
