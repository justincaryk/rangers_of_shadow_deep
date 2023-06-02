'use client'

import Personal from '../../../../../components/ranger/core-character'
import Stats from '../../../../../components/stats/stats'
import HeroicActions from '../../../../../components/heroic-actions/heroic-actions'
import Spells from '../../../../../components/spells/spells'
import Equipment from '../../../../../components/equipment/equipment'
import Skills from '../../../../../components/skills/skills'
import { useSyncRangerBp } from '../../../../../components/ranger/atoms/build-points'
import RecruitmentPoints from '../../../../../components/ranger/recruitment'
import StackSection from '../../../../../components/parts/stack-section'

export default function Ranger() {
  // ensure this hook is invoked to keep available build points
  // in line with the client state
  useSyncRangerBp()

  return (
    <div className='space-y-4 w-full'>
      <StackSection>
        <Personal />
      </StackSection>
      <StackSection>
        <Stats />
      </StackSection>
      <StackSection>
        <HeroicActions />
      </StackSection>
      <StackSection>
        <Spells />
      </StackSection>
      <StackSection>
        <Skills />
      </StackSection>
      <StackSection>
        <Equipment />
      </StackSection>
      <StackSection>
        <RecruitmentPoints />
      </StackSection>
    </div>
  )
}
