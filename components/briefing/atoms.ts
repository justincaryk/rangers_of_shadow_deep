import { atom } from 'jotai'

// import {
//   MAX_BP_FOR_RP,
//   BASE_BUILD_POINTS,
//   MAX_BP_FOR_HEROIC_SPELLS,
//   MAX_BP_FOR_SKILLS,
//   MAX_BP_FOR_STATS,
// } from '../../rules/creation-rules'

export const usePlayerCount = atom(1)

export const useSetPlayerCount = atom(null, (_, set, value: number) => {
  set(usePlayerCount, value)
})

export const useDeployedRanger = atom<null | string>(null)

export const useSetDeployedRanger = atom(null, (_, set, value: string) => {
  set(useDeployedRanger, value)
})
