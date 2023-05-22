import { Field, Form, Formik } from 'formik'
import Card from '../parts/card'
import { baseInputClasses } from '../parts/input'
import SmallButton from '../parts/small-button'
import Loader from '../loader'
import classnames from 'classnames'
import { useEffect, useMemo } from 'react'

// hooks
import { useRangerApi } from '../ranger/ranger-api'
import { useLevelingApi } from './leveling-api'

// types
import { Character, CharacterPatch } from '../../graphql/generated/graphql'
import {
  determineApplicableRangerLevelUpBenefit,
  determineApplicableRangerLevelUpCost,
  getMechanicBenefitForRanger,
} from './leveling-utils'
import { RangerLevelingFieldsSchema } from '../ranger/core-character'
import { LevelGrant, NextRangerLevel } from './types'

interface LevelUpCardProps {
  ranger: Character
}

const LevelUpCardContent = ({ ranger }: LevelUpCardProps) => {
  const { mutate: mutateRanger } = useRangerApi().updateRanger
  const { data: rules, status: rulesStatus } = useLevelingApi().rangerRules
  const { mutate: createLevelRef, status: createLevelStatus, reset: resetCreateLevel } = useLevelingApi().createLevelRef
  const { mutate: updateLevelRef, status: updateLevelStatus, reset: resetUpdateLevel } = useLevelingApi().updateLevelRef

  const handleSubmit = (data: CharacterPatch) => {
    mutateRanger({
      id: ranger.id,
      patch: {
        xp: RangerLevelingFieldsSchema.fields.xp.cast(data.xp),
      },
    })
  }

  const nextLevel: NextRangerLevel = useMemo(() => {
    if (rulesStatus !== 'success') {
      return {
        availableForPurchase: false,
        cost: null,
        level: null,
      }
    }

    const nextLevelNumber = (ranger.level || 0) + 1
    const levelCost = determineApplicableRangerLevelUpCost(nextLevelNumber, rules?.levelCosts?.nodes ?? [])
    const levelGrant = determineApplicableRangerLevelUpBenefit(nextLevelNumber, rules?.levelGrants?.nodes ?? [])

    return {
      availableForPurchase: ranger.xp >= (levelCost?.cost || 100000),
      cost: levelCost,
      level: levelGrant,
    }
  }, [ ranger.xp, ranger.level, rules, rulesStatus ])

  
  const canBuyLevel = useMemo(() => {
    return nextLevel.availableForPurchase && createLevelStatus === 'idle' && updateLevelStatus === 'idle'
  }, [ nextLevel, createLevelStatus, updateLevelStatus ])


  const tryBuyLevel = () => {
    if (!canBuyLevel || !rules?.levelGrants?.nodes.length) {
      return null
    }
    // is this the first time the feature is granted? -> create
    if (ranger.level < rules.levelGrants.nodes.length) {
      createLevelRef({
        characterId: ranger.id,
        levelGrantId: nextLevel.level?.id,
      })
    }
    // update instead
    else {
      const levelRef = ranger.memberLevelsByCharacterId.nodes.find(x => x.levelGrantId === nextLevel.level?.id)

      if (!levelRef) {
        console.error('cant find a matching level reference')
        throw new Error('cant find a matching level reference')
      }

      updateLevelRef({
        id: levelRef.id,
        timesGranted: levelRef.timesGranted + 1,
      })
    }
  }

  // syncs ranger with new level purchase benefits
  useEffect(() => {
    if (createLevelStatus === 'success' || updateLevelStatus === 'success') {
      const benefit = getMechanicBenefitForRanger(nextLevel.level as LevelGrant)

      if (!benefit.field) {
        throw new Error('cant find mechanical benefit for new ranger level up')
      }

      // deduct cost from ranger xp,
      // increment their level,
      // update the related mechanical benefit field
      mutateRanger({
        id: ranger.id,
        patch: {
          xp: ranger.xp - (nextLevel.cost?.cost || 0),
          level: ranger.level + 1,
          [benefit.field]: benefit.value + ranger[benefit.field],
        },
      })
      resetCreateLevel()
      resetUpdateLevel()
    }
  }, [ createLevelStatus, updateLevelStatus, ranger, mutateRanger, nextLevel, resetCreateLevel, resetUpdateLevel ])

  if (rulesStatus !== 'success') {
    return null
  }

  return (
    <div className='space-y-4'>
      <div className='flex gap-x-4'>
        <div className='font-bold'>
          Current XP Total: {ranger.xp} (Level {ranger.level})
        </div>
      </div>
      <ul className='list-disc px-6 text-sm'>
        {rules?.levelGrants?.nodes.map(benefit => (
          <li key={benefit.id}>
            <strong className='capitalize'>{benefit.name}: </strong>
            {benefit.description}
          </li>
        ))}
      </ul>
      <div className='space-y-1 text-sm'>
        <div className='flex gap-x-6 justify-content'>
          <Formik
            initialValues={{
              xp: 0,
              level: ranger.level ?? 0,
            }}
            validationSchema={RangerLevelingFieldsSchema}
            onSubmit={handleSubmit}
          >
            {({ submitForm }) => (
              <Form>
                <div className='flex gap-x-2 items-center'>
                  <label className='font-semibold' htmlFor='xp' aria-label='xp'>
                    Set XP:
                  </label>
                  <Field name='xp' className={`${baseInputClasses}`} onBlur={submitForm} />
                </div>
              </Form>
            )}
          </Formik>
          <div className='flex gap-x-2 items-center'>
            <label className='font-semibold' htmlFor='xp' aria-label='xp'>
              Buy Level:
            </label>
            <SmallButton
              onClick={tryBuyLevel}
              className={classnames({
                'bg-lime-500': canBuyLevel,
                'cursor-not-allowed': !canBuyLevel,
              })}
              type='button'
            >
              Level Up
            </SmallButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LevelUpRanger() {
  const { data: ranger } = useRangerApi().getRangerById

  if (!ranger?.characterById) {
    return <Loader />
  }

  return (
    <div>
      <div className='space-y-1'>
        <Card>
          <LevelUpCardContent ranger={ranger.characterById as Character} />
        </Card>
      </div>
    </div>
  )
}
