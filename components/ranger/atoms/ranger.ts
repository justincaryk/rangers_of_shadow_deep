import { atom } from 'jotai'
import { Ranger, RANGER_FIELD, STATS_ENUM } from '../../types'
import { objectKeys } from '../../utils'
import { BASE_STATS } from '../rules/rules'

const baseRangerStats = Object.assign(
  {},
  ...objectKeys(STATS_ENUM).map(key => {
    const baseStat = BASE_STATS[key]
    return {
      [key]: [ baseStat.val ],
    }
  })
)

const BASE_RANGER: Ranger = {
  [RANGER_FIELD.PERSONAL]: {},
  [RANGER_FIELD.STAT]: baseRangerStats,
  [RANGER_FIELD.SKILLS]: {},
  [RANGER_FIELD.HEROIC_ACTIONS]: [],
  [RANGER_FIELD.SPELLS]: [],
  [RANGER_FIELD.EQUIPMENT]: [],
}

export const useRanger = atom(
  BASE_RANGER,
  (get, set, data: Ranger) => {
    set(useRanger, data)
  }
)
