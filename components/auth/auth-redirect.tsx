'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Loading from '../../app/loading'
import { PUBLIC_LINK_ROUTES } from '../nav/routes'

export default function Auth() {
  const router = useRouter()

  useEffect(() => {
    if (router) {
      router.push(PUBLIC_LINK_ROUTES.SIGN_IN)
    }
  }, [ router ])

  return <Loading />
}
