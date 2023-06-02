'use client'

import { BoltIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import classnames from 'classnames'

import Card from '../parts/card'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import SmallButton from '../parts/small-button'
import Increment from '../parts/increment'
import Decrement from '../parts/decrement'

// types
import { RANGER_LOOKUP_FIELD_HASH_KEYS, RangerLookupFieldHashKeyStrings } from '../types'
import { HeroicAction, MemberHeroicAction } from '../heroic-actions/types'
import { Spell, MemberSpell } from '../spells/types'

// state hooks
import { useHeroicActionBp } from './atoms/build-points'
import { useRangerApi } from './ranger-api'
import { useHeroicActionApi } from '../heroic-actions/heroic-actions-api'
import { useSpellsApi } from '../spells/spells-api'

import { DECREASE, INCREASE } from '../rules/creation-rules'
import { useLevelingApi } from '../leveling/leveling-api'
import { MechanicClassType, MechanicModType } from '../../graphql/generated/graphql'

const SectionIcon = (type: RangerLookupFieldHashKeyStrings) => {
  if (type === RANGER_LOOKUP_FIELD_HASH_KEYS.HEROIC_ACTIONS) return <BoltIcon className='text-yellow-400' />
  if (type === RANGER_LOOKUP_FIELD_HASH_KEYS.SPELLS) return <SparklesIcon className='text-pink-400' />
  return null
}

interface Props {
  type: RangerLookupFieldHashKeyStrings
  data: (HeroicAction | Spell)[]
}

type LookupFieldData = {
  known: boolean
  item: Spell | HeroicAction | null
  rangerLookupRef: MemberSpell | MemberHeroicAction | null
}

export default function ArrayFieldBase({ type, data }: Props) {
  const [ show, toggleShow ] = useState(false)
  const [ submitting, setSubmitting ] = useState(false)

  const [ heroicBp ] = useAtom(useHeroicActionBp)
  const { data: ranger } = useRangerApi().getRangerSummary
  const { data: memberSpells } = useSpellsApi().getMemberSpells
  const { data: memberHeroicActions } = useHeroicActionApi().getMemberHeroicActions
  const { data: memberLevels } = useLevelingApi().getMemberLevels

  const { mutateAsync: updateMemberLevel } = useLevelingApi().updateLevelRef

  const { mutate: mutateActionLearn, status: statusActionLearn } = useHeroicActionApi().learnHeroicAction
  const { mutate: mutateActionUnlearn, status: statusActionUnlearn } = useHeroicActionApi().unlearnHeroicAction
  const { mutate: mutateBuyExtraActionUses, status: statusActionBuyUses } = useHeroicActionApi().setNumberOfUses

  const { mutate: mutateSpellLearn, status: statusSpellLearn } = useSpellsApi().learnSpell
  const { mutate: mutateSpellUnlearn, status: statusSpellUnlearn } = useSpellsApi().unlearnSpell
  const { mutate: mutateBuyExtraSpellUses, status: statusSpellBuyses } = useSpellsApi().setNumberOfUses

  useEffect(() => {
    if (statusActionLearn === 'loading') {
      setSubmitting(true)
      return
    }
    if (statusActionUnlearn === 'loading') {
      setSubmitting(true)
      return
    }
    if (statusSpellLearn === 'loading') {
      setSubmitting(true)
      return
    }
    if (statusSpellUnlearn === 'loading') {
      setSubmitting(true)
      return
    }
    if (statusActionBuyUses === 'loading') {
      setSubmitting(true)
      return
    }
    if (statusSpellBuyses === 'loading') {
      setSubmitting(true)
      return
    }
    if (submitting) {
      setSubmitting(false)
    }
  }, [
    statusActionLearn,
    statusActionUnlearn,
    statusSpellLearn,
    statusSpellUnlearn,
    statusActionBuyUses,
    statusSpellBuyses,
    submitting,
  ])

  const targetMemberLevel = useMemo(() => {
    console.log('lvlCheckRunning: ', memberLevels?.allMemberLevels?.nodes.find(ml =>
      ml.levelGrantByLevelGrantId?.featuresByLevelGrantId.nodes.find(
        feat => feat.mechanicClass === MechanicClassType.HeroicAbility
      )))
    return memberLevels?.allMemberLevels?.nodes.find(ml =>
      ml.levelGrantByLevelGrantId?.featuresByLevelGrantId.nodes.find(
        feat => feat.mechanicClass === MechanicClassType.HeroicAbility
      )
    )
  }, [ memberLevels ])
  const heroicBpRemaining = useMemo(() => {
    const spellsBought =
      memberSpells?.allMemberSpells?.nodes.reduce((prev, curr) => {
        return prev + curr.uses
      }, 0) ?? 0
    const heroicActionsBought =
      memberHeroicActions?.allMemberHeroicActions?.nodes.reduce((prev, curr) => {
        return prev + curr.uses
      }, 0) ?? 0

    return Math.max(heroicBp - spellsBought - heroicActionsBought, 0)
  }, [ heroicBp, memberHeroicActions, memberSpells ])

  const levelUpPointsRemaining = useMemo(() => {
    const { timesUsed, timesGranted } = targetMemberLevel ?? { timesUsed: 0, timesGranted: 0 }
    return timesGranted - timesUsed
  }, [ targetMemberLevel ])

  const rangerLookupRefData = useMemo(() => {
    let base = null
    if (type === 'heroic_actions') base = memberHeroicActions?.allMemberHeroicActions
    if (type === 'spells') base = memberSpells?.allMemberSpells

    return base?.nodes ?? []
  }, [ memberHeroicActions, memberSpells, type ]) as MemberHeroicAction[] | MemberSpell[]

  const headerContent = useMemo(() => {
    if (type === RANGER_LOOKUP_FIELD_HASH_KEYS.HEROIC_ACTIONS) {
      return 'heroic abilities'
    }
    if (type === RANGER_LOOKUP_FIELD_HASH_KEYS.SPELLS) {
      return 'spells'
    }
    return 'invalid section type'
  }, [ type ])

  const lookupRangerFieldById = (item: Spell | HeroicAction): LookupFieldData => {
    for (const ref of rangerLookupRefData) {
      const { heroicActionId = null } = ref as MemberHeroicAction
      const { spellId = null } = ref as MemberSpell

      if (item.id === heroicActionId || item.id === spellId) {
        return {
          known: true,
          rangerLookupRef: ref,
          item,
        }
      }
    }
    return {
      known: false,
      rangerLookupRef: null,
      item,
    }
  }

  const updateLearnedStatus = async (lookupFieldData: LookupFieldData) => {
    if (submitting) {
      return
    }
    
    // spend heroic bp first
    if (heroicBpRemaining < 1) {
      const { timesUsed } = targetMemberLevel!

      await updateMemberLevel({
        id: targetMemberLevel?.id,
        timesUsed: lookupFieldData.known ? timesUsed - 1 : timesUsed + 1,
      })
    }

    switch (true) {
      case !lookupFieldData.known && type === 'heroic_actions':
        mutateActionLearn({
          heroicActionId: lookupFieldData.item?.id,
          characterId: ranger?.characterById?.id,
        })
        break
      case lookupFieldData.known && type === 'heroic_actions':
        mutateActionUnlearn({
          id: lookupFieldData?.rangerLookupRef?.id,
        })
        break
      case !lookupFieldData.known && type === 'spells':
        mutateSpellLearn({
          spellId: lookupFieldData.item?.id,
          characterId: ranger?.characterById?.id,
        })
        break
      case lookupFieldData.known && type === 'spells':
        mutateSpellUnlearn({
          id: lookupFieldData?.rangerLookupRef?.id,
        })
        break
      default:
        break
    }
  }

  const updateNumberOfUses = async (lookupFieldData: LookupFieldData, modifier: number) => {
    if (submitting || !lookupFieldData.known) {
      return
    }

    const newValue = (lookupFieldData.rangerLookupRef?.uses || 1) + modifier

    // spend heroic bp first
    if (heroicBpRemaining < 1) {
      const { timesUsed } = targetMemberLevel!

      await updateMemberLevel({
        id: targetMemberLevel?.id,
        timesUsed: timesUsed + modifier,
      })
    }
    // remove the lookup ref altogether
    if (newValue === 0) {
      return updateLearnedStatus(lookupFieldData)
    }

    // update the number of uses.
    const updatePayload = {
      lookupId: lookupFieldData.rangerLookupRef?.id,
      uses: newValue,
    }

    switch (true) {
      case type === 'heroic_actions':
        mutateBuyExtraActionUses({
          ...updatePayload,
        })
        break
      case type === 'spells':
        mutateBuyExtraSpellUses({
          ...updatePayload,
        })
        break
      default:
        break
    }
  }

  return (
    <div>
      <div className='mt-2 cursor-pointer' onClick={() => toggleShow(!show)}>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader
          content={headerContent}
          icon={SectionIcon(type)}
          subtext='Available points (from build):'
          subvalue={heroicBpRemaining}
        />
        <MinorHeader content='' subtext='Available points (from leveling):' subvalue={levelUpPointsRemaining} />
      </div>
      {show && (
        <div className='space-y-4'>
          {data.map(heroicAbility => {
            const lookupFieldData = lookupRangerFieldById(heroicAbility)
            const canIncrement = heroicBpRemaining > 0 || levelUpPointsRemaining > 0
            const canDecrement = lookupFieldData.rangerLookupRef && lookupFieldData.rangerLookupRef.uses > 0
            return (
              <Card
                key={heroicAbility.id}
                header={
                  <div className='flex justify-between items-center'>
                    <div className='flex gap-x-2 items-center'>
                      <div className='font-semibold capitalize'>{heroicAbility.name}</div>
                      {lookupFieldData.rangerLookupRef ? (
                        <div className='text-sm font-semibold'>( uses: {lookupFieldData.rangerLookupRef?.uses} )</div>
                      ) : null}
                    </div>
                    <div className='flex justify-end items-center gap-x-3'>
                      <div className='flex gap-x-1'>
                        {lookupFieldData.known && (
                          <div
                            className={classnames({
                              'w-6': true,
                              'cursor-not-allowed': !canIncrement,
                              'cursor-pointer': canIncrement,
                            })}
                          >
                            <Increment
                              onClick={() => canIncrement && updateNumberOfUses(lookupFieldData, INCREASE)}
                              disabled={!canIncrement}
                            />
                          </div>
                        )}
                        {lookupFieldData.known && (
                          <div
                            className={classnames({
                              'w-6': true,
                              'cursor-not-allowed': !canDecrement,
                              'cursor-pointer': canDecrement,
                            })}
                          >
                            <Decrement
                              onClick={() => canDecrement && updateNumberOfUses(lookupFieldData, DECREASE)}
                              disabled={!canDecrement}
                            />
                          </div>
                        )}
                      </div>
                      {lookupFieldData.known ? (
                        <SmallButton onClick={() => updateLearnedStatus(lookupFieldData)} disabled={!canDecrement}>
                          unlearn
                        </SmallButton>
                      ) : (
                        <SmallButton
                          onClick={() => canIncrement && updateLearnedStatus(lookupFieldData)}
                          disabled={!canIncrement}
                          primary
                        >
                          learn
                        </SmallButton>
                      )}
                    </div>
                  </div>
                }
              >
                <div>{heroicAbility.description}</div>
              </Card>
            )
          })}
        </div>
      )}
      {/* always show preview of selected heroic actions  */}
      {!show && ranger && (
        <div className='space-y-4'>
          {rangerLookupRefData.map(heroicAbilityRef => {
            const heroicAbility = data.find(heroicAbility => {
              if (heroicAbility.id === (heroicAbilityRef as MemberHeroicAction).heroicActionId) return true
              if (heroicAbility.id === (heroicAbilityRef as MemberSpell).spellId) return true
              return false
            })

            if (!heroicAbility) {
              return null
            }
            return (
              <Card
                key={heroicAbility.id}
                header={
                  <div className='flex justify-between items-center'>
                    <div className='font-semibold capitalize'>
                      {heroicAbility.name} {`( uses: ${heroicAbilityRef.uses} )`}
                    </div>

                    <SmallButton
                      onClick={() =>
                        mutateActionUnlearn({
                          id: heroicAbilityRef.id,
                        })
                      }
                    >
                      {'UNLEARN'}
                    </SmallButton>
                  </div>
                }
              >
                <div>{heroicAbility.description}</div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
