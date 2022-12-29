'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Loading from '../../app/loading'

export default function Auth() {
  const router = useRouter()

  useEffect(() => {
    if (router) {
      router.push('/auth/signin')
    }
  }, [ router ])

  return <Loading />
}
