'use client'

import { useMemo } from 'react'
import { MechanicClassType, MechanicModType } from '../../graphql/generated/graphql'
import StackSection from '../parts/stack-section'
import { useCompanionsApi } from './companions-api'
import FriendBonusItem from './friend-bonus-item'
import FriendBonusSpell from './friend-bonus-spell'

export default function FriendPickContainer() {
  const { data: friend } = useCompanionsApi().getFriendSummary
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

  return (
    <>
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
