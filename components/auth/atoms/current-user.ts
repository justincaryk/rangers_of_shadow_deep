'use client'

import { atom } from 'jotai'

interface CurrentUser {
  userId: string
  username: string
}

export const useCurrentUser = atom<CurrentUser | null>(null)

export const useSetCurrentUser = atom(
  null,
  (get, set, currentUser: CurrentUser) => {
    set(useCurrentUser, currentUser)
  }
)
