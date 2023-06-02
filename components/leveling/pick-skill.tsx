'use client'

import { useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import classnames from 'classnames'

import { notify } from '../parts/toast'
import { FireIcon } from '@heroicons/react/24/outline'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import Card from '../parts/card'
import { baseInputClasses } from '../parts/input'
import SmallButton from '../parts/small-button'

import { useSkillsApi } from '../skills/skills-api'
import { useCompanionsApi } from '../companions/companions-api'
import { useLevelingApi } from './leveling-api'
import { useCurrentMember } from '../react-query/hooks'

import { INITIAL_RECRUIT_SKILL_BUMP } from '../rules/creation-rules'
import { MemberLevel } from './types'
import { CreateMemberSkillInput, MechanicModType } from '../../graphql/generated/graphql'

import { capitalizeEach } from '../utils'

const FriendSkillSchema = Yup.object().shape({
  selectedSkill: Yup.string().required(),
})

type SkillSchemaType = Yup.InferType<typeof FriendSkillSchema>

interface Props {
  skillTypeLevel: MemberLevel
}
export default function PickSkill({ skillTypeLevel }: Props) {
  const [ show, toggleShow ] = useState(false)

  const { memberType, referenceColumnName, id: memberId } = useCurrentMember()
  const { data: friend } = useCompanionsApi().getFriendSummary

  const { data: skills } = useSkillsApi().getSkills
  const { data: mercenaries } = useCompanionsApi().getMercenaries
  const { data: memberSkills } = useSkillsApi().getMemberSkills

  const { mutateAsync: addMemberSkill } = useSkillsApi().createMemberSkill
  const { mutateAsync: updateMemberSkill } = useSkillsApi().updateMemberSkill
  const { mutateAsync: updateMemberLevel, status: updateLevelStatus } = useLevelingApi().updateLevelRef

  useEffect(() => {
    if (updateLevelStatus === 'success') {
    }
  }, [ updateLevelStatus ])

  const handleSubmit = async (data: SkillSchemaType, actions: FormikHelpers<SkillSchemaType>) => {
    // validate request
    if (!data.selectedSkill) {
      return null
    }

    // update or create a member stat lookup record
    const memberSkill = memberSkills?.allMemberSkills?.nodes.find(ms => ms.skillId === data.selectedSkill)
    const bonus =
      skillTypeLevel.friendLevelGrantByFriendLevelGrantId?.featuresByFriendLevelGrantId?.nodes.find(
        x => x.mechanicMod === MechanicModType.Pick
      )?.value ?? 0

    if (memberSkill) {
      await updateMemberSkill({
        id: memberSkill.id,
        value: memberSkill.value + bonus,
      })
    } else {
      // add stat
      await addMemberSkill({
        [referenceColumnName as keyof CreateMemberSkillInput]: memberId,
        skillId: data.selectedSkill,
        value: bonus,
      })
    }

    // update memberLevel with timesSpent
    await updateMemberLevel({
      id: skillTypeLevel.id,
      timesUsed: skillTypeLevel.timesUsed + 1,
    })

    notify('Skill saved!', { type: 'success' })
    actions.resetForm()
  }

  const isInitialSkillBump = useMemo(
    () => skillTypeLevel.friendLevelGrantByFriendLevelGrantId?.ppMilestoneFirst === 0,
    [ skillTypeLevel ]
  )

  const friendMercType = useMemo(() => {
    return mercenaries?.allMercenaries?.nodes.find(merc => merc.id === friend?.friendById?.mercenaryId)
  }, [ friend, mercenaries ])

  const checkIsSkillDisabled = (skillId: string) => {
    const isSkillKnown = !!friendMercType?.memberSkillsByMercenaryId.nodes.find(
      mercSkill => mercSkill.skillId === skillId
    )
    return isSkillKnown && isInitialSkillBump
  }

  const getCurrentSkillValue = (skillId: string) => {
    const bonusFromMerc = friendMercType?.memberSkillsByMercenaryId.nodes.find(ms => ms.skillId === skillId)?.value ?? 0
    const bonusFromLevels =
      memberSkills?.allMemberSkills?.nodes.reduce((prev, curr) => {
        if (curr.skillId === skillId) {
          return prev + curr.value
        }
        return prev
      }, 0) ?? 0

    return bonusFromMerc + bonusFromLevels
  }
  const getCurrentSkillValueString = (skillId: string) => {
    const current = getCurrentSkillValue(skillId)
    const sign = Math.sign(current)

    if (sign === 0) return ''

    const prefix = sign > 0 ? '+' : '-'
    return `(${prefix}${current})`
  }

  return (
    <div className='space-y-6'>
      <div
        className={classnames({
          'mt-2': true,
          'cursor-pointer': friendMercType?.id,
          'cursor-not-allowed': !friendMercType?.id,
        })}
        onClick={() => {
          if (friendMercType?.id) {
            toggleShow(!show)
          }
        }}
      >
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader content='skill select' icon={<FireIcon className='text-orange-400' />} />
      </div>
      {/* inform user this cannot be set without a companion type choice */}
      {!friendMercType?.id && (
        <Card className='bg-black/50'>
          <div className='space-y-1 text-sm text-white'>
            <div className='font-bold text-lg'>Please choose a companion type first!</div>
          </div>
        </Card>
      )}
      {show && (
        <Card className='bg-black/50'>
          {isInitialSkillBump ? (
            <div className='space-y-1 text-sm text-white'>
              <div>
                Whenever a specific companion is selected for the first time, the player should assign it{' '}
                <strong>+{INITIAL_RECRUIT_SKILL_BUMP}</strong> to any one skill.
              </div>
              <div>
                This may <strong>not</strong> be a skill the companion already possessed, but otherwise can be anything
                from the skills list.
              </div>
            </div>
          ) : (
            <div className='space-y-1 text-sm text-white'>
              {skillTypeLevel.friendLevelGrantByFriendLevelGrantId?.description}
            </div>
          )}
        </Card>
      )}
      {show && (
        <Card>
          <div className='space-y-4'>
            <Formik
              initialValues={{
                selectedSkill: '',
              }}
              validationSchema={FriendSkillSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, values }) => (
                <Form className='space-y-2'>
                  <Field className={`w-1/2 ${baseInputClasses} capitalize`} name='selectedSkill' as='select'>
                    <option className='text-gray-500' value={''}>
                      -- SKILLS --
                    </option>
                    {skills?.allSkills?.nodes.map(skill => (
                      <option key={skill.id} value={skill.id} disabled={checkIsSkillDisabled(skill.id)}>
                        {`${capitalizeEach(skill.name)} ${getCurrentSkillValueString(skill.id)}`}
                      </option>
                    ))}
                  </Field>
                  {values ? (
                    <div className='space-y-4'>
                      <div className='font-bold'>
                        {skills?.allSkills?.nodes.find(skill => skill.id === values.selectedSkill)?.description ?? null}
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
