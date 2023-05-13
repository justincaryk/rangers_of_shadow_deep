'use client'

import { useAtom } from 'jotai'
import { useState } from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { IdentificationIcon } from '@heroicons/react/24/outline'

import MinorHeader from '../parts/minor-header'
import { baseInputClasses } from '../parts/input'

import Loader from '../loader'
import LevelUpRanger from './leveling/leveling'

import { useBuildPoints } from './atoms/build-points'
import { useRangerApi } from './ranger-api'
import BuildPointsAssignment from './build-points/build-points-assignment'
import { CharacterPatch } from '../../graphql/generated/graphql'

export const MemberCoreFieldsSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
})

export const RangerLevelingFieldsSchema = Yup.object().shape({
  level: Yup.number().required('Required'),
  xp: Yup.number().required('Required'),
})

export default function CoreCharacter() {
  const [ showLevelUp, setShowLevelUp ] = useState(false)
  const [ showBuildPoints, setShowBuildPoints ] = useState(false)

  const [ totalBuildPoints ] = useAtom(useBuildPoints)
  const { data: ranger, status } = useRangerApi().getRangerById
  const { mutate } = useRangerApi().updateRanger

  const handleSubmit = (data: CharacterPatch) => {
    mutate({
      id: ranger?.characterById?.id,
      patch: {
        ...data,
      },
    })
  }

  if (status === 'loading') {
    return <Loader />
  }

  return (
    <div className='space-y-4'>
      <MinorHeader content='personal' icon={<IdentificationIcon className='text-emerald-400' />} />
      <Formik
        initialValues={{
          name: ranger?.characterById?.name ?? '',
        }}
        validationSchema={MemberCoreFieldsSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <Form className='space-y-1'>
            <div className='flex gap-x-2 items-center'>
              <label className='font-semibold' htmlFor='name' aria-label='name'>
                Ranger name:
              </label>
              <Field
                name='name'
                placeholder='Ranger name'
                className={`${baseInputClasses} max-w-sm`}
                onBlur={submitForm}
              />
            </div>
          </Form>
        )}
      </Formik>

      <div className={'cursor-pointer text-blue-500'} onClick={() => setShowLevelUp(!showLevelUp)}>
        {showLevelUp ? 'Done managing levels and xp' : 'Manage Levels and XP!'}
      </div>

      {showLevelUp && (
        <div>
          <LevelUpRanger />
        </div>
      )}
      <div className='font-bold '>
        Total BP Remaining: {totalBuildPoints}
      </div>
      <div className={'cursor-pointer text-blue-500'} onClick={() => setShowBuildPoints(!showBuildPoints)}>
        {showBuildPoints ? 'Done assigning build points' : 'Assign build points!'}
      </div>
      {showBuildPoints && (
        <div>
          <BuildPointsAssignment />
        </div>
      )}
    </div>
  )
}
