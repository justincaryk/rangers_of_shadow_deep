'use client'

import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export type MemberType = 'ranger' | 'friend'

type CurrentMemberReturnType = {
  id: string | null
  memberType: MemberType | null
  referenceColumnName: 'characterId' | 'friendId' | null
}
export function useCurrentMember() {
  const [ member, setMember ] = useState<CurrentMemberReturnType>({
    id: null,
    memberType: null,
    referenceColumnName: null,
  })

  const params = useParams()
  const pathname = usePathname()

  useEffect(() => {
    const isRanger = pathname?.includes('ranger')
    const isFriend = pathname?.includes('companion')
    const memberId = (params?.id as string) || null

    if (!member || member.id !== memberId) {
      setMember({
        id: memberId,
        memberType: isRanger ? 'ranger' : isFriend ? 'friend' : null,
        referenceColumnName: isRanger ? 'characterId' : isFriend ? 'friendId' : null,
      })
    }
  }, [ member, params, pathname ])

  return member
}
