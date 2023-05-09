import { FocusEvent } from 'react'
import { Field, Form, Formik } from 'formik'
import Card from '../../parts/card'
import Input, { baseInputClasses } from '../../parts/input'
import SmallButton from '../../parts/small-button'

import { useRangerApi } from '../ranger-api'
import { useLevelingApi } from './leveling-api'
import { LevelingFormFields, RangerLevelingFieldsSchema } from '../core-character'
import { CharacterByIdQuery } from '../../../graphql/generated/graphql'
import Loader from '../../loader'

interface LevelUpCardProps {
  ranger: CharacterByIdQuery | null
}

const LevelUpCardContent = ({ ranger }: LevelUpCardProps) => {
  const { mutate: mutateRanger } = useRangerApi().updateRanger
  const { data: rules } = useLevelingApi().rangerRules

  const handleSubmit = (data: LevelingFormFields) => {
    mutateRanger({
      id: ranger?.characterById?.id,
      patch: {
        xp: data.xp,
      },
    })
  }
  const tryBuyLevel = (level: number) => {}

  return (
    <div className='space-y-4'>
      <div className='flex gap-x-4'>
        <div className='font-bold'>
          Current XP Total: {ranger?.characterById?.xp} (Level {ranger?.characterById?.level})
        </div>
      </div>
      <div className='space-y-1 text-sm text-dirty-orange'>
        <div>
          <Formik
            initialValues={{
              xp: ranger?.characterById?.xp ?? 0,
              level: ranger?.characterById?.level ?? 0,
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
                <div className='flex gap-x-2 items-center'>
                  <label className='font-semibold' htmlFor='xp' aria-label='xp'>
                    Buy Level:
                  </label>
                  <Field name='level' onClick={submitForm} as='button'>
                    <SmallButton>Level Up</SmallButton>
                  </Field>
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

  if (!ranger) {
    return <Loader />
  }

  return (
    <div>
      <div className='space-y-1'>
        <Card header={null} main={<LevelUpCardContent ranger={ranger} />} />
      </div>
    </div>
  )
}
