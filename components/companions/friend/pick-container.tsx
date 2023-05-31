'use client'

import { useMemo } from 'react'
import { MechanicClassType, MechanicModType } from '../../../graphql/generated/graphql'
import { Feature } from '../../features/types'
import { useLevelingApi } from '../../leveling/leveling-api'
import { FriendLevelGrant, MemberLevel } from '../../leveling/types'
import StackSection from '../../parts/stack-section'
import { useCompanionsApi } from './../companions-api'
import FriendBonusItem from './pick-item'
import PickMercType from './pick-merc-type'
import PickSkill from './pick-skill'
import FriendBonusSpell from './pick-spell'
// import FriendBonusStat from './pick-stat'

export default function FriendPickContainer() {
  const { data: friend } = useCompanionsApi().getFriendSummary
  const { data: memberLevels } = useLevelingApi().getMemberLevels
  const { data: mercenaries } = useCompanionsApi().getMercenaries

  const mercRef = useMemo(() => {
    return mercenaries?.allMercenaries?.nodes.find(merc => merc.id === friend?.friendById?.mercenaryId)
  }, [ friend?.friendById?.mercenaryId, mercenaries ])

  const spellSelect = useMemo(() => {
    return mercRef?.featuresByMercenaryId.nodes.find(x => {
      return x.mechanicMod === MechanicModType.Pick && x.mechanicClass === MechanicClassType.Spell
    })
  }, [ mercRef ])

  const equipmentSelect = useMemo(() => {
    return mercRef?.featuresByMercenaryId.nodes.find(x => {
      return x.mechanicMod === MechanicModType.Pick && x.mechanicClass === MechanicClassType.Item
    })
  }, [ mercRef ])

  const statSelect = useMemo(() => {
    const memberLevelGrants: MemberLevel[] = []
    const statPickFeatures: Feature[] = []

    // check for member levels that have not been effected
    for (const memberLevel of memberLevels?.allMemberLevels?.nodes ?? []) {
      if (memberLevel.timesGranted > memberLevel.timesUsed) {
        const features = memberLevel.friendLevelGrantByFriendLevelGrantId?.featuresByFriendLevelGrantId.nodes ?? []
        // check the member level's features for Pick & Stat type
        for (const feature of features) {
          if (feature.mechanicMod === MechanicModType.Pick && feature.mechanicClass === MechanicClassType.Stat) {
            memberLevelGrants.push(memberLevel)
            statPickFeatures.push(feature)
          }
        }
      }
    }

    return {
      statPickFeatures,
      memberLevelGrants,
    }
  }, [ memberLevels ])

  return (
    <>
      <StackSection>
        <PickMercType />
      </StackSection>

      {/* <StackSection>
        <PickSkill />
      </StackSection> */}

      {!!spellSelect && (
        <StackSection>
          <FriendBonusSpell feat={spellSelect} />
        </StackSection>
      )}

      {!!equipmentSelect && (
        <StackSection>
          <FriendBonusItem feat={equipmentSelect} />
        </StackSection>
      )}

      {/* {!!statSelect.statLevelGrant && (
        <StackSection>
          <FriendBonusStat feat={statSelect.statLevelGrant.featuresByFriendLevelGrantId} />
        </StackSection>
      )} */}
    </>
  )
}
