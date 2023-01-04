'use client'

import { FireIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { skills } from '../data'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import { useGetTrueAvailBp } from '../utils'
import { useBpForSkills } from './atoms/build-points'
import { DECREASE, INCREASE, SKILL_POINTS_PER_BP } from './rules/rules'

export default function Skills() {
  const [ show, toggleShow ] = useState(false)
  const [ bpForSkills, updateSkillsBuildPoints ] = useAtom(useBpForSkills)
  const trueAvailBp = useGetTrueAvailBp(bpForSkills)

  // each skill can be increased 8x for each build point spent
  const [ allottedSkillPoints, setAllottedSkillPoints ] = useState(0)

  const updateAllottedSkillPoints = (modifier: number) => {
    if (trueAvailBp === 0) {
      return null
    }
    setAllottedSkillPoints(allottedSkillPoints + (modifier * SKILL_POINTS_PER_BP))
    updateSkillsBuildPoints(modifier)
  }

  return (
    <div>
      <div className='mt-2'>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} onClick={() => toggleShow(!show)} />
        </div>
        <MinorHeader
          content='skills'
          icon={<FireIcon className='text-orange-400'/>}
          minorBuildPoints={trueAvailBp} 
        />
        <div>
          Avail skill points.... {allottedSkillPoints}
        </div>
      </div>
      <div onClick={() => updateAllottedSkillPoints(INCREASE)}>Increase allotment </div>
      <div onClick={() => updateAllottedSkillPoints(DECREASE)}>Decrease allotment </div>
      {show && (
        <div className='px-4 py-5 sm:p-6'>
          {skills.map(skill => (
            <div key={skill.name}>
              <div className='font-semibold capitalize'>{skill.name}</div>
              <div>{skill.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
