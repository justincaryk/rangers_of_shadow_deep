'use client'

import { useMemo, useState } from 'react'
import { SparklesIcon } from '@heroicons/react/24/outline'
import classnames from 'classnames'

import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import Card from '../parts/card'
import SmallButton from '../parts/small-button'
import Increment from '../parts/increment'

import { useCompanionsApi } from '../companions/companions-api'
import { useSpellsApi } from '../spells/spells-api'

import { MercenaryFeature } from '../companions/types'
import Decrement from '../parts/decrement'
import { MemberSpell } from '../spells/types'
import { DECREASE, INCREASE } from '../rules/creation-rules'
import { notify } from '../parts/toast'

interface Props {
  feat: MercenaryFeature
}
export default function PickSpell({ feat }: Props) {
  const [ show, toggleShow ] = useState(false)

  const { data: friend } = useCompanionsApi().getFriendSummary
  const { data: memberSpells } = useSpellsApi().getMemberSpells
  const { data: spells } = useSpellsApi().getSpells

  const { mutate: learnSpell, status: learnStatus } = useSpellsApi().learnSpell
  const { mutate: unlearnSpell, status: unlearnStatus } = useSpellsApi().unlearnSpell
  const { mutate: updateTimesSpellKnown, status: addUseStatus } = useSpellsApi().setNumberOfUses

  const isLoading = useMemo(() => {
    return learnStatus === 'loading' || unlearnStatus === 'loading' || addUseStatus === 'loading'
  }, [ learnStatus, unlearnStatus, addUseStatus ])

  const checkCanIncrement = () => {
    const totalKnown =
      memberSpells?.allMemberSpells?.nodes.reduce((prev, curr) => {
        return (prev = prev + curr.uses)
      }, 0) ?? 0
    const totalAllotted = feat.value ?? 0
    return totalKnown < totalAllotted
  }

  const checkCanDecrement = (memberSpellId?: string) => {
    if (!memberSpellId) {
      return false
    }

    return true
  }

  const updateLearnedStatus = (spellId: string, spellLookupRef?: MemberSpell) => {
    if (isLoading) {
      return null
    }
    if (spellLookupRef) {
      unlearnSpell({
        id: spellLookupRef.id,
      })
    } else if (checkCanIncrement()) {
      learnSpell({
        friendId: friend?.friendById?.id,
        spellId,
      })
      notify('Spell learned!', { type: 'success' })
    }
  }

  const updateNumberOfUses = (spellLookupRef: MemberSpell, modifier: number) => {
    if (isLoading) {
      return null
    }

    if (spellLookupRef.uses + modifier < 1) {
      updateLearnedStatus(spellLookupRef.spellId, spellLookupRef)
      return null
    }

    updateTimesSpellKnown({
      lookupId: spellLookupRef.id,
      uses: spellLookupRef.uses + modifier,
    })
  }

  return (
    <div className='space-y-6'>
      <div className='mt-2 cursor-pointer' onClick={() => toggleShow(!show)}>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader content='spell select' icon={<SparklesIcon className='text-pink-400' />} />
      </div>
      {show && (
        <div className='space-y-4'>
          <Card className='bg-black/50'>
            <div className='space-y-1 text-sm font-bold'>Choose {feat.value} from the options below:</div>
          </Card>
          {spells?.allSpells?.nodes.map(spell => {
            const spellLookupRef = memberSpells?.allMemberSpells?.nodes.find(x => x.spellId === spell.id)
            const canIncrement = checkCanIncrement()
            const canDecrement = checkCanDecrement(spellLookupRef?.id)

            return (
              <Card
                key={spell.id}
                header={
                  <div className='flex justify-between items-center'>
                    <div className='flex gap-x-2 items-center'>
                      <div className='font-semibold capitalize'>{spell.name}</div>
                      {spellLookupRef ? (
                        <div className='text-sm font-semibold'>( uses: {spellLookupRef.uses} )</div>
                      ) : null}
                    </div>
                    {spellLookupRef ? (
                      <>
                        <div className='flex justify-end items-center gap-x-3'>
                          <div className='flex gap-x-1'>
                            <div
                              className={classnames({
                                'w-6': true,
                                'cursor-not-allowed': !canIncrement,
                                'cursor-pointer': canIncrement,
                              })}
                            >
                              <Increment
                                onClick={() => updateNumberOfUses(spellLookupRef, INCREASE)}
                                disabled={!canIncrement}
                              />
                            </div>
                            <div
                              className={classnames({
                                'w-6': true,
                                'cursor-not-allowed': !canDecrement,
                                'cursor-pointer': canDecrement,
                              })}
                            >
                              <Decrement
                                onClick={() => updateNumberOfUses(spellLookupRef, DECREASE)}
                                disabled={!canDecrement}
                              />
                            </div>
                          </div>
                          <SmallButton
                            onClick={() => updateLearnedStatus(spell.id, spellLookupRef)}
                            disabled={!canDecrement}
                          >
                            unlearn
                          </SmallButton>
                        </div>
                      </>
                    ) : (
                      <SmallButton onClick={() => updateLearnedStatus(spell.id)} disabled={!canIncrement} primary>
                        learn
                      </SmallButton>
                    )}
                  </div>
                }
              >
                {spell.description}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
