'use client'

import { RANGER_LOOKUP_FIELD_HASH_KEYS } from '../types'
import ArrayFieldBase from '../ranger/array-field-base'

import { useSpellsApi } from './spells-api'

export default function HeroicActions() {
  const { data } = useSpellsApi().getSpells

  return (
    <ArrayFieldBase
      type={RANGER_LOOKUP_FIELD_HASH_KEYS.SPELLS}
      data={data?.allSpells?.nodes ?? []}
    />
  )
}
