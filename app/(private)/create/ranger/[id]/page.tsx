'use client'

import classnames from 'classnames'
import { sectionBaseStyles } from '../../../../../components/parts/styles'

import Personal from '../../../../../components/ranger/personal'
import Stats from '../../../../../components/stats/stats'
import HeroicActions from '../../../../../components/heroic-actions/heroic-actions'
import Spells from '../../../../../components/spells/spells'
import Equipment from '../../../../../components/equipment/equipment'
import Skills from '../../../../../components/skills/skills'
import { useSyncRangerBp } from '../../../../../components/ranger/atoms/build-points'

export default function Ranger() {
  // ensure this hook is invoked to keep available build points 
  // in line with the client state
  useSyncRangerBp();

  return (
    <div className='space-y-4 w-full'>
      <div className={classnames(sectionBaseStyles)}>
        <Personal />
      </div>
      <div className={classnames(sectionBaseStyles)}>
        <Stats />
      </div>
      <div className={classnames(sectionBaseStyles)}>
        <HeroicActions />
      </div>
      <div className={classnames(sectionBaseStyles)}>
        <Spells />
      </div>
      <div className={classnames(sectionBaseStyles)}>
        <Skills />
      </div>
      <div className={classnames(sectionBaseStyles)}>
        <Equipment />
      </div>
    </div>
  )
}
