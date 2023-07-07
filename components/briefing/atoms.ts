import { atom } from 'jotai'
import { AllRangersCharacter } from '../ranger/types'
import { BASE_RECRUITMENT_POINTS } from '../rules/creation-rules'
import { FriendsMissionRestrictions, PLAYERS_TO_COMPANIONS_MAP, PLAYER_KEYS } from '../types'
import { getAdjustedRecruitmentPoints, objectKeys } from '../utils'

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
  // set the players
  const players = PLAYERS_TO_COMPANIONS_MAP[value].players
  const companions = PLAYERS_TO_COMPANIONS_MAP[value].companions
  set(usePlayerCount, players)

  // update RP
  const ranger = get(useDeployedRanger)
  const bonusRp = ranger?.totalRecruitmentPoints || 0
  set(useSetFriendsRestrictions, {
    recruitmentPoints: calculateRecruitmentPoints(value, bonusRp),
    maxCompanions: companions,
  })
})

export const useDeployedRanger = atom<null | AllRangersCharacter>(null)

export const useSetDeployedRanger = atom(null, (get, set, value: AllRangersCharacter) => {
  // set ranger
  set(useDeployedRanger, value)

  // update RP
  const playerCount = get(usePlayerCount)
  const playerKey = objectKeys(PLAYERS_TO_COMPANIONS_MAP).find(key => PLAYERS_TO_COMPANIONS_MAP[key].players === playerCount) || PLAYER_KEYS.ONE
  const currentRestrictions = get(useFriendsRestrictions)
  set(useSetFriendsRestrictions, {
    ...currentRestrictions,
    recruitmentPoints: calculateRecruitmentPoints(playerKey, value.totalRecruitmentPoints),
  })
})

export const useDeployedFriends = atom<string[]>([])

export const useSetDeployedFriends = atom(null, (_, set, value: string[]) => {
  set(useDeployedFriends, value)
})

function calculateRecruitmentPoints(players: PLAYER_KEYS, bonusRp?: number) {
  const adjustedBase = getAdjustedRecruitmentPoints(players, bonusRp)
  return adjustedBase
}
