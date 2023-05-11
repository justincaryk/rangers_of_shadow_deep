'use client'

import classnames from 'classnames'
import { PRIVATE_LINK_ROUTES } from '../nav/routes'
import SmallButton from '../parts/small-button'
import { sectionBaseStyles } from '../parts/styles'

// pkg hooks
import { useCallback, useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

// custom hooks
import { useCurrentUser } from '../auth/atoms/current-user'
import { useCompanionsApi } from '../companions/companions-api'
import { useRangerApi } from '../ranger/ranger-api'

export default function InitCreate() {
  const [ characterHydrated, setCharacterHydrated ] = useState(false)

  const router = useRouter()

  const {
    mutate: createRangerMutate,
    data: rangerCreateResult,
    status: rangerCreateStatus,
  } = useRangerApi().createRanger

  const { mutate: hydrateRangerMutate, status: hydrationStatus } = useRangerApi().hydrateRanger

  const {
    mutate: createFriendMutate,
    data: friendCreateResult,
    status: friendCreateStatus,
  } = useCompanionsApi().createFriend

  const [ currentUser ] = useAtom(useCurrentUser)

  const createRanger = () => {
    if (currentUser) {
      createRangerMutate({
        name: `${currentUser?.username}'s New Ranger`,
        userId: currentUser?.userId,
      })
    }
  }

  const createFriend = () => {
    if (currentUser) {
      createFriendMutate({
        name: `${currentUser?.username}'s New Companion`,
        userId: currentUser?.userId,
      })
    }
  }

  const initHydrateRangerMutation = useCallback(() => {
    if (hydrationStatus !== 'idle') {
      return null
    }

    const rangerId = rangerCreateResult?.createCharacter?.character?.id

    hydrateRangerMutate({
      characterId: rangerId,
    })
  }, [ rangerCreateResult, hydrationStatus, hydrateRangerMutate ])

  // RANGER >> hydrate new ranger with defaults
  useEffect(() => {
    // if hydration is idle and we have a new character id => init hydration
    if (hydrationStatus === 'idle' && rangerCreateStatus === 'success') {
      initHydrateRangerMutation()
    }
    // if hydration is complete -> flip the switch to reroute
    else if (hydrationStatus === 'success' && !characterHydrated) {
      setCharacterHydrated(true)
    }
  }, [ rangerCreateStatus, hydrationStatus, characterHydrated, initHydrateRangerMutation ])

  //  RANGER >> reroute when hydrated...
  useEffect(() => {
    if (characterHydrated) {
      const rangerId = rangerCreateResult?.createCharacter?.character?.id
      const hydratedUrl = PRIVATE_LINK_ROUTES.A_RANGER.replace('[id]', rangerId)
      router.push(hydratedUrl)
    }
  }, [ router, rangerCreateResult, characterHydrated ])

  // COMPANION >> reroute when created
  useEffect(() => {
    if (friendCreateResult?.createFriend?.friend?.id && friendCreateStatus === 'success') {
      const friendId = friendCreateResult.createFriend.friend.id
      const hydratedUrl = PRIVATE_LINK_ROUTES.A_COMPANION.replace('[id]', friendId)
      router.push(hydratedUrl)
    }
  }, [ router, friendCreateResult, friendCreateStatus ])

  return (
    <div
      className={classnames({
        ...sectionBaseStyles,
        'flex gap-x-5': true,
      })}
    >
      <SmallButton onClick={createRanger} primary>
        Create Ranger
      </SmallButton>

      <SmallButton onClick={createFriend} primary>
        Create Companion
      </SmallButton>
    </div>
  )
}
