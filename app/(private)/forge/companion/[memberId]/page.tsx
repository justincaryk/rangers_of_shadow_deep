import StackSection from '../../../../../components/parts/stack-section'
import MinorHeader from '../../../../../components/parts/minor-header'
import FriendCore from '../../../../../components/companions//friend/friend-core'
import FriendPickContainer from '../../../../../components/leveling/pick-container'

export default function Friend() {
  return (
    <div className='space-y-6 w-full'>
      <MinorHeader content='companion' />

      <StackSection>
        <FriendCore />
      </StackSection>

      <FriendPickContainer />
    </div>
  )
}
