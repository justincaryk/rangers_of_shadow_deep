'use client'

import { FireIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { skills } from '../data'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import { useBpForSKills } from './atoms/build-points'

export default function Skills() {
  const [ show, toggleShow ] = useState(false)
  const [ _, updateBuildPoints ] = useAtom(useBpForSKills)

  return (
    <div>
      <div className='mt-2'>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} onClick={() => toggleShow(!show)} />
        </div>
        <MinorHeader
          content='skills'
          icon={<FireIcon className='text-orange-400' />}
        />
      </div>
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
