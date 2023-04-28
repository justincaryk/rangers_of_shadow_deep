import { atom } from 'jotai'
import { usePlayers } from '../../companions/atoms/players'
import { useSetAdjustedRecruitmentPoints } from '../../companions/atoms/recruitment-points'
import {
  BASE_RECRUITMENT_POINTS,
  MAX_BUILD_POINTS_FOR_RP,
  RP_BONUS_PER_BUILD_POINT,
} from '../../rules/companion-rules'

import {
  BASE_BUILD_POINTS,
  MAX_BP_FOR_HEROIC_ACTIONS_AND_SPELLS,
  MAX_BP_FOR_SKILLS,
  MAX_BP_FOR_STATS,
} from '../../rules/ranger-rules'
import { getAdjustedRecruitmentPoints } from '../../utils'

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

export const useBpForSkills = atom(0, (get, set, modifier: number) => {
  const current = get(useBpForSkills)
  const validModifier =
    current < MAX_BP_FOR_SKILLS || (modifier < 0 && current > 0) ? modifier : 0

  // update the total
  useUpdateBuildPoints.write(get, set, validModifier)

  // update the baby
  set(useBpForSkills, get(useBpForSkills) + validModifier)
})

export const useBpForRecruitmentPoints = atom(
  0,
  (get, set, modifier: number) => {
    const current = get(useBpForRecruitmentPoints)
    const validModifier =
      current < MAX_BUILD_POINTS_FOR_RP || (modifier < 0 && current > 0)
        ? modifier
        : 0

    // update the total
    useUpdateBuildPoints.write(get, set, validModifier)

    const updatedVal = get(useBpForRecruitmentPoints) + validModifier

    // update the baby
    set(useBpForRecruitmentPoints, updatedVal)

    // update adjusted RP.
    // CALC: ( base RP + RP conferred by BP spent ) -> adjusted by player count
    // const players = get(usePlayers)
    // const rpTotal =
    //   BASE_RECRUITMENT_POINTS + updatedVal * RP_BONUS_PER_BUILD_POINT
    // const adjustedRp = getAdjustedRecruitmentPoints(players, rpTotal)
    // set(useSetAdjustedRecruitmentPoints, adjustedRp)
  }
)
