import classnames from 'classnames'

import Personal from '../../../components/ranger/personal'
import Stats from '../../../components/stats/stats'
import HeroicActions from '../../../components/heroic-actions/heroic-actions'
import Spells from '../../../components/spells/spells'
import Equipment from '../../../components/equipment/equipment'
import Skills from '../../../components/skills/skills'

export default function Ranger() {
  const sectionBaseStyles = {
    'border-b-2 border-transparent hover:border-slate-300 hover:border-b-2 hover:border-dashed block pb-2':
      true,
  }

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
