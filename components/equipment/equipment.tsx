'use client'

import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import classnames from 'classnames'
import { useMemo, useState } from 'react'
import { ItemRarity } from '../../graphql/generated/graphql'
import Decrement from '../parts/decrement'
import Increment from '../parts/increment'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import { MAX_STARTING_ITEM_SLOTS } from '../rules/ranger-rules'
// import { useEquipmentQuery } from './use-equipment-query'

export default function Equipment() {
  const [ show, toggleShow ] = useState(true)
  const [ inventorySlots, updateInvetorySlots ] = useState(
    MAX_STARTING_ITEM_SLOTS
  )
  // const { data, isLoading } = useEquipmentQuery()

  const items: any = {magic: [], mundane: []}//useMemo(() => {
  //   if (isLoading || !data?.allItems?.nodes?.length) {
  //     return {
  //       mundane: [],
  //       magic: [],
  //     }
  //   }
  //   return {
  //     mundane: data.allItems.nodes.filter(
  //       item => item?.rarity === ItemRarity.Mundane
  //     ),
  //     magic: data.allItems.nodes.filter(
  //       item => item?.rarity === ItemRarity.Magic
  //     ),
  //   }
  // }, [ data, isLoading ])

  // TODO: add / remove custom equipment
  // TODO: make starting equipment list to always include 1 free dagger or 1 free throwing knife

  return (
    <div>
      <div className='mt-2'>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} onClick={() => toggleShow(!show)} />
        </div>
        <MinorHeader
          content='equipment'
          icon={<WrenchScrewdriverIcon className='' />}
          subtext='Available inventory slots:'
          subvalue={inventorySlots}
        />
      </div>
      {show && (
        <div className='px-4 py-5 sm:p-6'>
          <div>Basic Equipment List</div>
          <div className='space-y-4'>
            {items.mundane.map((item: any) => (
              <div key={item?.id}>
                <div className='text-lg font-bold'>{item?.name}</div>

                <div className='flex gap-2'>
                  <div
                    className={classnames({
                      'w-6': true,
                      'cursor-pointer': true,
                    })}
                  >
                    <Increment
                      onClick={() => {}} //updateSkill(skill, INCREASE)}
                      // disabled={!canIncrement}
                    />
                  </div>
                  <div
                    className={classnames({
                      'w-6': true,
                      // 'cursor-not-allowed': !canDecrement,
                      // 'cursor-pointer': canDecrement,
                    })}
                  >
                    <Decrement
                      onClick={() => {}} //updateSkill(skill, DECREASE)}
                      // disabled={!canDecrement}
                    />
                  </div>
                </div>

                <div className='italic text-slate-400 text-sm ml-2'>
                  {item?.description}
                </div>
              </div>
            ))}
          </div>
          <div>Magical Equipment</div>
          <div className='space-y-4'>
            {items.magic.map((item: any) => (
              <div key={item?.id}>
                <div className='text-lg font-bold'>{item?.name}</div>

                <div className='flex gap-2'>
                  <div
                    className={classnames({
                      'w-6': true,
                      'cursor-pointer': true,
                    })}
                  >
                    <Increment
                      onClick={() => {}} //updateSkill(skill, INCREASE)}
                      // disabled={!canIncrement}
                    />
                  </div>
                  <div
                    className={classnames({
                      'w-6': true,
                      // 'cursor-not-allowed': !canDecrement,
                      // 'cursor-pointer': canDecrement,
                    })}
                  >
                    <Decrement
                      onClick={() => {}} //updateSkill(skill, DECREASE)}
                      // disabled={!canDecrement}
                    />
                  </div>
                </div>

                <div className='italic text-slate-400 text-sm ml-2'>
                  {item?.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
