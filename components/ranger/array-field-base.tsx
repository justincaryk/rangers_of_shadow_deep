'use client'

import { BoltIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'

import Card from '../parts/card'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import SmallButton from '../parts/small-button'

// types
import { RANGER_LOOKUP_FIELD_HASH_KEYS, RangerLookupFieldHashKeyStrings, RANGER_LOOKUP_FIELD_HASH } from '../types'
import { HeroicAction } from '../heroic-actions/types'
import { Spell } from '../spells/types'
import { MemberHeroicAction, MemberSpell } from '../../graphql/generated/graphql'

// state hooks
import { useHeroicActionBp } from './atoms/build-points'
import { useRangerApi } from './ranger-api'
import { useHeroicActionApi } from '../heroic-actions/heroic-actions-api'
import { useSpellsApi } from '../spells/spells-api'

const SectionIcon = (type: RangerLookupFieldHashKeyStrings) => {
  if (type === RANGER_LOOKUP_FIELD_HASH_KEYS.HEROIC_ACTIONS) return <BoltIcon className='text-yellow-400' />
  if (type === RANGER_LOOKUP_FIELD_HASH_KEYS.SPELLS) return <SparklesIcon className='text-pink-400' />
  return null
}

interface Props {
  type: RangerLookupFieldHashKeyStrings
  data: (HeroicAction | Spell)[]
}

export default function ArrayFieldBase({ type, data }: Props) {
  const [ show, toggleShow ] = useState(false)
  const [ submitting, setSubmitting ] = useState(false)

  const [ heroicBp ] = useAtom(useHeroicActionBp)
  const { data: ranger } = useRangerApi().getRangerById

  const { mutate: mutateActionLearn, status: statusActionLearn } = useHeroicActionApi().learnHeroicAction
  const { mutate: mutateActionUnlearn, status: statusActionUnlearn } = useHeroicActionApi().unlearnHeroicAction
  const { mutate: mutateSpellLearn, status: statusSpellLearn } = useSpellsApi().learnSpell
  const { mutate: mutateSpellUnlearn, status: statusSpellUnlearn } = useSpellsApi().unlearnSpell

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
    if (submitting) {
      setSubmitting(false)
    }
  }, [ statusActionLearn, statusActionUnlearn, statusSpellLearn, statusSpellUnlearn ])

  const rangerLookupRefData = useMemo(() => {
    const base = ranger?.characterById
    const lookupKey = RANGER_LOOKUP_FIELD_HASH[type]

    return base?.[lookupKey]?.nodes ?? []
  }, [ ranger, type ])

  const headerContent = useMemo(() => {
    if (type === RANGER_LOOKUP_FIELD_HASH_KEYS.HEROIC_ACTIONS) {
      return 'heroic abilities'
    }
    if (type === RANGER_LOOKUP_FIELD_HASH_KEYS.SPELLS) {
      return 'spells'
    }
    return 'invalid section type'
  }, [ type ])

  const checkIsFieldLearned = (id: string) => {
    for (const ref of rangerLookupRefData) {
      const { heroicActionId = null } = ref as MemberHeroicAction
      const { spellId = null } = ref as MemberSpell

      if (id === heroicActionId || id === spellId) {
        return {
          refId: ref.id,
          known: true,
        }
      }
    }
    return {
      refId: null,
      known: false,
    }
  }

  const handleItemClicked = (item: HeroicAction | Spell) => {
    if (submitting) {
      return
    }

    const { known, refId } = checkIsFieldLearned(item.id)

    const baseDeletePayload = {
      id: refId,
      characterId: ranger?.characterById?.id,
    }

    switch (true) {
      case !known && type === 'heroic_actions':
        mutateActionLearn({
          heroicActionId: item.id,
          characterId: ranger?.characterById?.id,
          newTotalKnown: (ranger?.characterById?.totalHeroicActions || 0) + 1,
        })
        break
      case known && type === 'heroic_actions':
        mutateActionUnlearn({
          ...baseDeletePayload,
          newTotalKnown: (ranger?.characterById?.totalHeroicActions || 1) - 1,
        })
        break
      case !known && type === 'spells':
        mutateSpellLearn({
          spellId: item.id,
          characterId: ranger?.characterById?.id,
          newTotalKnown: (ranger?.characterById?.totalHeroicActions || 0) + 1,
        })
        break
      case known && type === 'spells':
        mutateSpellUnlearn({
          ...baseDeletePayload,
          newTotalKnown: (ranger?.characterById?.totalHeroicActions || 1) - 1,
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
          {data.map(item => (
            <Card
              key={item.name}
              header={
                <div className='flex justify-between items-center'>
                  <div className='font-semibold capitalize'>{item.name}</div>
                  <SmallButton onClick={() => handleItemClicked(item)} primary={!checkIsFieldLearned(item.id).known}>
                    {checkIsFieldLearned(item.id).known ? 'UNLEARN' : 'LEARN'}
                  </SmallButton>
                </div>
              }
              main={item.description}
            />
          ))}
        </div>
      )}
      {/* always show preview of selected heroic actions  */}
      {!show && ranger && (
        <div className='space-y-4'>
          {rangerLookupRefData.map(itemRef => {
            const item = data.find(item => {
              if (itemRef.__typename === 'MemberHeroicAction' && item.id === itemRef.heroicActionId) return true
              if (itemRef.__typename === 'MemberSpell' && item.id === itemRef.spellId) return true
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
                    <div className='font-semibold capitalize'>{item.name}</div>
                    <SmallButton onClick={() => handleItemClicked(item)}>{'UNLEARN'}</SmallButton>
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
