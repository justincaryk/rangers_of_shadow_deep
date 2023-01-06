import { atom } from 'jotai'
import { PLAYER_COUNT } from '../../types'

export const usePlayers = atom(PLAYER_COUNT.ONE)

export const useUpdatePlayerCount = atom(
  (get => get(usePlayers)),
  (get, set, players: PLAYER_COUNT) => {
    set(usePlayers, players)
  }
)
