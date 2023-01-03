import Personal from '../../../components/ranger/personal'
import Stats from '../../../components/ranger/stats'
import HeroicActions from '../../../components/ranger/heroic-actions'
import Spells from '../../../components/ranger/spells'
import Equipment from '../../../components/ranger/equipment'
import Skills from '../../../components/ranger/skills'

export default function Ranger() {
  return (
    <div className='space-y-6 divide-y divide-dashed'>
      <Personal />
      <Stats />
      <HeroicActions />
      <Spells />
      <Skills />
      <Equipment />
    </div>
  )
}
