import classnames from 'classnames'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useCurrentUser } from '../auth/atoms/current-user'
import { PRIVATE_LINK_ROUTES } from '../nav/routes'
import SmallButton from '../parts/small-button'
import { sectionBaseStyles } from '../parts/styles'

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

  const [ currentUser ] = useAtom(useCurrentUser)

  // create ranger record
  const createRanger = () => {
    if (currentUser) {
      createRangerMutate({
        name: `${currentUser?.username}'s New Ranger`,
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

  // hydrate new ranger with defaults
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

  //  reroute when hydrated...
  useEffect(() => {
    if (characterHydrated) {
      const rangerId = rangerCreateResult?.createCharacter?.character?.id
      const editUrl = PRIVATE_LINK_ROUTES.CREATE_RANGER.replace('[id]', rangerId)
      router.push(editUrl)
    }
  }, [ router, rangerCreateResult, characterHydrated ])

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
      {/* <SmallButton onClick={initHydrateRangerMutation} primary>HYDRATE Ranger</SmallButton> */}

      <Link href={PRIVATE_LINK_ROUTES.CREATE_COMPANIONS}>
        <SmallButton primary>Create Companion</SmallButton>
      </Link>
    </div>
  )
}
