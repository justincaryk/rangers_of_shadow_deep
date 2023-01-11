import { BASE_STATS_ENUM } from '../../types'

export const INCREASE = 1
export const DECREASE = -1

export const BASE_BUILD_POINTS = 10
export const MAX_BP_FOR_STATS = 3
export const MAX_BP_FOR_HEROIC_ACTIONS_AND_SPELLS = 5
export const MAX_BP_FOR_SKILLS = 5
export const SKILL_POINTS_PER_BP = 8

export const BASE_STATS = {
  [BASE_STATS_ENUM.move]: 6,
  [BASE_STATS_ENUM.fight]: 2,
  [BASE_STATS_ENUM.shoot]: 1,
  [BASE_STATS_ENUM.armor]: 10,
  [BASE_STATS_ENUM.will]: 4,
  [BASE_STATS_ENUM.health]: 18,
}
