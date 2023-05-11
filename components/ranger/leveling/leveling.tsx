import { Field, Form, Formik } from 'formik'
import Card from '../../parts/card'
import { baseInputClasses } from '../../parts/input'
import SmallButton from '../../parts/small-button'

import { useRangerApi } from '../ranger-api'
import { useLevelingApi } from './leveling-api'
import { LevelingFormFields, RangerLevelingFieldsSchema } from '../core-character'
import { Character } from '../../../graphql/generated/graphql'
import Loader from '../../loader'
import { determineApplicableRangerLevelUpBenefit, determineApplicableRangerLevelUpCost } from './leveling-utils'

interface LevelUpCardProps {
  ranger: Character
}

const LevelUpCardContent = ({ ranger }: LevelUpCardProps) => {
  const { mutate: mutateRanger } = useRangerApi().updateRanger
  const { data: rules } = useLevelingApi().rangerRules
  const { mutate: createLevelRef } = useLevelingApi().createLevelRef
  const { mutate: updateLevelRef } = useLevelingApi().updateLevelRef

  const handleSubmit = (data: LevelingFormFields) => {
    mutateRanger({
      id: ranger.id,
      patch: {
        xp: RangerLevelingFieldsSchema.fields.xp.cast(data.xp),
      },
    })
  }

  const tryBuyLevel = () => {
    const nextLevel = (ranger.level || 0) + 1
    const levelCost = determineApplicableRangerLevelUpCost(nextLevel, rules?.levelCosts?.nodes ?? [])
    const levelGrant = determineApplicableRangerLevelUpBenefit(nextLevel, rules?.levelGrants?.nodes ?? [])

    if (!levelCost || !levelGrant) {
      console.error('couldnt find a matching level grant item or cost', {
        levelCost,
        levelGrant,
      })
      throw new Error('couldnt find a matching level grant item or cost')
    }

    // can they afford it
    if (ranger.xp > levelCost.cost) {
      // is this the first time the feature is granted? -> create
      if (ranger.level > 4) {
        createLevelRef({
          characterId: ranger.id,
          levelGrantId: levelGrant.id,
        })
      }
      // update instead
      else {
        const levelRef = ranger.memberLevelsByCharacterId.nodes.find(x => x.levelGrantId === levelGrant.id)

        if (!levelRef) {
          console.error('cant find a matching level reference')
          throw new Error('cant find a matching level reference')
        }

        updateLevelRef({
          id: levelRef.id,
          granted: levelRef.granted++,
        })
      }

      // deduct cost from ranger xp & increment their level.
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex gap-x-4'>
        <div className='font-bold'>
          Current XP Total: {ranger.xp} (Level {ranger.level})
        </div>
      </div>
      <ul className='text-dirty-orange list-disc px-6 text-xs'>
        {rules?.levelGrants?.nodes.map(benefit => (
          <li key={benefit.id}>
            <strong className='capitalize'>{benefit.name}: </strong>
            {benefit.description}
          </li>
        ))}
      </ul>
      <div className='space-y-1 text-sm text-dirty-orange'>
        <div>
          <Formik
            initialValues={{
              xp: ranger.xp ?? 0,
              level: ranger.level ?? 0,
            }}
            validationSchema={RangerLevelingFieldsSchema}
            onSubmit={handleSubmit}
          >
            {({ submitForm }) => (
              <Form className='flex gap-x-6 justify-content'>
                <div className='flex gap-x-2 items-center'>
                  <label className='font-semibold' htmlFor='xp' aria-label='xp'>
                    Set XP:
                  </label>
                  <Field name='xp' className={`${baseInputClasses}`} onBlur={submitForm} />
                </div>
                <Field name='level' hidden />
                <div className='flex gap-x-2 items-center'>
                  <label className='font-semibold' htmlFor='xp' aria-label='xp'>
                    Buy Level:
                  </label>
                  <SmallButton onClick={tryBuyLevel} type='button'>
                    Level Up
                  </SmallButton>
                </div>
              </Form>
            )}
          </Formik>
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
