'use client'

import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { PrimaryFeatureType } from '../../graphql/generated/graphql'
import { useFeaturesApi } from '../features/features-api'
import { Feature } from '../features/types'
import SmallButton from '../parts/small-button'
import { FeatureUpdateSchema, FeatureUpdateSchemaType } from './types'

export default function InjuriesStuff() {
  const [ show, setShow ] = useState(false)
  const { data: features } = useFeaturesApi().getFeatures
  const { data: related } = useFeaturesApi().getFeatureRelatedData
  const { mutate: setFeatureRef } = useFeaturesApi().updateFeatureById

  const handleSubmit = ({ id, ...rest }: FeatureUpdateSchemaType) => {
    setFeatureRef({
      id,
      patch: { ...rest },
    })
  }

  return (
    <>
      <div className='text-lg font-bold italic uppercase text-blue-500 cursor-pointer' onClick={() => setShow(!show)}>
        INJURIES
      </div>
      {show &&
        features?.allFeatures?.nodes
          .filter(x => x.primaryType === PrimaryFeatureType.Injury)
          .map((feat: Feature) => {
            return (
              <div key={feat.id} className='border rounded space-y-2 bg-slate-400 p-6 bg-opacity-50'>
                <div>
                  <div className='font-bold uppercase text-sm mb-1'>{feat.name}</div>
                  <div className='uppercase text-sm'>Primary type: {feat.primaryType}</div>
                  <div className='uppercase text-sm'>Mechanic Class: {feat.mechanicClass}</div>
                  <div className='uppercase text-sm'>Mechanic Modifier: {feat.mechanicMod}</div>
                  <div className='uppercase text-sm'>Value: {feat.value}</div>
                </div>
                <Formik
                  initialValues={{
                    id: feat.id,
                    itemId: feat.itemId ?? undefined,
                    injuryId: feat.injuryId ?? undefined,
                    levelGrantId: feat.levelGrantId ?? undefined,
                    skillId: feat.skillId ?? undefined,
                    statId: feat.statId ?? undefined,
                    friendLevelGrantId: feat.friendLevelGrantId ?? undefined,
                    requiresItemId: feat.requiresItemId ?? undefined,
                    excludesItemId: feat.excludesItemId ?? undefined,
                    pickIds: [],
                  }}
                  validationSchema={FeatureUpdateSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      {/* <div>{JSON.stringify(errors)}</div> */}
                      <div>injury id: {feat.injuryId ?? 'NULL'}</div>
                      {/* injuries dropdown */}
                      <Field className='w-full' name='injuryId' as='select'>
                        <option className='text-gray-500' value={''}>
                          -- injuries --
                        </option>
                        {related?.allInjuries?.nodes.map(x => (
                          <option key={x.id} value={x.id}>
                            {x.name} - {x.description}
                          </option>
                        ))}
                      </Field>
                      <div>skill id: {feat.skillId ?? 'NULL'}</div>
                      {/* skills dropdown */}
                      <Field className='w-full' name='skillId' as='select'>
                        <option className='text-gray-500' value={''}>
                          -- skills --
                        </option>
                        {related?.allSkills?.nodes.map(x => (
                          <option key={x.id} value={x.id}>
                            {x.name}
                          </option>
                        ))}
                      </Field>
                      <div>stat id: {feat.statId ?? 'NULL'}</div>
                      {/* stats dropdown */}
                      <Field className='w-full' name='statId' as='select'>
                        <option className='text-gray-500' value={''}>
                          -- stats --
                        </option>
                        {related?.allStats?.nodes.map(x => (
                          <option key={x.id} value={x.id}>
                            {x.name}
                          </option>
                        ))}
                      </Field>
                      <div className='mt-2'>
                        <SmallButton primary type='submit'>
                          Save
                        </SmallButton>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )
          })}
      {!features?.allFeatures?.nodes.filter(x => x.primaryType === PrimaryFeatureType.Injury)?.length && (
        <div className='font-semibold text-red-700'>NO MATCHING FEATURES OF THIS TYPE FOUND</div>
      )}
    </>
  )
}
