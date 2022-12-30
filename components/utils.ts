import { STATS_ENUM } from './types'

export const INCREASE = 1
export const DECREASE = -1

export const MAX_BP_FOR_SKILLS = 3
export const MAX_BP_FOR_HEROIC_ACTIONS_AND_SPELLS = 5

export const BASE_STATS = {
  [STATS_ENUM.move]: { val: 6, canMod: true },
  [STATS_ENUM.fight]: { val: 2, canMod: true },
  [STATS_ENUM.shoot]: { val: 1, canMod: true },
  [STATS_ENUM.armor]: { val: 10, canMod: true },
  [STATS_ENUM.will]: { val: 4, canMod: true },
  [STATS_ENUM.health]: { val: 18, canMod: true },
}
