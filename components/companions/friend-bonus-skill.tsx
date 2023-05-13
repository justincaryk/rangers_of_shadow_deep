'use client'

import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'

import { FireIcon } from '@heroicons/react/24/outline'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import Card from '../parts/card'
import { baseInputClasses } from '../parts/input'
import SmallButton from '../parts/small-button'

import { useSkillsApi } from '../skills/skills-api'
import { useCompanionsApi } from './companions-api'

import { FriendPatch } from '../../graphql/generated/graphql'
import { INITIAL_RECRUIT_SKILL_BUMP } from '../rules/creation-rules'

import { capitalizeEach } from '../utils'

const FriendSkillSchema = Yup.object().shape({
  bonusSkill: Yup.string().nullable(),
})

export default function FriendBonusSkill() {
  const [ show, toggleShow ] = useState(false)

  const { data: skills } = useSkillsApi().getSkills
  const { data: friend } = useCompanionsApi().getFriend
  const { mutate: mutateFriend, status, reset } = useCompanionsApi().updateFriend

  useEffect(() => {
    if (status === 'success' && show) {
      toggleShow(false)
      reset()
    }
  }, [ show, status, reset ])

  const handleSubmit = (data: FriendPatch) => {
    mutateFriend({
      id: friend?.friendById?.id,
      patch: {
        ...data,
      },
    })
  }

  return (
    <div className='space-y-6'>
      <div className='mt-2 cursor-pointer' onClick={() => toggleShow(!show)}>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader content='bonus skill select' icon={<FireIcon className='text-orange-400' />} />
      </div>
      {show && (
        <Card>
          <div className='space-y-4'>
            <Card className='bg-black/50'>
              <div className='space-y-1 text-sm text-white'>
                <div>
                  Whenever a specific companion is selected for the first time, the player should assign it{' '}
                  <strong>+{INITIAL_RECRUIT_SKILL_BUMP}</strong> to any one skill.
                </div>
                <div>
                  This may <strong>not</strong> be a skill the companion already possessed, but otherwise can be
                  anything from the skills list.
                </div>
              </div>
            </Card>
            <Formik
              initialValues={{
                bonusSkill: friend?.friendById?.bonusSkill ?? '',
              }}
              validationSchema={FriendSkillSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, values }) => (
                <Form className='space-y-2'>
                  <Field className={`w-1/2 ${baseInputClasses} capitalize`} name='bonusSkill' as='select'>
                    <option className='text-gray-500' value={''}>
                      -- SKILLS --
                    </option>
                    {skills?.allSkills?.nodes.map(x => (
                      <option key={x.id} value={x.id}>
                        {capitalizeEach(x.name)}
                      </option>
                    ))}
                  </Field>
                  {values.bonusSkill ? (
                    <div className='space-y-4'>
                      <div className='font-bold'>
                        {skills?.allSkills?.nodes.find(skill => skill.id === values.bonusSkill)?.description ?? null}
                      </div>
                      <SmallButton primary>Save</SmallButton>
                    </div>
                  ) : null}
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      )}
    </div>
  )
}
