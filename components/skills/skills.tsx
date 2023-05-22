'use client'

import { FireIcon } from '@heroicons/react/24/outline'
import classnames from 'classnames'

import { useAtom } from 'jotai'
import { useMemo, useState, useEffect } from 'react'

import { MemberSkill } from './types'

import Decrement from '../parts/decrement'
import Increment from '../parts/increment'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'

import { useSkillsBp } from '../ranger/atoms/build-points'

import { DECREASE, INCREASE, SKILL_POINTS_PER_BP } from '../rules/creation-rules'
import { useRangerApi } from '../ranger/ranger-api'
import { useSkillsApi } from './skills-api'

export default function Skills() {
  const [ show, toggleShow ] = useState(false)
  const [ skillsBp ] = useAtom(useSkillsBp)

  const { data: skills } = useSkillsApi().getSkills
  const {
    mutate: mutateUpdateSkill,
    status: updateSkillMutateStatus,
    reset: resetUpdateSkillMutation,
  } = useSkillsApi().updateMemberSkill

  // reset the mutation to ensure multiple updates are allowed
  useEffect(() => {
    if (updateSkillMutateStatus === 'success') {
      resetUpdateSkillMutation()
    }
  }, [ updateSkillMutateStatus, resetUpdateSkillMutation ])

  const { data: ranger } = useRangerApi().getRangerById
  const { mutate: mutateSpendBp } = useRangerApi().updateRanger
  const budgetedSkillsCount = useMemo(() => {
    return ranger?.characterById?.totalSkillPoints ?? 0
  }, [ ranger ])

  const purchasedSkillsCount = useMemo(() => {
    return (
      ranger?.characterById?.memberSkillsByCharacterId.nodes.reduce((acc, rangerSkill) => {
        return acc + rangerSkill.value
      }, 0) ?? 0
    )
  }, [ ranger ])

  const remainingSkillPoints = useMemo(() => {
    return budgetedSkillsCount - purchasedSkillsCount
  }, [ budgetedSkillsCount, purchasedSkillsCount ])

  const spendBpForSkillPoints = () => {
    if (skillsBp > 0) {
      mutateSpendBp({
        id: ranger?.characterById?.id,
        patch: {
          totalSkillPoints: budgetedSkillsCount + SKILL_POINTS_PER_BP,
        },
      })
    }
  }

  const recoverBuildPoint = () => {
    const pointBalance = budgetedSkillsCount - purchasedSkillsCount

    if (pointBalance >= SKILL_POINTS_PER_BP) {
      mutateSpendBp({
        id: ranger?.characterById?.id,
        patch: {
          totalSkillPoints: budgetedSkillsCount - SKILL_POINTS_PER_BP,
        },
      })
    }
  }

  const getRangerSkillBySkillId = (skillId: string): MemberSkill | null => {
    const { nodes: rangerSkills } = ranger?.characterById?.memberSkillsByCharacterId ?? { nodes: [] }
    const rangerSkill = rangerSkills.find(rs => rs.skillId === skillId)
    return rangerSkill ?? null
  }

  const checkCanIncrease = (rangerSkill?: MemberSkill | null) => {
    // must spend a build point and have some points remining to increase a skill
    if (budgetedSkillsCount === 0 || remainingSkillPoints === 0) {
      return false
    }

    if (rangerSkill && skillsBp > rangerSkill.value)
      if (skillsBp > rangerSkill.value) {
        return true
      }

    return false
  }

  const checkCanDecrease = (rangerSkill?: MemberSkill | null) => {
    // if defined and not zero => good to go
    if (rangerSkill && rangerSkill.value > 0) {
      return true
    }

    return false
  }

  const updateSkill = (rangerSkill: MemberSkill | null, modifier: number) => {
    if (updateSkillMutateStatus != 'idle' || !rangerSkill) {
      return null
    }
    if (modifier === INCREASE && !checkCanIncrease(rangerSkill)) {
      return null
    }
    if (modifier === DECREASE && !checkCanDecrease(rangerSkill)) {
      return null
    }

    mutateUpdateSkill({
      id: rangerSkill.id,
      value: rangerSkill.value + modifier,
    })
  }

  return (
    <div className='space-y-4'>
      <div className='mt-2 cursor-pointer' onClick={() => toggleShow(!show)}>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader
          content='skills'
          icon={<FireIcon className='text-orange-400' />}
          {...(budgetedSkillsCount - purchasedSkillsCount !== 0 ? {
            subtext: 'Available points:',
            subvalue: budgetedSkillsCount - purchasedSkillsCount,
          } : {})}
        />
      </div>
      {show && (
        <div className='space-y-4'>
          {skills?.allSkills?.nodes.map(skill => {
            const rangerSkill = getRangerSkillBySkillId(skill.id)
            const canIncrement = checkCanIncrease(rangerSkill)
            const canDecrement = checkCanDecrease(rangerSkill)

            return (
              <div key={skill.name}>
                <div className='grid grid-flow-col auto-cols-min justify-start gap-x-4 items-center w-1/2'>
                  <div className='font-semibold capitalize w-28'>{skill.name}</div>
                  <div className='text-lg font-bold'>{rangerSkill?.value ?? 0}</div>
                  <div className='flex gap-2'>
                    <div
                      className={classnames({
                        'w-6': true,
                        'cursor-not-allowed': !canIncrement,
                        'cursor-pointer': canIncrement,
                      })}
                    >
                      <Increment onClick={() => updateSkill(rangerSkill, INCREASE)} disabled={!canIncrement} />
                    </div>
                    <div
                      className={classnames({
                        'w-6': true,
                        'cursor-not-allowed': !canDecrement,
                        'cursor-pointer': canDecrement,
                      })}
                    >
                      <Decrement onClick={() => updateSkill(rangerSkill, DECREASE)} disabled={!canDecrement} />
                    </div>
                  </div>
                </div>
                <div className='italic text-slate-400 text-sm ml-2'>{skill.description}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
