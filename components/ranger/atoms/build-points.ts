'use client'

import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

import {
  MAX_BP_FOR_RP,
  RECRUITMENT_POINTS_PER_BP,
  BASE_BUILD_POINTS,
  MAX_BP_FOR_HEROIC_SPELLS,
  MAX_BP_FOR_SKILLS,
  MAX_BP_FOR_STATS,
  SKILL_POINTS_PER_BP,
} from '../../rules/creation-rules'

import { useRangerApi } from '../ranger-api'

// read only atoms - always export
export const useHeroicActionBp = atom(MAX_BP_FOR_HEROIC_SPELLS)
export const useBuildPoints = atom(BASE_BUILD_POINTS)
export const useStatsBp = atom(MAX_BP_FOR_STATS)
export const useSkillsBp = atom(0)
export const useRecruitmentPointsBp = atom(0)

// hook to keep all the bp in sync.

export function useSyncRangerBp() {
  const [ , setBp ] = useAtom(useSetCurrentBuildPoints)
  const [ , setStatsBp ] = useAtom(useSetStatsBp)
  const [ , setSkillsBp ] = useAtom(useSetSkillsBp)
  const [ , setRpBp ] = useAtom(useSetSkillsBp)
  const [ , setHeroicBp ] = useAtom(useSetHeroicActionBp)

  const { data } = useRangerApi().getRangerById

  useEffect(() => {
    if (data?.characterById) {
      let totalBp = BASE_BUILD_POINTS

      const { totalHeroicActions, totalStatPoints, totalRecruitmentPoints, totalSkillPoints } = data.characterById

      const skillPointsConvertedToBp = Math.floor(totalSkillPoints / SKILL_POINTS_PER_BP)
      const recruitmentPointsConvertedToBp = Math.floor(totalRecruitmentPoints / RECRUITMENT_POINTS_PER_BP)

      // only deduct what is allowed at create
      const heroicMod = Math.min(totalHeroicActions, MAX_BP_FOR_HEROIC_SPELLS)
      const skillMod = Math.min(skillPointsConvertedToBp, MAX_BP_FOR_SKILLS)
      const statMod = Math.min(totalStatPoints, MAX_BP_FOR_STATS)
      const recruitmentMod = Math.min(recruitmentPointsConvertedToBp, MAX_BP_FOR_RP)

      totalBp -= heroicMod
      totalBp -= skillMod
      totalBp -= statMod
      totalBp -= recruitmentMod

      setBp(totalBp)
      setStatsBp(MAX_BP_FOR_STATS - statMod)
      setSkillsBp(MAX_BP_FOR_SKILLS - skillMod)
      setRpBp(MAX_BP_FOR_RP - recruitmentMod)
      setHeroicBp(MAX_BP_FOR_HEROIC_SPELLS - heroicMod)
    }
  }, [ data ])

  return null
}

// all update atoms. these should not be exported

const useSetCurrentBuildPoints = atom(
  get => get(useBuildPoints),
  (get, set, value: number) => {
    set(useBuildPoints, value)
  }
)

const useSetHeroicActionBp = atom(MAX_BP_FOR_HEROIC_SPELLS, (get, set, value: number) => {
  set(useSetHeroicActionBp, value)
})

const useSetStatsBp = atom(null, (_get, set, value: number) => {
  set(useStatsBp, value)
})

const useSetSkillsBp = atom(0, (_get, set, value: number) => {
  set(useSetSkillsBp, value)
})

const useSetRecruitmentBp = atom(0, (_get, set, value: number) => {
  set(useSetRecruitmentBp, value)
})
