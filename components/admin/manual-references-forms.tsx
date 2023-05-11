'use client'

import { Field, Form, Formik } from 'formik'
import { Feature } from './types'
import { useFeaturesApi } from './features-api'
import SmallButton from '../parts/small-button'

import * as Yup from 'yup'
import { PrimaryFeatureType } from '../../graphql/generated/graphql'
import { useState } from 'react'

const FeatureUpdateSchema = Yup.object().shape({
  id: Yup.string().required(),
  itemId: Yup.string().nullable(),
  injuryId: Yup.string().nullable(),
  levelGrantId: Yup.string().nullable(),
  skillId: Yup.string().nullable(),
  statId: Yup.string().nullable(),
})

export default function ManualReferencesForm() {
  const [ show, setShow ] = useState(true)

  const { data: features } = useFeaturesApi().getFeatures
  const { data: related } = useFeaturesApi().getFeatureRelatedData
  const { mutate: setFeatureRefs } = useFeaturesApi().updateMemberStatById

  const handleSubmit = (data: typeof FeatureUpdateSchema.fields) => {
    setFeatureRefs({ ...data })
  }

  return (
    <div className='space-y-4'>
      <div className='text-lg font-bold italic uppercase text-blue-500 cursor-pointer' onClick={() => setShow(!show)}>
        Features Mapping {show ? '<<<' : '>>>'}
      </div>

      {show && (
        <>
          <div className='text-lg font-bold'>INJURIES</div>
          {features?.allFeatures?.nodes
            .filter(x => x.primaryType === PrimaryFeatureType.Injury)
            .map((feat: Feature) => {
              return (
                <div key={feat.id} className='border rounded space-y-2 bg-slate-400 p-6 bg-opacity-50'>
                  <div>
                    <div className='font-bold uppercase text-sm mb-1'>{feat.name}</div>
                    <div className='uppercase text-sm'>Primary type: {feat.primaryType}</div>
                    <div className='uppercase text-sm'>Level grant type: {feat.levelGrantType}</div>
                    <div className='uppercase text-sm'>Mechanic mod: {feat.mechanicMod}</div>
                    <div className='uppercase text-sm'>Value: {feat.value}</div>
                  </div>
                  <Formik
                    initialValues={{
                      id: feat.id,
                      itemId: feat.itemId,
                      injuryId: feat.injuryId,
                      levelGrantId: feat.levelGrantId,
                      skillId: feat.skillId,
                      statId: feat.statId,
                    }}
                    validationSchema={FeatureUpdateSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div>
                          {Object.keys(errors)
                            .map(x => errors[x])
                            .join(', ')}
                        </div>
                        <div>item id: {feat.itemId ?? 'NULL'}</div>
                        {/* items dropdown */}
                        <Field className='w-full' name='itemId' as='select'>
                          <option className='text-gray-500'>-- items --</option>
                          {related?.allItems?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name} - {x.description}
                            </option>
                          ))}
                        </Field>
                        <div>injury id: {feat.injuryId ?? 'NULL'}</div>
                        {/* injuries dropdown */}
                        <Field className='w-full' name='injuryId' as='select'>
                          <option className='text-gray-500'>-- injuries --</option>
                          {related?.allInjuries?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name} - {x.description}
                            </option>
                          ))}
                        </Field>
                        <div>level grant id: {feat.levelGrantId ?? 'NULL'}</div>
                        {/* level grants dropdown */}
                        <Field className='w-full' name='levelGrantId' as='select'>
                          <option className='text-gray-500'>-- level grants --</option>
                          {related?.allLevelGrants?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name} - {x.description}
                            </option>
                          ))}
                        </Field>
                        <div>skill id: {feat.skillId ?? 'NULL'}</div>
                        {/* skills dropdown */}
                        <Field className='w-full' name='skillId' as='select'>
                          <option className='text-gray-500'>-- skills --</option>
                          {related?.allSkills?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name}
                            </option>
                          ))}
                        </Field>
                        <div>stat id: {feat.statId ?? 'NULL'}</div>
                        {/* stats dropdown */}
                        <Field className='w-full' name='statId' as='select'>
                          <option className='text-gray-500'>-- stats --</option>
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

          <div className='text-lg font-bold'>ITEMS</div>
          {features?.allFeatures?.nodes
            .filter(x => x.primaryType === PrimaryFeatureType.Item)
            .map((feat: Feature) => {
              return (
                <div key={feat.id} className='border rounded space-y-2 bg-slate-400 p-6 bg-opacity-50'>
                  <div>
                    <div className='font-bold uppercase text-sm mb-1'>{feat.name}</div>
                    <div className='uppercase text-sm'>Primary type: {feat.primaryType}</div>
                    <div className='uppercase text-sm'>Level grant type: {feat.levelGrantType}</div>
                    <div className='uppercase text-sm'>Mechanic mod: {feat.mechanicMod}</div>
                    <div className='uppercase text-sm'>Value: {feat.value}</div>
                  </div>
                  <Formik
                    initialValues={{
                      id: feat.id,
                      itemId: feat.itemId,
                      injuryId: feat.injuryId,
                      levelGrantId: feat.levelGrantId,
                      skillId: feat.skillId,
                      statId: feat.statId,
                    }}
                    validationSchema={FeatureUpdateSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div>
                          {Object.keys(errors)
                            .map(x => errors[x])
                            .join(', ')}
                        </div>
                        <div>item id: {feat.itemId ?? 'NULL'}</div>
                        {/* items dropdown */}
                        <Field className='w-full' name='itemId' as='select'>
                          <option className='text-gray-500'>-- items --</option>
                          {related?.allItems?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name} - {x.description}
                            </option>
                          ))}
                        </Field>
                        <div>injury id: {feat.injuryId ?? 'NULL'}</div>
                        {/* injuries dropdown */}
                        <Field className='w-full' name='injuryId' as='select'>
                          <option className='text-gray-500'>-- injuries --</option>
                          {related?.allInjuries?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name} - {x.description}
                            </option>
                          ))}
                        </Field>
                        <div>level grant id: {feat.levelGrantId ?? 'NULL'}</div>
                        {/* level grants dropdown */}
                        <Field className='w-full' name='levelGrantId' as='select'>
                          <option className='text-gray-500'>-- level grants --</option>
                          {related?.allLevelGrants?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name} - {x.description}
                            </option>
                          ))}
                        </Field>
                        <div>skill id: {feat.skillId ?? 'NULL'}</div>
                        {/* skills dropdown */}
                        <Field className='w-full' name='skillId' as='select'>
                          <option className='text-gray-500'>-- skills --</option>
                          {related?.allSkills?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name}
                            </option>
                          ))}
                        </Field>
                        <div>stat id: {feat.statId ?? 'NULL'}</div>
                        {/* stats dropdown */}
                        <Field className='w-full' name='statId' as='select'>
                          <option className='text-gray-500'>-- stats --</option>
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
          {!features?.allFeatures?.nodes.filter(x => x.primaryType === PrimaryFeatureType.Item)?.length && (
            <div className='font-semibold text-red-700'>NO MATCHING FEATURES OF THIS TYPE FOUND</div>
          )}

          <div className='text-lg font-bold'>RANGER LEVEL UPS</div>
          {features?.allFeatures?.nodes
            .filter(x => x.primaryType === PrimaryFeatureType.LevelGrant)
            .map((feat: Feature) => {
              return (
                <div key={feat.id} className='border rounded space-y-2 bg-slate-400 p-6 bg-opacity-50'>
                  <div>
                    <div className='font-bold uppercase text-sm mb-1'>{feat.name}</div>
                    <div className='uppercase text-sm'>Primary type: {feat.primaryType}</div>
                    <div className='uppercase text-sm'>Level grant type: {feat.levelGrantType}</div>
                    <div className='uppercase text-sm'>Mechanic mod: {feat.mechanicMod}</div>
                    <div className='uppercase text-sm'>Value: {feat.value}</div>
                  </div>
                  <Formik
                    initialValues={{
                      id: feat.id,
                      itemId: feat.itemId,
                      injuryId: feat.injuryId,
                      levelGrantId: feat.levelGrantId,
                      skillId: feat.skillId,
                      statId: feat.statId,
                    }}
                    validationSchema={FeatureUpdateSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div>
                          {Object.keys(errors)
                            .map(x => errors[x])
                            .join(', ')}
                        </div>
                        <div>item id: {feat.itemId ?? 'NULL'}</div>
                        {/* items dropdown */}
                        <Field className='w-full' name='itemId' as='select'>
                          <option className='text-gray-500'>-- items --</option>
                          {related?.allItems?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name} - {x.description}
                            </option>
                          ))}
                        </Field>
                        <div>injury id: {feat.injuryId ?? 'NULL'}</div>
                        {/* injuries dropdown */}
                        <Field className='w-full' name='injuryId' as='select'>
                          <option className='text-gray-500'>-- injuries --</option>
                          {related?.allInjuries?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name} - {x.description}
                            </option>
                          ))}
                        </Field>
                        <div>level grant id: {feat.levelGrantId ?? 'NULL'}</div>
                        {/* level grants dropdown */}
                        <Field className='w-full' name='levelGrantId' as='select'>
                          <option className='text-gray-500'>-- level grants --</option>
                          {related?.allLevelGrants?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name} - {x.description}
                            </option>
                          ))}
                        </Field>
                        <div>skill id: {feat.skillId ?? 'NULL'}</div>
                        {/* skills dropdown */}
                        <Field className='w-full' name='skillId' as='select'>
                          <option className='text-gray-500'>-- skills --</option>
                          {related?.allSkills?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name}
                            </option>
                          ))}
                        </Field>
                        <div>stat id: {feat.statId ?? 'NULL'}</div>
                        {/* stats dropdown */}
                        <Field className='w-full' name='statId' as='select'>
                          <option className='text-gray-500'>-- stats --</option>
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
          {!features?.allFeatures?.nodes.filter(x => x.primaryType === PrimaryFeatureType.LevelGrant)?.length && (
            <div className='font-semibold text-red-700'>NO MATCHING FEATURES OF THIS TYPE FOUND</div>
          )}

          <div className='text-lg font-bold'>COMPANION LEVEL UPS</div>
          {features?.allFeatures?.nodes
            .filter(x => x.primaryType === PrimaryFeatureType.CompanionLevelGrant)
            .map((feat: Feature) => {
              return (
                <div key={feat.id} className='border rounded space-y-2 bg-slate-400 p-6 bg-opacity-50'>
                  <div>
                    <div className='font-bold uppercase text-sm mb-1'>{feat.name}</div>
                    <div className='uppercase text-sm'>Primary type: {feat.primaryType}</div>
                    <div className='uppercase text-sm'>Level grant type: {feat.levelGrantType}</div>
                    <div className='uppercase text-sm'>Mechanic mod: {feat.mechanicMod}</div>
                    <div className='uppercase text-sm'>Value: {feat.value}</div>
                  </div>
                  <Formik
                    initialValues={{
                      id: feat.id,
                      itemId: feat.itemId,
                      injuryId: feat.injuryId,
                      levelGrantId: feat.levelGrantId,
                      skillId: feat.skillId,
                      statId: feat.statId,
                    }}
                    validationSchema={FeatureUpdateSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div>
                          {Object.keys(errors)
                            .map(x => errors[x])
                            .join(', ')}
                        </div>
                        <div>item id: {feat.itemId ?? 'NULL'}</div>
                        {/* items dropdown */}
                        <Field className='w-full' name='itemId' as='select'>
                          <option className='text-gray-500'>-- items --</option>
                          {related?.allItems?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name} - {x.description}
                            </option>
                          ))}
                        </Field>
                        <div>injury id: {feat.injuryId ?? 'NULL'}</div>
                        {/* injuries dropdown */}
                        <Field className='w-full' name='injuryId' as='select'>
                          <option className='text-gray-500'>-- injuries --</option>
                          {related?.allInjuries?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name} - {x.description}
                            </option>
                          ))}
                        </Field>
                        <div>level grant id: {feat.levelGrantId ?? 'NULL'}</div>
                        {/* level grants dropdown */}
                        <Field className='w-full' name='levelGrantId' as='select'>
                          <option className='text-gray-500'>-- level grants --</option>
                          {related?.allLevelGrants?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name} - {x.description}
                            </option>
                          ))}
                        </Field>
                        <div>skill id: {feat.skillId ?? 'NULL'}</div>
                        {/* skills dropdown */}
                        <Field className='w-full' name='skillId' as='select'>
                          <option className='text-gray-500'>-- skills --</option>
                          {related?.allSkills?.nodes.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name}
                            </option>
                          ))}
                        </Field>
                        <div>stat id: {feat.statId ?? 'NULL'}</div>
                        {/* stats dropdown */}
                        <Field className='w-full' name='statId' as='select'>
                          <option className='text-gray-500'>-- stats --</option>
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
          {!features?.allFeatures?.nodes.filter(x => x.primaryType === PrimaryFeatureType.CompanionLevelGrant)
            ?.length && <div className='font-semibold text-red-700'>NO MATCHING FEATURES OF THIS TYPE FOUND</div>}
        </>
      )}
    </div>
  )
}
