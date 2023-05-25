'use client'

import { useAtom } from 'jotai'
import { useCurrentUser, useSetCurrentUser } from './atoms/current-user'
import { useRouter, usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'

import Loading from '../../app/loading'

import { PRIVATE_ROUTE_URLS, DYNAMIC_ROUTE_BASE_URLS, PUBLIC_ROUTE_URLS, PublicPathname, PrivatePathname } from '../nav/routes'

import { parseJwt } from '../utils'

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

  const privateRoutes = useMemo(() => Object.values(PRIVATE_ROUTE_URLS), [])
  const dynamicRouteBases = useMemo(() => Object.values(DYNAMIC_ROUTE_BASE_URLS), [])
  const publicRoutes = useMemo(() => Object.values(PUBLIC_ROUTE_URLS), [])

  const isPublicRoute = useMemo(() => {
    return publicRoutes.includes(pathname as PublicPathname)
  }, [ pathname, publicRoutes ])

  const isPrivateRoute = useMemo(() => {
    return !!dynamicRouteBases.find(x => pathname?.includes(x)) || privateRoutes.includes(pathname as PrivatePathname)
  }, [ pathname, dynamicRouteBases, privateRoutes ])

  // create the session
  useEffect(() => {
    const JWT = localStorage.getItem(AUTH_TOKEN)

    if (JWT && !currentUser) {
      const parsed = parseJwt(JWT)
      if (Object.keys(parsed).length) {
        setCurrentUser({
          userId: parsed.user_id,
          username: parsed.username,
          userRole: parsed.user_role,
          jwt: JWT,
        })
      }
    }

    setHydrating(false)
  }, [ currentUser, setCurrentUser, router ])

  useEffect(() => {
    if (hydrating) {
      return
    }
    // reroute FROM public pages if signed in
    if (isPublicRoute && currentUser?.userId) {
      router.replace(PRIVATE_ROUTE_URLS.DASHBOARD)
      return
    }
    // reroute TO signin if signed out
    else if (!currentUser?.userId && isPrivateRoute) {
      router.replace(PUBLIC_ROUTE_URLS.SIGN_IN)
      return
    }

    setReadyToRender(true)
  }, [ isPrivateRoute, isPublicRoute, router, currentUser, hydrating ])

  if (!readyToRender) {
    return <Loading />
  }

  return <div>{children}</div>
}
