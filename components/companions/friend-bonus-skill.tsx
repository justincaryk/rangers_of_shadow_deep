'use client'

import { useEffect, useMemo, useState } from 'react'
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
import classnames from 'classnames'

const FriendSkillSchema = Yup.object().shape({
  bonusSkill: Yup.string().nullable(),
})

export default function FriendBonusSkill() {
  const [ show, toggleShow ] = useState(false)

  const { data: skills } = useSkillsApi().getSkills
  const { data: mercenaries } = useCompanionsApi().getMercenaries
  const { data: memberSkills } = useSkillsApi().getMemberSkills
  const { data: friend } = useCompanionsApi().getFriendSummary
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

  const isMercenaryTypeSelected = useMemo(() => {
    return friend?.friendById?.mercenaryId
  }, [ friend ])

  const skillsOptions = useMemo(() => {
    return skills?.allSkills?.nodes.filter(skill => {
      const friendMercType = mercenaries?.allMercenaries?.nodes.find(
        merc => merc.id === friend?.friendById?.mercenaryId
      )
      const friendHasThis = friendMercType?.memberSkillsByMercenaryId.nodes.find(
        mercSkill => mercSkill.skillId === skill.id
      )
      return !friendHasThis
    })
  }, [ friend, mercenaries, skills ])

  return (
    <div className='space-y-6'>
      <div
        className={classnames({
          'mt-2': true,
          'cursor-pointer': isMercenaryTypeSelected,
          'cursor-not-allowed': !isMercenaryTypeSelected,
        })}
        onClick={() => {
          if (isMercenaryTypeSelected) {
            toggleShow(!show)
          }
        }}
      >
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader content='bonus skill select' icon={<FireIcon className='text-orange-400' />} />
      </div>
      <Card className='bg-black/50'>
        <div className='space-y-1 text-sm text-white'>
          <div>
            Whenever a specific companion is selected for the first time, the player should assign it{' '}
            <strong>+{INITIAL_RECRUIT_SKILL_BUMP}</strong> to any one skill.
          </div>
          <div>
            This may <strong>not</strong> be a skill the companion already possessed, but otherwise can be anything from
            the skills list.
          </div>
          {!isMercenaryTypeSelected ? (
            <div className='font-bold text-lg'>Please choose a companion type first!</div>
          ) : null}
        </div>
      </Card>
      {show && (
        <Card>
          <div className='space-y-4'>
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
                    {skillsOptions?.map(x => (
                      <option key={x.id} value={x.id}>
                        {capitalizeEach(x.name)}
                      </option>
                    ))}
                  </Field>
                  {values.bonusSkill ? (
                    <div className='space-y-4'>
                      <div className='font-bold'>
                        {skillsOptions?.find(skill => skill.id === values.bonusSkill)?.description ?? null}
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
