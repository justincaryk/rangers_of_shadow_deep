'use client'

import { useEffect, useMemo, useState } from 'react'
import { SparklesIcon } from '@heroicons/react/24/outline'
import classnames from 'classnames'

import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import Card from '../parts/card'
import SmallButton from '../parts/small-button'
import Increment from '../parts/increment'

import { useCompanionsApi } from './companions-api'
import { useSpellsApi } from '../spells/spells-api'

import { MercenaryFeature } from './types'
import Decrement from '../parts/decrement'
import { MemberSpell, Spell } from '../spells/types'
import { DECREASE, INCREASE } from '../rules/creation-rules'

interface Props {
  feat: MercenaryFeature
}
export default function FriendBonusSpell({ feat }: Props) {
  const [ show, toggleShow ] = useState(false)

  const { data: friend, status: friendQueryStatus } = useCompanionsApi().getFriendSummary
  const { data: friendSpells, status: friendSpellQueryStatus } = useSpellsApi().getMemberSpells
  const { data: spells, status: spellsQueryStatus } = useSpellsApi().getSpells

  const { mutate: learnSpell, status: learnStatus, reset: resetLearn } = useSpellsApi().learnSpell
  const { mutate: unlearnSpell, status: unlearnStatus, reset: resetUnlearn } = useSpellsApi().unlearnSpell
  const { mutate: updateTimesSpellKnown, status: addUseStatus, reset: resetAddUse } = useSpellsApi().buyAdditionalUse

  // useEffect(() => {
  //     if (learnStatus === 'success') resetLearn()
  //     if (unlearnStatus === 'success') resetUnlearn()
  //     if (addUseStatus === 'success') resetAddUse()
  // }, [learnStatus, unlearnStatus, addUseStatus, resetLearn, resetUnlearn, resetAddUse])

  const isLoading = useMemo(() => {
    return learnStatus === 'loading' || unlearnStatus === 'loading' || addUseStatus === 'loading'
  }, [ learnStatus, unlearnStatus, addUseStatus ])

  const updateLearnedStatus = (spellId: string, spellLookupRef?: MemberSpell) => {
    if (isLoading) {
      return null
    }
    if (spellLookupRef) {
      unlearnSpell({
        id: spellLookupRef.id,
      })
    } else {
      learnSpell({
        friendId: friend?.friendById?.id,
        spellId,
      })
    }
  }

  const updateNumberOfUses = (spellLookupRef: MemberSpell, modifier: number) => {
    if (isLoading) {
      return null
    }

    updateTimesSpellKnown({
      lookupId: spellLookupRef.id,
      uses: spellLookupRef.uses + modifier,
    })
  }

  const checkCanIncrement = () => {
    const totalKnown =
      friendSpells?.allMemberSpells?.nodes.reduce((prev, curr) => {
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

  if (friendQueryStatus === 'loading' || friendSpellQueryStatus === 'loading' || spellsQueryStatus === 'loading') {
    return null
  }

  console.log
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
            const spellLookupRef = friendSpells?.allMemberSpells?.nodes.find(x => x.spellId === spell.id)
            const canIncrement = checkCanIncrement()
            const canDecrement = checkCanDecrement(spellLookupRef?.id)
            console.log('x: ', spellLookupRef)
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
                    <div className='flex justify-end items-center gap-x-3'>
                      <div className='flex gap-x-1'>
                        {spellLookupRef?.uses && (
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
                        )}
                        {spellLookupRef && (
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
                        )}
                      </div>
                      {spellLookupRef ? (
                        <SmallButton
                          onClick={() => updateLearnedStatus(spell.id, spellLookupRef)}
                          disabled={!canDecrement}
                        >
                          unlearn
                        </SmallButton>
                      ) : (
                        <SmallButton onClick={() => updateLearnedStatus(spell.id)} disabled={!canIncrement} primary>
                          learn
                        </SmallButton>
                      )}
                    </div>
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
