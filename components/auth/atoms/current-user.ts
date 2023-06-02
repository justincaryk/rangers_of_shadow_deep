'use client'

import { atom } from 'jotai'
import { UserRole } from '../../../graphql/generated/graphql'

export interface CurrentUser {
  userId: string
  username: string
  userRole: UserRole
  jwt: string
}

export const useCurrentUser = atom<CurrentUser | null>(null)

export const useSetCurrentUser = atom(null, (get, set, currentUser: CurrentUser) => {
  set(useCurrentUser, currentUser)
})
