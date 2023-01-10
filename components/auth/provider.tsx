'use client'

import { useAtom } from 'jotai'
import { useRouter, usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect, useMemo } from 'react'
import { PRIVATE_LINK_ROUTES, PUBLIC_LINK_ROUTES } from '../nav/routes'
import { parseJwt } from '../utils'
import { useCurrentUser, useSetCurrentUser } from './atoms/current-user'
import { AUTH_TOKEN } from './types'

export default function AuthProvider({ children }: PropsWithChildren) {
  const [ currentUser ] = useAtom(useCurrentUser)
  const router = useRouter()
  const pathname = usePathname()
  const [ _, setCurrentUser ] = useAtom(useSetCurrentUser)
  const JWT = useMemo(() => localStorage.getItem(AUTH_TOKEN), [])

  // create the session
  useEffect(() => {
    if (JWT && !currentUser) {
      const parsed = parseJwt(JWT)
      if (Object.keys(parsed).length) {
        setCurrentUser({
          userId: parsed.userId,
          username: parsed.username,
        })
        router.push(PRIVATE_LINK_ROUTES.DASHBOARD)

        return
      }
    }
  }, [ currentUser, JWT, setCurrentUser, router ])

  // reroute to signin
  useEffect(() => {
    if (
      !currentUser?.userId &&
      Object.values(PRIVATE_LINK_ROUTES).includes(
        pathname as PRIVATE_LINK_ROUTES
      )
    ) {
      router.replace(PUBLIC_LINK_ROUTES.SIGN_IN)
      return
    }
  }, [ pathname, router, currentUser ])

  return <div>{children}</div>
}
