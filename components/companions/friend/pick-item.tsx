'use client'

import { useEffect, useMemo, useState } from 'react'
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import { MultiSelect, Option } from 'react-multi-select-component'

import MinorHeader from '../../parts/minor-header'
import ShowHide from '../../parts/show-hide'
import Card from '../../parts/card'
import SmallButton from '../../parts/small-button'

import { useCompanionsApi } from '../companions-api'
import { useEquipmentApi } from '../../equipment/equipment-api'

import { MercenaryFeature } from '../types'

import { capitalizeEach } from '../../utils'
import { isEqual } from 'lodash'

interface Props {
  feat: MercenaryFeature
}

export default function FriendBonusItem({ feat }: Props) {
  const [ show, toggleShow ] = useState(false)
  const [ selections, setSelections ] = useState<Option[] | null>(null)

  const { data: friend } = useCompanionsApi().getFriendSummary
  const { data: memberItems } = useEquipmentApi().getMemberItems
  const { data: items } = useEquipmentApi().getEquipment

  const { mutate: addMemberItem } = useEquipmentApi().createMemberItem
  const { mutate: removeMemberItem } = useEquipmentApi().deleteMemberItem

  useEffect(() => {
    if (selections === null && memberItems?.allMemberItems?.nodes.length) {
      setSelections(
        memberItems?.allMemberItems?.nodes.map(x => ({
          label: capitalizeEach(x.itemByItemId!.name),
          value: x.itemId,
        }))
      )
    }
  }, [ selections, memberItems ])

  const options = useMemo(() => {
    return (
      items?.mundane?.nodes
        .filter(item => feat.pickIds?.includes(item.id))
        .map(item => ({
          label: capitalizeEach(item.name),
          value: item.id,
        })) ?? []
    )
  }, [ feat, items ])

  const selectionsInSync = useMemo(() => {
    const savedItemIds = memberItems?.allMemberItems?.nodes.map(x => x.itemId)
    const selected = selections?.map(x => x.value)
    return isEqual(savedItemIds, selected)
  }, [ selections, memberItems ])

  const handleSubmit = () => {
    if (selectionsInSync || !selections) {
      return null
    }

    const savedBonusItems = memberItems?.allMemberItems?.nodes ?? []
    for (const savedItem of savedBonusItems) {
      removeMemberItem({
        id: savedItem.id,
      })
    }

    for (const selection of selections) {
      addMemberItem({
        friendId: friend?.friendById?.id,
        itemId: selection.value,
      })
    }

    toggleShow(false)
  }

  return (
    <div className='space-y-6'>
      <div className='mt-2 cursor-pointer' onClick={() => toggleShow(!show)}>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader content='equipment select' icon={<WrenchScrewdriverIcon />} />
      </div>
      {show && (
        <Card className='bg-black/50'>
          <div className='space-y-6'>
            <div className='text-sm font-bold'>Choose {feat.value} from the options below:</div>
            <MultiSelect
              onChange={(x: Option[]) => {
                setSelections(x.slice(0, feat.value))
              }}
              value={selections ?? []}
              labelledBy='bonus-equipment'
              options={options}
            />

            {memberItems?.allMemberItems?.nodes.map(saved => (
              <div key={saved.id}>
                <div className='uppercase text-lg font-bold py-2'>currently assigned item</div>
                <div className='font-semibold capitalize'>{saved.itemByItemId?.name}</div>
                <div>{saved.itemByItemId?.description}</div>
              </div>
            ))}

            {!selectionsInSync && (
              <div>
                <div className='uppercase text-lg font-bold py-2'>new item selection</div>
                {selections?.map(sel => {
                  const itemSelected = items?.mundane?.nodes.find(x => x.id === sel.value)
                  return (
                    <div key={sel.value}>
                      <div className='font-semibold capitalize'>{itemSelected?.name}</div>
                      <div>{itemSelected?.description}</div>
                    </div>
                  )
                })}
              </div>
            )}

            <SmallButton disabled={selectionsInSync} onClick={handleSubmit}>
              Equip new item
            </SmallButton>
          </div>
        </Card>
      )}
    </div>
  )
}
