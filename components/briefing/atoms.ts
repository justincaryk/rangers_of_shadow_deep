import { atom } from 'jotai'
import { BASE_RECRUITMENT_POINTS } from '../rules/creation-rules'
import { FriendsMissionRestrictions, PLAYERS_TO_COMPANIONS_MAP, PLAYER_KEYS } from '../types'
import { getAdjustedRecruitmentPoints } from '../utils'

export const useFriendsRestrictions = atom<FriendsMissionRestrictions>({
  maxCompanions: PLAYERS_TO_COMPANIONS_MAP.ONE.companions,
  recruitmentPoints: BASE_RECRUITMENT_POINTS,
})

// CALCULATIONS SHOULD BE DONE HERE
const useSetFriendsRestrictions = atom(null, (_, set, value: FriendsMissionRestrictions) => {
  set(useFriendsRestrictions, value)
})

export const usePlayerCount = atom<number>(1)

export const useSetPlayerCount = atom(null, (get, set, value: PLAYER_KEYS) => {
  const players = PLAYERS_TO_COMPANIONS_MAP[value].players
  const companions = PLAYERS_TO_COMPANIONS_MAP[value].companions

  set(usePlayerCount, players)

  const curr = get(useFriendsRestrictions)
  set(useSetFriendsRestrictions, {
    ...curr,
    recruitmentPoints: calculateRecruitmentPoints(value),
    maxCompanions: companions,
  })
})

export const useDeployedRanger = atom<null | string>(null)

export const useSetDeployedRanger = atom(null, (_, set, value: string) => {
  set(useDeployedRanger, value)
})

export const useDeployedFriends = atom<string[]>([])

export const useSetDeployedFriends = atom(null, (_, set, value: string[]) => {
  set(useDeployedFriends, value)
})

function calculateRecruitmentPoints(players: PLAYER_KEYS) {
  const adjustedBase = getAdjustedRecruitmentPoints(players)
  return adjustedBase
}
