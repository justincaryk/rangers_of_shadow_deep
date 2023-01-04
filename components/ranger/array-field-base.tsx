'use client'

import { BoltIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { useMemo, useState } from 'react'
import { HeroicAction, Spell } from '../data'
import Card from '../parts/card'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import SmallButton from '../parts/small-button'
import { RANGER_FIELD } from '../types'
import { useGetTrueAvailBp } from '../utils'
import { useBpForHeroicSpells, useBuildPoints } from './atoms/build-points'
import { useRanger } from './atoms/ranger'
import { DECREASE, INCREASE } from './rules/rules'

const SectionIcon = (type: RANGER_FIELD) => {
  if (type === RANGER_FIELD.HEROIC_ACTIONS)
    return <BoltIcon className='text-yellow-400' />
  if (type === RANGER_FIELD.SPELLS)
    return <SparklesIcon className='text-pink-400' />
  return null
}

interface Props {
  type: RANGER_FIELD
  data: HeroicAction[] | Spell[]
}

export default function ArrayFieldBase({ type, data }: Props) {
  const [ show, toggleShow ] = useState(false)
  const [ minorBuildPoints, updateMinorBuildPoints ] =
    useAtom(useBpForHeroicSpells)
  const trueAvailBp = useGetTrueAvailBp(minorBuildPoints)

  const [ ranger, updateRanger ] = useAtom(useRanger)
  const currentField = useMemo(() => {
    return ranger[type]
  }, [ ranger, type ])

  const handleItemClicked = (item: HeroicAction | Spell) => {
    if (!Array.isArray(currentField)) {
      return null
    }

    // if it exits => remove it
    if (currentField.indexOf(item.name) > -1) {
      updateRanger({
        ...ranger,
        [type]: currentField.filter(x => x != item.name),
      })
      // update build points
      updateMinorBuildPoints(DECREASE)
      return null
    }

    // if no build points avail => exit
    if (trueAvailBp === 0) {
      return null
    }

    // add it
    updateRanger({
      ...ranger,
      [type]: [ ...currentField, item.name ],
    })
    // update build points
    updateMinorBuildPoints(INCREASE)
  }

  const headerContent = useMemo(() => {
    if (type === RANGER_FIELD.HEROIC_ACTIONS) {
      return 'heroic abilities'
    }
    if (type === RANGER_FIELD.SPELLS) {
      return 'spells'
    }
    return 'invalid section type'
  }, [ type ])

  return (
    <div>
      <div className='mt-2'>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} onClick={() => toggleShow(!show)} />
        </div>
        <MinorHeader
          content={headerContent}
          icon={SectionIcon(type)}
          minorBuildPoints={trueAvailBp}
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
                  <SmallButton
                    onClick={() => handleItemClicked(item)}
                    classNames={
                      Array.isArray(currentField) &&
                      currentField.indexOf(item.name) > -1
                        ? 'bg-gray-400'
                        : ''
                    }
                  >
                    {Array.isArray(currentField) &&
                    currentField.indexOf(item.name) > -1
                      ? 'UNLEARN'
                      : 'LEARN'}
                  </SmallButton>
                </div>
              }
              main={item.desc}
            />
          ))}
        </div>
      )}
      {/* always show preview of selected heroic actions  */}
      {!show && Array.isArray(currentField) && currentField.length > 0 && (
        <div className='space-y-4'>
          {currentField.map(name => {
            const item = data.find(item => item.name === name)
            if (!item) {
              return null
            }
            return (
              <Card
                key={item.name}
                header={
                  <div className='flex justify-between items-center'>
                    <div className='font-semibold capitalize'>{item.name}</div>
                    <SmallButton
                      onClick={() => handleItemClicked(item)}
                      classNames={
                        currentField.indexOf(item.name) > -1
                          ? 'bg-gray-400'
                          : ''
                      }
                    >
                      {currentField.indexOf(item.name) > -1
                        ? 'UNLEARN'
                        : 'LEARN'}
                    </SmallButton>
                  </div>
                }
                main={null}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
