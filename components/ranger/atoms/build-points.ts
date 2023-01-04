import { atom } from 'jotai'

import {
  BASE_BUILD_POINTS,
  MAX_BP_FOR_HEROIC_ACTIONS_AND_SPELLS,
  MAX_BP_FOR_SKILLS,
  MAX_BP_FOR_STATS,
} from '../rules/rules'

export const useBuildPoints = atom(BASE_BUILD_POINTS)

const useUpdateBuildPoints = atom(null, (get, set, modifier: number) => {
  set(useBuildPoints, get(useBuildPoints) - modifier)
})

export const useBpForHeroicSpells = atom(
  MAX_BP_FOR_HEROIC_ACTIONS_AND_SPELLS,
  (get, set, modifier: number) => {
    // update the total
    useUpdateBuildPoints.write(get, set, modifier)

    // update the baby
    set(useBpForHeroicSpells, get(useBpForHeroicSpells) - modifier)
  }
)

export const useBpForStats = atom(
  MAX_BP_FOR_STATS,
  (get, set, modifier: number) => {
    // update the total
    useUpdateBuildPoints.write(get, set, modifier)

    // update the baby
    set(useBpForStats, get(useBpForStats) - modifier)
  }
)

export const useBpForSkills = atom(
  MAX_BP_FOR_SKILLS,
  (get, set, modifier: number) => {
    // update the total
    useUpdateBuildPoints.write(get, set, modifier)

    // update the baby
    set(useBpForSkills, get(useBpForSkills) - modifier)
  }
)
