import { BASE_STATS_ENUM } from '../types'

export const INCREASE = 1
export const DECREASE = -1

// Build Points & Create Constraints
export const BASE_BUILD_POINTS = 10
export const BASE_RECRUITMENT_POINTS = 100
export const MAX_BP_FOR_STATS = 3
export const MAX_BP_FOR_HEROIC_SPELLS = 5
export const MAX_BP_FOR_SKILLS = 5
export const MAX_BP_FOR_RP = 3
export const MAX_ITEM_SLOTS = 6
export const MAX_ARMOR_SLOT = 1
export const MAX_STARTING_ITEM_SLOTS = 5

// Build Point Conversions Values:
export const SKILL_POINTS_PER_BP = 8
export const RECRUITMENT_POINTS_PER_BP = 10
export const RECRUITMENT_POINTS_PER_LEADERSHIP_POINT = 1
export const INITIAL_RECRUIT_SKILL_BUMP = 3

// type Mapped<T> = {
//   [Prop in keyof T]: number
// }
// interface BaseStats extends Mapped<SetBaseStatsMutationVariables> {}

// export const BASE_STATS: BaseStats = {
export const BASE_STATS = {
  [BASE_STATS_ENUM.move]: 6,
  [BASE_STATS_ENUM.fight]: 2,
  [BASE_STATS_ENUM.shoot]: 1,
  [BASE_STATS_ENUM.armor]: 10,
  [BASE_STATS_ENUM.will]: 4,
  [BASE_STATS_ENUM.health]: 18,
}
