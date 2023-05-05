import { RANGER_FIELD } from '../types'
import ArrayFieldBase from '../ranger/array-field-base'

import { useSpellsApi } from './spells-api'

export default function HeroicActions() {
  const { data } = useSpellsApi().getSpells

  return <ArrayFieldBase type={RANGER_FIELD.SPELLS} data={data?.allSpells?.nodes ?? []} />
}
