import { STATS_ENUM } from '../../types'

export const INCREASE = 1
export const DECREASE = -1

export const BASE_BUILD_POINTS = 10
export const MAX_BP_FOR_STATS = 3
export const MAX_BP_FOR_HEROIC_ACTIONS_AND_SPELLS = 5
export const MAX_BP_FOR_SKILLS = 5
export const SKILL_POINTS_PER_BP = 8

export const BASE_STATS = {
  [STATS_ENUM.move]: 6,
  [STATS_ENUM.fight]: 2,
  [STATS_ENUM.shoot]: 1,
  [STATS_ENUM.armor]: 10,
  [STATS_ENUM.will]: 4,
  [STATS_ENUM.health]: 18,
}
