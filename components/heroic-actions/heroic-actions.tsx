'use client'

import { heroicActions } from '../data'
import { RANGER_FIELD } from '../types'
import ArrayFieldBase from '../ranger/array-field-base'
import { useHeroicActionApi } from './heroic-actions-api'

export default function HeroicActions() {
  const { data } = useHeroicActionApi().getHeroicActions

  return (
    <ArrayFieldBase type={RANGER_FIELD.HEROIC_ACTIONS} data={data?.allHeroicActions?.nodes ?? []} />
  )
}
