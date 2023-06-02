'use client'

import classnames from 'classnames'
import { useMemo } from 'react'
import { MechanicClassType } from '../../graphql/generated/graphql'

import { useLevelingApi } from '../leveling/leveling-api'
import { useCurrentMember } from '../react-query/hooks'
import { useEquipmentApi } from './equipment-api'

const interactiveLabelStyles =
  'block font-bold cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-neutral-800 peer-checked:font-bold peer-checked:text-white text-sm uppercase border  border-opacity-0 hover:border hover:border-gray-800 hover:border-dotted'
const staticLabelStyles = 'select-none p-2 font-extrabold text-xs uppercase text-gray-700 border border-opacity-0'

export default function FreeItem() {
  const { id: memberId } = useCurrentMember()
  const { data: levelGrants } = useLevelingApi().rangerRules
  const { data: memberLevels } = useLevelingApi().getMemberLevels
  const { data: equipment } = useEquipmentApi().getEquipment
  const { data: memberItems } = useEquipmentApi().getMemberItems

  const { mutateAsync: addMemberLevel } = useLevelingApi().createLevelRef
  const { mutateAsync: addMemberItem } = useEquipmentApi().createMemberItem
  const { mutateAsync: updateMemberItem } = useEquipmentApi().updateMemberItem

  const targetLevelUp = useMemo(() => {
    return levelGrants?.levelGrants?.nodes.find(lvl => lvl.grantType === MechanicClassType.Item)
  }, [ levelGrants ])

  const itemTypeMemberLevel = useMemo(
    () => memberLevels?.allMemberLevels?.nodes.find(ml => ml.levelGrantId === targetLevelUp?.id),
    [ memberLevels, targetLevelUp ]
  )

  const pickIds = useMemo(
    () => targetLevelUp?.featuresByLevelGrantId.nodes.find(feat => feat.pickIds)?.pickIds ?? [],
    [ targetLevelUp ]
  )

  const freeItemOptions = useMemo(
    () => equipment?.mundane?.nodes.filter(item => pickIds.includes(item.id) && item.slotCost === 0) ?? [],
    [ equipment, pickIds ]
  )

  const targetMemberItem = useMemo(
    () => memberItems?.allMemberItems?.nodes.find(mi => pickIds.includes(mi.itemId)),
    [ memberItems, pickIds ]
  )

  const handleClick = async (itemId: string) => {
    // check if member level exists.
    if (!itemTypeMemberLevel) {
      await addMemberLevel({
        characterId: memberId,
        levelGrantId: targetLevelUp?.id,
        timesUsed: 1,
      })
    }

    // if item id exists, update, otherwise jump
    if (targetMemberItem?.id) {
      await updateMemberItem({
        id: targetMemberItem.id,
        itemId: itemId,
      })
    } else {
      await addMemberItem({
        characterId: memberId,
        itemId: itemId,
      })
    }

    // check if memberItem exists
    // if yes, update
    // if not, create
  }

  return (
    <div>
      <div>
        <label className={classnames({ [staticLabelStyles]: true })}>select one.</label>
      </div>
      <div className='rounded-xl bg-gray-200 p-2 w-[34rem] grid grid-cols-2 space-x-2  items-center' x-data='app'>
        {freeItemOptions?.map(item => (
          <div key={item.id}>
            <input
              type='radio'
              name='option'
              id='1'
              className='peer hidden'
              checked={item.id === targetMemberItem?.itemId}
            />
            <label
              htmlFor='1'
              className={classnames({ [interactiveLabelStyles]: true })}
              onClick={() => handleClick(item.id)}
            >
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
