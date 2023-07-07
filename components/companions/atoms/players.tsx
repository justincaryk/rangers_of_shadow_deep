import { atom } from 'jotai'
import { PLAYER_KEYS } from '../../types'

export const usePlayers = atom(PLAYER_KEYS.ONE)

export const useUpdatePlayerCount = atom(
  get => get(usePlayers),
  (get, set, players: PLAYER_KEYS) => {
    set(usePlayers, players)
  }
)
