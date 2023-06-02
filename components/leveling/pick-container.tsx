'use client'

import { useMemo } from 'react'
import { MechanicClassType, MechanicModType } from '../../graphql/generated/graphql'
import { Feature } from '../features/types'
import { useLevelingApi } from './leveling-api'
import { FriendLevelGrant, MemberLevel, MemberLevelFeature } from './types'
import StackSection from '../parts/stack-section'
import { useCompanionsApi } from '../companions/companions-api'
import FriendBonusItem from './pick-item'
import PickMercType from './pick-merc-type'
import PickSkill from './pick-skill'
import FriendBonusSpell from './pick-spell'
import FriendBonusStat from './pick-stat'
import { getPendingPickTypeMemberLevels } from './leveling-utils'
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

  const statTypeMemberLevels = useMemo(() => {
    return getPendingPickTypeMemberLevels(memberLevels?.allMemberLevels?.nodes ?? [], MechanicClassType.Stat)
  }, [ memberLevels ])

  const skillTypeMemberLevels = useMemo(() => {
    return getPendingPickTypeMemberLevels(memberLevels?.allMemberLevels?.nodes ?? [], MechanicClassType.Skill)
  }, [ memberLevels ])

  return (
    <>
      <StackSection>
        <PickMercType />
      </StackSection>

      {statTypeMemberLevels?.length > 0 && (
        <StackSection>
          {/* process one unspent stat type upgrade at a time */}
          <FriendBonusStat statTypeLevel={statTypeMemberLevels?.[0]} />
        </StackSection>
      )}
      
      {skillTypeMemberLevels?.length > 0 && (
        <StackSection>
          {/* process one unspent skill type upgrade at a time */}
          <PickSkill skillTypeLevel={skillTypeMemberLevels?.[0]} />
        </StackSection>
      )}

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
    </>
  )
}
