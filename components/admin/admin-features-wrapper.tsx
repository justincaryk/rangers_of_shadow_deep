import InjuriesStuff from './injuries-stuff'
import ItemsStuff from './items-stuff'
import LevelUpStuffRanger from './level-up-stuff-ranger'
import LevelUpStuffFriend from './level-up-stuff-friend'

export default function AdminFeaturesWrapper() {
  return (
    <div className='space-y-4'>
      <div className='text-lg font-bold italic uppercase text-blue-500'>Features Mapping</div>

      <div className='ml-4'>
        {/* ============ INJURIES ============ */}
        <InjuriesStuff />

        {/* ============ ITEMS ============ */}
        <ItemsStuff />

        {/* ============ RANGER LEVEL UPS ============ */}
        <LevelUpStuffRanger />

        {/* ============ COMPANION LEVEL UPS ============ */}
        <LevelUpStuffFriend />
      </div>
    </div>
  )
}
