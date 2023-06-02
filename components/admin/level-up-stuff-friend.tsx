'use client'

import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { MultiSelect, Option } from 'react-multi-select-component'
import { MechanicClassType, MechanicModType, PrimaryFeatureType } from '../../graphql/generated/graphql'
import { useFeaturesApi } from '../features/features-api'
import { Feature } from '../features/types'
import SmallButton from '../parts/small-button'
import { FeatureUpdateSchema, FeatureUpdateSchemaType } from './types'
import { castServerPickIdsToOptions } from './utils'

export default function LevelUpStuffFriend() {
  const [ show, setShow ] = useState(false)
  const { data: features } = useFeaturesApi().getFeatures
  const { data: related } = useFeaturesApi().getFeatureRelatedData
  const { mutate: setFeatureRef } = useFeaturesApi().updateFeatureById

  const handleSubmit = ({ id, pickIds, ...rest }: FeatureUpdateSchemaType) => {
    setFeatureRef({
      id,
      patch: {
        pickIds: pickIds?.map(pick => pick.value),
        ...rest,
      },
    })
  }

  const getOptionsForFeature = (feat: Feature) => {
    if (feat.mechanicMod === MechanicModType.Pick) {
      if (feat.mechanicClass === MechanicClassType.Stat) {
        return related?.allStats?.nodes.map(stat => ({ label: stat.name, value: stat.id })) ?? []
      }
      if (feat.mechanicClass === MechanicClassType.Item) {
        return related?.allItems?.nodes.map(item => ({ label: item.name, value: item.id })) ?? []
      }
    }

    return []
  }

  return (
    <>
      <div className='text-lg font-bold italic uppercase text-blue-500 cursor-pointer' onClick={() => setShow(!show)}>
        COMPANION LEVEL UPS
      </div>
      {show &&
        features?.allFeatures?.nodes
          .filter(
            x => x.primaryType === PrimaryFeatureType.FriendLevelGrant || x.primaryType === PrimaryFeatureType.Mercenary
          )
          .map((feat: Feature) => {
            const optionsForFeature = getOptionsForFeature(feat)
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
                    mercenaryId: feat.mercenaryId ?? undefined,
                    requiresItemId: feat.requiresItemId ?? undefined,
                    excludesItemId: feat.excludesItemId ?? undefined,
                    pickIds: castServerPickIdsToOptions({ ids: feat?.pickIds, options: optionsForFeature }),
                  }}
                  validationSchema={FeatureUpdateSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, setFieldValue }) => (
                    <Form>
                      {/* <div>{JSON.stringify(errors)}</div> */}

                      {/* companion level grants dropdown */}
                      <div>companion level up id: {feat.friendLevelGrantId ?? 'NULL'}</div>
                      <Field className='w-full' name='friendLevelGrantId' as='select'>
                        <option className='text-gray-500' value={''}>
                          -- companion level grants --
                        </option>
                        {related?.allFriendLevelGrants?.nodes.map(x => (
                          <option key={x.id} value={x.id}>
                            {x.description}
                          </option>
                        ))}
                      </Field>

                      <div>mercenary id: {feat.mercenaryId ?? 'NULL'}</div>
                      {/* mercenaries dropdown */}
                      <Field className='w-full' name='mercenaryId' as='select'>
                        <option className='text-gray-500' value={''}>
                          -- mercenaries --
                        </option>
                        {related?.allMercenaries?.nodes.map(x => (
                          <option key={x.id} value={x.id}>
                            {x.name}
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

                      {/* pick ids.... */}
                      {optionsForFeature.length > 0 && (
                        <Field className='w-full' name='pickIds'>
                          {({ field }: any) => (
                            <div>
                              <label>PickIds</label>
                              <MultiSelect
                                onChange={(selections: Option[]) => {
                                  setFieldValue('pickIds', selections)
                                }}
                                value={field.value}
                                labelledBy='pickIds'
                                options={optionsForFeature}
                              />
                            </div>
                          )}
                        </Field>
                      )}

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
      {!features?.allFeatures?.nodes.filter(x => x.primaryType === PrimaryFeatureType.FriendLevelGrant)?.length && (
        <div className='font-semibold text-red-700'>NO MATCHING FEATURES OF THIS TYPE FOUND</div>
      )}
    </>
  )
}
