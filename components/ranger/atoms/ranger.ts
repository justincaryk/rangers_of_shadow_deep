import { atom } from 'jotai'
import { Ranger, STATS_ENUM } from '../../types'
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
  personal: {},
  stats: baseRangerStats,
  skills: {},
  heroicActions: [],
  spells: [],
  equipment: [],
}

export const ranger = atom(BASE_RANGER)

export const useRanger = atom(
  get => get(ranger),
  (get, set, data: Ranger) => {
    set(ranger, data)
  }
)
