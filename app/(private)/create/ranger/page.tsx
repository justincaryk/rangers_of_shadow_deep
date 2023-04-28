import classnames from 'classnames'
import { sectionBaseStyles } from '../../../../components/parts/styles'

import Personal from '../../../../components/ranger/personal'
import Stats from '../../../../components/stats/stats'
import HeroicActions from '../../../../components/heroic-actions/heroic-actions'
import Spells from '../../../../components/spells/spells'
import Equipment from '../../../../components/equipment/equipment'
import Skills from '../../../../components/skills/skills'

export default function Ranger() {
  

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
