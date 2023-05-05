import classnames from 'classnames'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import {
  SetBaseStatsMutationVariables,
} from '../../graphql/generated/graphql'

import { useCurrentUser } from '../auth/atoms/current-user'
import { PRIVATE_LINK_ROUTES } from '../nav/routes'
import SmallButton from '../parts/small-button'
import { sectionBaseStyles } from '../parts/styles'

import { useRangerApi } from '../ranger/ranger-api'
import { useStatsApi } from '../stats/stats-api'
import { BASE_STATS } from '../rules/creation-rules'
import { BASE_STATS_ENUM } from '../types'

export default function InitCreate() {
  const [ characterHydrated, setCharacterHydrated ] = useState(false)

  const router = useRouter()

  const {
    mutate: createRangerMutate,
    data: rangerCreateResult,
    status: rangerCreateStatus,
  } = useRangerApi().createRanger

  const {
    mutate: hydrateStats,
    status: hydrateStatsStatus,
  } = useStatsApi().createBaseStats

  const { data: statsData, status: getStatsStatus } = useStatsApi().getStats

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

  const hydrateNewRanger = useCallback(() => {
    const rangerId = rangerCreateResult?.createCharacter?.character?.id
    console.log('executing hydrate....')
    const baseStatsPayload: SetBaseStatsMutationVariables = Object.assign(
      {},
      ...Object.values(BASE_STATS_ENUM).map(key => ({
        [key]: {
          characterId: rangerId,
          statsId: statsData?.allStats?.nodes.find(stat => stat?.name === key)?.id,
          value: BASE_STATS[BASE_STATS_ENUM[key]],
        },
      }))
    )

    // stats
    hydrateStats(baseStatsPayload)
  }, [ rangerCreateResult, statsData, hydrateStats ])

  // hydrate new ranger with defaults
  useEffect(() => {
    // bail if executing hydrate
    if (hydrateStatsStatus === 'loading') {
      return;
    }
    // begin async execution
    if (
      rangerCreateStatus === 'success' &&
      getStatsStatus === 'success' &&
      hydrateStatsStatus !== 'success') {
      hydrateNewRanger()
    }
    // on resolve, set ready for reroute
    if (hydrateStatsStatus === 'success' && !characterHydrated) {
        setCharacterHydrated(true)
    }
  }, [ getStatsStatus, rangerCreateStatus, hydrateStatsStatus, hydrateNewRanger, characterHydrated ])

  //  reroute when hydrated...
  useEffect(() => {
    if (characterHydrated) {
        const rangerId = rangerCreateResult?.createCharacter?.character?.id
        const editUrl = PRIVATE_LINK_ROUTES.CREATE_RANGER.replace(
          '[id]',
          rangerId
        )
        router.push(editUrl)
    }
  }, [ characterHydrated, router, rangerCreateResult ])

  return (
    <div
      className={classnames({
        ...sectionBaseStyles,
        'flex gap-x-5': true,
      })}
    >
      <SmallButton onClick={createRanger} primary>Create Ranger</SmallButton>

      <Link href={PRIVATE_LINK_ROUTES.CREATE_COMPANIONS}>
        <SmallButton primary>Create Companion</SmallButton>
      </Link>
    </div>
  )
}
