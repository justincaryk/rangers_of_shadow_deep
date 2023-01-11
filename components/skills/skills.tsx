'use client'

import { FireIcon } from '@heroicons/react/24/outline'
import classnames from 'classnames'

import { useAtom } from 'jotai'
import { useMemo, useState } from 'react'

import { Skill, skills } from '../data'

import Card from '../parts/card'
import Decrement from '../parts/decrement'
import Increment from '../parts/increment'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import SmallButton from '../parts/small-button'

import { RANGER_FIELD } from '../types'
import { useGetTrueAvailBp } from '../utils'

import { useBpForSkills } from '../ranger/atoms/build-points'
import { useRanger } from '../ranger/atoms/ranger'

import {
  DECREASE,
  INCREASE,
  MAX_BP_FOR_SKILLS,
  SKILL_POINTS_PER_BP,
} from '../rules/ranger-rules'

export default function Skills() {
  const [ show, toggleShow ] = useState(false)
  const [ bpForSkills, updateSkillsBuildPoints ] = useAtom(useBpForSkills)
  const trueAvailBp = useGetTrueAvailBp(bpForSkills)
  const [ ranger, updateRanger ] = useAtom(useRanger)

  const skillPoints = useMemo(() => {
    const bgSpent = MAX_BP_FOR_SKILLS - bpForSkills
    const allotted = bgSpent * SKILL_POINTS_PER_BP
    const remaining =
      allotted -
      Object.values(ranger[RANGER_FIELD.SKILLS]).reduce((prev, curr) => {
        return prev + curr
      }, 0)

    return {
      bgSpent,
      allotted,
      remaining,
    }
  }, [ bpForSkills, ranger ])

  const spendBuildPoint = () => {
    if (trueAvailBp > 0) {
      updateSkillsBuildPoints(INCREASE)
    }
  }
  const recoverBuildPoint = () => {
    if (skillPoints.remaining >= SKILL_POINTS_PER_BP) {
      updateSkillsBuildPoints(DECREASE)
    }
  }

  const checkCanIncrease = (skill: Skill) => {
    // must spend a build point before increasing a skill
    if (skillPoints.remaining === 0) {
      return false
    }
    const currentSkillValue = ranger[RANGER_FIELD.SKILLS][skill.name] ?? 0
    // if no value assigned or less than remaining => good to go
    if (skillPoints.bgSpent > currentSkillValue && skillPoints.remaining > 0) {
      return true
    }

    return false
  }

  const checkCanDecrease = (skill: Skill) => {
    // if defined and not zero => good to go
    if (ranger[RANGER_FIELD.SKILLS][skill.name]) {
      return true
    }

    return false
  }

  const updateSkill = (skill: Skill, modifier: number) => {
    if (modifier === INCREASE) {
      if (!checkCanIncrease(skill)) {
        return null
      }
    } else {
      if (!checkCanDecrease(skill)) {
        return null
      }
    }

    const currentSkills = ranger[RANGER_FIELD.SKILLS]
    const currentSkillValue = currentSkills[skill.name] ?? 0

    // update ranger state
    updateRanger({
      ...ranger,
      [RANGER_FIELD.SKILLS]: {
        ...currentSkills,
        [skill.name]: currentSkillValue + modifier,
      },
    })
  }

  return (
    <div className='space-y-4'>
      <div className='mt-2'>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} onClick={() => toggleShow(!show)} />
        </div>
        <MinorHeader
          content='skills'
          icon={<FireIcon className='text-orange-400' />}
          subtext={'Available build points:'}
          subvalue={trueAvailBp}
        />
      </div>
      <Card
        header={null}
        main={
          <div className='space-y-4'>
            <div className='font-bold'>
              Allotted Skill Points: {skillPoints.remaining}
            </div>
            <div className='space-y-1 text-sm text-dirty-orange'>
              <div>
                Every <strong>1 BUILD POINT</strong> spent yields{' '}
                <strong>8 SKILL POINTS</strong>.
              </div>
              <div>
                You may <strong>only</strong> increase each skill by 1 for each{' '}
                <strong>BUILD POINT</strong>spent.
              </div>
            </div>
            <div className='space-x-2'>
              <SmallButton onClick={spendBuildPoint}>
                Increase allotment
              </SmallButton>
              <SmallButton onClick={recoverBuildPoint} className='bg-gray-400'>
                Decrease allotment
              </SmallButton>
            </div>
          </div>
        }
      />
      {show && (
        <div className='space-y-4'>
          {skills.map(skill => {
            const canIncrement = checkCanIncrease(skill)
            const canDecrement = checkCanDecrease(skill)
            return (
              <div key={skill.name}>
                <div className='grid grid-flow-col auto-cols-min justify-start gap-x-4 items-center w-1/2'>
                  <div className='font-semibold capitalize w-28'>
                    {skill.name}
                  </div>
                  <div className='text-lg font-bold'>
                    +{ranger[RANGER_FIELD.SKILLS][skill.name] ?? 0}
                  </div>
                  <div className='flex gap-2'>
                    <div
                      className={classnames({
                        'w-6': true,
                        'cursor-not-allowed': !canIncrement,
                        'cursor-pointer': canIncrement,
                      })}
                    >
                      <Increment
                        onClick={() => updateSkill(skill, INCREASE)}
                        disabled={!canIncrement}
                      />
                    </div>
                    <div
                      className={classnames({
                        'w-6': true,
                        'cursor-not-allowed': !canDecrement,
                        'cursor-pointer': canDecrement,
                      })}
                    >
                      <Decrement
                        onClick={() => updateSkill(skill, DECREASE)}
                        disabled={!canDecrement}
                      />
                    </div>
                  </div>
                </div>
                <div className='italic text-slate-400 text-sm ml-2'>
                  {skill.desc}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
