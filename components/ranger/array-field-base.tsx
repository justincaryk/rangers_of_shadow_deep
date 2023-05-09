'use client'

import { BoltIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import classnames from 'classnames'

import Card from '../parts/card'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import SmallButton from '../parts/small-button'

// types
import { RANGER_LOOKUP_FIELD_HASH_KEYS, RangerLookupFieldHashKeyStrings, RANGER_LOOKUP_FIELD_HASH } from '../types'
import { HeroicAction, MemberHeroicAction } from '../heroic-actions/types'
import { Spell, MemberSpell } from '../spells/types'

// state hooks
import { useHeroicActionBp } from './atoms/build-points'
import { useRangerApi } from './ranger-api'
import { useHeroicActionApi } from '../heroic-actions/heroic-actions-api'
import { useSpellsApi } from '../spells/spells-api'
import Increment from '../parts/increment'
import Decrement from '../parts/decrement'
import { DECREASE, INCREASE } from '../rules/creation-rules'

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
  const { data: ranger } = useRangerApi().getRangerById

  const { mutate: mutateActionLearn, status: statusActionLearn } = useHeroicActionApi().learnHeroicAction
  const { mutate: mutateActionUnlearn, status: statusActionUnlearn } = useHeroicActionApi().unlearnHeroicAction
  const { mutate: mutateBuyExtraActionUses, status: statusActionBuyUses } = useHeroicActionApi().buyAdditionalUse

  const { mutate: mutateSpellLearn, status: statusSpellLearn } = useSpellsApi().learnSpell
  const { mutate: mutateSpellUnlearn, status: statusSpellUnlearn } = useSpellsApi().unlearnSpell
  const { mutate: mutateBuyExtraSpellUses, status: statusSpellBuyses } = useSpellsApi().buyAdditionalUse

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
  }, [ statusActionLearn, statusActionUnlearn, statusSpellLearn, statusSpellUnlearn, statusActionBuyUses, statusSpellBuyses, submitting ])

  const rangerLookupRefData = useMemo(() => {
    const base = ranger?.characterById
    const lookupKey = RANGER_LOOKUP_FIELD_HASH[type]

    return base?.[lookupKey]?.nodes ?? []
  }, [ ranger, type ]) as MemberHeroicAction[] | MemberSpell[]

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

  const updateLearnedStatus = (lookupFieldData: LookupFieldData) => {
    if (submitting) {
      return
    }

    const baseDeletePayload = {
      id: lookupFieldData?.rangerLookupRef?.id,
      characterId: ranger?.characterById?.id,
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
          ...baseDeletePayload,
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
          ...baseDeletePayload,
        })
        break
      default:
        break
    }
  }
  const updateNumberOfUses = (lookupFieldData: LookupFieldData, modifier: number) => {
    if (submitting || !lookupFieldData.known) {
      return
    }

    const newValue = (lookupFieldData.rangerLookupRef?.uses || 1) + modifier

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
      <div className='mt-2' onClick={() => toggleShow(!show)}>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader
          content={headerContent}
          icon={SectionIcon(type)}
          subtext={'Available build points:'}
          subvalue={heroicBp}
        />
      </div>
      {show && (
        <div className='space-y-4'>
          {data.map(item => {
            const lookupFieldData = lookupRangerFieldById(item)
            const canIncrement = lookupFieldData.rangerLookupRef && lookupFieldData.rangerLookupRef.uses < heroicBp
            const canDecrement = lookupFieldData.rangerLookupRef && lookupFieldData.rangerLookupRef.uses > 0
            return (
              <Card
                key={item.id}
                header={
                  <div className='flex justify-between items-center'>
                    <div className='flex gap-x-2 items-center'>
                      <div className='font-semibold capitalize'>{item.name}</div>
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
                              onClick={() => updateNumberOfUses(lookupFieldData, INCREASE)}
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
                              onClick={() => updateNumberOfUses(lookupFieldData, DECREASE)}
                              disabled={!canDecrement}
                            />
                          </div>
                        )}
                      </div>
                      <SmallButton
                        onClick={() => updateLearnedStatus(lookupFieldData)}
                        primary={!lookupFieldData.known}
                      >
                        {lookupFieldData.known ? 'UNLEARN' : 'LEARN'}
                      </SmallButton>
                    </div>
                  </div>
                }
                main={item.description}
              />
            )
          })}
        </div>
      )}
      {/* always show preview of selected heroic actions  */}
      {!show && ranger && (
        <div className='space-y-4'>
          {rangerLookupRefData.map(itemRef => {
            const item = data.find(item => {
              if (item.id === (itemRef as MemberHeroicAction).heroicActionId) return true
              if (item.id === (itemRef as MemberSpell).spellId) return true
              return false
            })

            if (!item) {
              return null
            }
            return (
              <Card
                key={item.id}
                header={
                  <div className='flex justify-between items-center'>
                    <div className='font-semibold capitalize'>
                      {item.name} {`( uses: ${itemRef.uses} )`}
                    </div>

                    <SmallButton
                      onClick={() =>
                        mutateActionUnlearn({
                          characterId: ranger.characterById?.id,
                          id: itemRef.id,
                        })
                      }
                    >
                      {'UNLEARN'}
                    </SmallButton>
                  </div>
                }
                main={item.description}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
