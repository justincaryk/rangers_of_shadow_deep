import { atom } from 'jotai'
import { Ranger, RANGER_FIELD } from '../../types'
import { BASE_STATS } from '../../rules/ranger-rules'

const BASE_RANGER: Ranger = {
  id: null,
  [RANGER_FIELD.CORE]: {},
  [RANGER_FIELD.STATS]: BASE_STATS,
  [RANGER_FIELD.SKILLS]: {},
  [RANGER_FIELD.HEROIC_ACTIONS]: [],
  [RANGER_FIELD.SPELLS]: [],
  [RANGER_FIELD.EQUIPMENT]: {
    weapons: [],
    armor: [],
    equipment: [],
  },
}

export const useRanger = atom(BASE_RANGER,
  (get, set, data: Ranger) => {
    set(useRanger, data)
  }
)
