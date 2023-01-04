import { heroicActions } from '../data'
import { RANGER_FIELD } from '../types'
import ArrayFieldBase from './array-field-base'

export default function HeroicActions() {
  return (
    <ArrayFieldBase type={RANGER_FIELD.HEROIC_ACTIONS} data={heroicActions} />
  )
}
