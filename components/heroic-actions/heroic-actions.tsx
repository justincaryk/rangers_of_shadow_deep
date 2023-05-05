'use client'

import { RANGER_LOOKUP_FIELD_HASH_KEYS } from '../types'
import ArrayFieldBase from '../ranger/array-field-base'
import { useHeroicActionApi } from './heroic-actions-api'

export default function HeroicActions() {
  const { data } = useHeroicActionApi().getHeroicActions

  return (
    <ArrayFieldBase
      type={RANGER_LOOKUP_FIELD_HASH_KEYS.HEROIC_ACTIONS}
      data={data?.allHeroicActions?.nodes ?? []}
    />
  )
}
