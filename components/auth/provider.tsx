'use client'

import { useAtom } from 'jotai'
import { useRouter, usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import Loading from '../../app/loading'
import { PRIVATE_LINK_ROUTES, PUBLIC_LINK_ROUTES } from '../nav/routes'
import { parseJwt } from '../utils'
import { useCurrentUser, useSetCurrentUser } from './atoms/current-user'
import { AUTH_TOKEN } from './types'

export default function AuthProvider({ children }: PropsWithChildren) {
  const [ currentUser ] = useAtom(useCurrentUser)
  const router = useRouter()
  const pathname = usePathname()
  const [ _, setCurrentUser ] = useAtom(useSetCurrentUser)
  // don't render anything until check dependencies are ready
  const [ hydrating, setHydrating ] = useState(true)
  // don't render anything unless the auth checks have resolved
  const [ readyToRender, setReadyToRender ] = useState(false)

  // create the session
  useEffect(() => {
    const JWT = localStorage.getItem(AUTH_TOKEN)

    if (JWT && !currentUser) {
      const parsed = parseJwt(JWT)
      if (Object.keys(parsed).length) {
        setCurrentUser({
          userId: parsed.user_id,
          username: parsed.username,
          jwt: JWT,
        })
      }
    }

    setHydrating(false)
  }, [ currentUser, setCurrentUser, router ])

  useEffect(() => {
    // reroute FROM public pages if signed in
    if (
      currentUser?.userId &&
      Object.values(PUBLIC_LINK_ROUTES).includes(pathname as PUBLIC_LINK_ROUTES) &&
      !hydrating
    ) {
      router.replace(PRIVATE_LINK_ROUTES.DASHBOARD)
    }
    // reroute TO signin if signed out
    else if (
      !currentUser?.userId &&
      Object.values(PRIVATE_LINK_ROUTES).includes(pathname as PRIVATE_LINK_ROUTES) &&
      !hydrating
    ) {
      router.replace(PUBLIC_LINK_ROUTES.SIGN_IN)
    }

    if (!hydrating) {
      setReadyToRender(true)
    }
  }, [ pathname, router, currentUser, hydrating ])

  if (!readyToRender) {
    return <Loading />
  }

  return <div>{children}</div>
}
