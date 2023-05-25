'use client'

import { FireIcon } from '@heroicons/react/24/outline'
import classnames from 'classnames'

import { useAtom } from 'jotai'
import { useMemo, useState, useEffect } from 'react'

import { MemberSkill, Skill } from './types'

import Decrement from '../parts/decrement'
import Increment from '../parts/increment'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'

import { useSkillsBp } from '../ranger/atoms/build-points'

import { DECREASE, INCREASE, MAX_SKILLS_FOR_BP_SPENT, SKILL_POINTS_PER_BP } from '../rules/creation-rules'
import { useRangerApi } from '../ranger/ranger-api'
import { useSkillsApi } from './skills-api'
import { MechanicClassType, MechanicModType, PrimaryFeatureType } from '../../graphql/generated/graphql'
import { useFeaturesApi } from '../features/features-api'

export default function Skills() {
  const [ show, toggleShow ] = useState(false)
  const [ skillsBp ] = useAtom(useSkillsBp)

  const { data: skills } = useSkillsApi().getSkills
  const { data: memberSkills } = useSkillsApi().getMemberSkills
  const { data: features } = useFeaturesApi().getFeatures
  const { data: ranger } = useRangerApi().getRangerById
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

  const purchasedSkillsCount = useMemo(() => {
    return (
      memberSkills?.allMemberSkills?.nodes.reduce((acc, rangerSkill) => {
        return acc + rangerSkill.value
      }, 0) ?? 0
    )
  }, [ memberSkills ])

  const increaseLimitForSkillLevelUp = useMemo(() => {
    return (
      features?.allFeatures?.nodes.find(
        feat =>
          feat.primaryType === PrimaryFeatureType.LevelGrant &&
          feat.mechanicClass === MechanicClassType.Skill &&
          feat.mechanicMod === MechanicModType.Limit
      )?.value ?? 1
    )
  }, [ features ])

  const availablePoints = useMemo(() => {
    const availablePointsLocal = {
      remainingFromBp: 0,
      remainingFromLvl: 0,
      skillLvlGrantCount: 0,
      totalSkillsIncreased: 0,
      total: 0,
    }

    if (ranger) {
      const bpAllottedForSkills =
        ranger?.characterById?.characterBpLookupsByCharacterId?.nodes?.[0]?.bpSpentOnSkills ?? 0
      const skillLevelUps =
        ranger?.characterById?.memberLevelsByCharacterId.nodes.reduce((prev, curr) => {
          if (curr.levelGrantByLevelGrantId?.grantType === MechanicClassType.Skill) {
            return prev + curr.timesGranted
          }
          return prev
        }, 0) ?? 0

      const totalSkillsIncreased =
        memberSkills?.allMemberSkills?.nodes.reduce((prev, curr) => {
          if (curr.value > 0) {
            return prev + 1
          }
          return prev
        }, 0) ?? 0

      const skillLevelUpMod = features?.allFeatures?.nodes.find(feat => {
        return (
          feat.primaryType === PrimaryFeatureType.LevelGrant &&
          feat.mechanicClass === MechanicClassType.Skill &&
          feat.mechanicMod === MechanicModType.Modifier
        )
      })
      let spentDecremented = purchasedSkillsCount
      let pointsFromBpLeft = bpAllottedForSkills * SKILL_POINTS_PER_BP
      let pointsFromLvlLeft = skillLevelUps * (skillLevelUpMod?.value ?? 1)

      if (purchasedSkillsCount > pointsFromBpLeft) {
        spentDecremented = spentDecremented - pointsFromBpLeft
        pointsFromBpLeft = 0
      } else {
        spentDecremented = 0
        pointsFromBpLeft = pointsFromBpLeft - purchasedSkillsCount
      }

      if (spentDecremented > 0) {
        pointsFromLvlLeft = pointsFromLvlLeft - spentDecremented
      }

      availablePointsLocal.totalSkillsIncreased = totalSkillsIncreased
      availablePointsLocal.skillLvlGrantCount = skillLevelUps
      availablePointsLocal.remainingFromBp = pointsFromBpLeft
      availablePointsLocal.remainingFromLvl = pointsFromLvlLeft
      availablePointsLocal.total = pointsFromBpLeft + pointsFromLvlLeft
    }

    return availablePointsLocal
  }, [ purchasedSkillsCount, ranger, features, memberSkills ])

  const getRangerSkillBySkillId = (skillId: string): MemberSkill | null => {
    const { nodes: rangerSkills } = memberSkills?.allMemberSkills ?? { nodes: [] }
    const rangerSkill = rangerSkills.find(rs => rs.skillId === skillId)
    return rangerSkill ?? null
  }

  const checkCanIncrease = (rangerSkill: MemberSkill) => {
    // must spend a build point and have some points remining to increase a skill
    if (availablePoints.total === 0) {
      return false
    }

    // deplete BP first
    const hasPointsToSpendFromBp = availablePoints.remainingFromBp > 0

    if (hasPointsToSpendFromBp) {
      // rules in english:
      //  1. max of 8 different skills per bp spent
      //  2. max skill value is 1 per bp spent
      //  3. must have skill points for spending
      const maxSkillValAtCreate = skillsBp
      const maxSkillsPermittedAtCreate = skillsBp * MAX_SKILLS_FOR_BP_SPENT
      const canIncreaseSkills = maxSkillsPermittedAtCreate >= availablePoints.totalSkillsIncreased
      const canIncreaseThisSkill = rangerSkill.value < maxSkillValAtCreate

      if (canIncreaseSkills && canIncreaseThisSkill) {
        return true
      }
      return false
    }

    // 2 points per skill per skill level up
    const hasPointsToSpendFromLvlUp = availablePoints.remainingFromLvl > 0

    let skillValCounter = skillsBp * MAX_SKILLS_FOR_BP_SPENT
    const modifier = skillsBp
    const rangerSkillsHash: any = {}

    for (const rs of memberSkills?.allMemberSkills?.nodes!) {
      if (skillValCounter > 0 && rs.value > 0) {
        skillValCounter = rs.value >= modifier ? skillValCounter - modifier : skillValCounter - rs.value
        const adjustedVal = rs.value >= modifier ? rs.value - modifier : 0
        rangerSkillsHash[rs.id] = {
          adjustedVal,
          ...rs,
        }
      } else {
        rangerSkillsHash[rs.id] = {
          adjustedVal: rs.value,
          ...rs,
        }
      }
    }

    if (hasPointsToSpendFromLvlUp) {
      // rules in english:
      //  1. max of 5 different skills per level up
      //  2. max skill value is 2 per skill type level up
      //  3. must have skill points for spending
      const maxVal = availablePoints.skillLvlGrantCount * increaseLimitForSkillLevelUp
      console.log('maxVal', maxVal)
      if (rangerSkillsHash[rangerSkill.id].adjustedVal < maxVal) {
        return true
      }
      return false
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
    const skill = skills?.allSkills?.nodes.find(skill => skill.id === rangerSkill?.skillId)

    if (updateSkillMutateStatus != 'idle' || !rangerSkill || !skill) {
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
          // {...(budgetedSkillsCount - purchasedSkillsCount !== 0
          //   ? {
          //       subtext: 'Available points:',
          //       subvalue: budgetedSkillsCount - purchasedSkillsCount,
          //     }
          //   : {})}
          subtext='Available points (from build):'
          subvalue={availablePoints?.remainingFromBp}
        />
        <MinorHeader
          content=''
          // icon={<FireIcon className='text-orange-400' />}
          // {...(budgetedSkillsCount - purchasedSkillsCount !== 0
          //   ? {
          //       subtext: 'Available points:',
          //       subvalue: budgetedSkillsCount - purchasedSkillsCount,
          //     }
          //   : {})}
          subtext='Available points (from leveling):'
          subvalue={availablePoints?.remainingFromLvl}
        />
      </div>
      {show && (
        <div className='space-y-4'>
          {skills?.allSkills?.nodes.map(skill => {
            const rangerSkill = getRangerSkillBySkillId(skill.id)
            const canIncrement = checkCanIncrease(rangerSkill!)
            const canDecrement = checkCanDecrease(rangerSkill!)

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
