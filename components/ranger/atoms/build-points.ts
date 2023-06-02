'use client'

import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

import {
  MAX_BP_FOR_RP,
  BASE_BUILD_POINTS,
  MAX_BP_FOR_HEROIC_SPELLS,
  MAX_BP_FOR_SKILLS,
  MAX_BP_FOR_STATS,
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
  const [ , setRpBp ] = useAtom(useSetRecruitmentBp)
  const [ , setHeroicBp ] = useAtom(useSetHeroicActionBp)

  const { data } = useRangerApi().getRangerSummary

  useEffect(() => {
    if (data?.characterById) {
      let totalBp = BASE_BUILD_POINTS

      const { bpSpentOnHeroicAbilities, bpSpentOnRp, bpSpentOnSkills, bpSpentOnStats } =
        data.characterById.characterBpLookupsByCharacterId.nodes[0]

      // only deduct what is allowed at create
      const heroicBpSpent = Math.min(bpSpentOnHeroicAbilities, MAX_BP_FOR_HEROIC_SPELLS)
      const skillBpSpent = Math.min(bpSpentOnSkills, MAX_BP_FOR_SKILLS)
      const statBpSpent = Math.min(bpSpentOnStats, MAX_BP_FOR_STATS)
      const recruitmentBpSpent = Math.min(bpSpentOnRp, MAX_BP_FOR_RP)

      totalBp -= heroicBpSpent
      totalBp -= skillBpSpent
      totalBp -= statBpSpent
      totalBp -= recruitmentBpSpent

      setBp(totalBp)
      setStatsBp(statBpSpent)
      setSkillsBp(skillBpSpent)
      setRpBp(recruitmentBpSpent)
      setHeroicBp(heroicBpSpent)
    }
  }, [ data, setBp, setHeroicBp, setRpBp, setSkillsBp, setStatsBp ])

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
  set(useHeroicActionBp, value)
})

const useSetStatsBp = atom(null, (_get, set, value: number) => {
  set(useStatsBp, value)
})

const useSetSkillsBp = atom(null, (_get, set, value: number) => {
  set(useSkillsBp, value)
})

const useSetRecruitmentBp = atom(0, (_get, set, value: number) => {
  set(useRecruitmentPointsBp, value)
})
