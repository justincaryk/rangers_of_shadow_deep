'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Loading from '../../app/loading'
import { PUBLIC_ROUTE_URLS } from '../nav/routes'

export default function Auth() {
  const router = useRouter()

  useEffect(() => {
    if (router) {
      router.push(PUBLIC_ROUTE_URLS.SIGN_IN)
    }
  }, [ router ])

  return <Loading />
}
