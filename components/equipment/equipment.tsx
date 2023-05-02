'use client'

import classnames from 'classnames'
import { useMemo, useState } from 'react'

import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import { ItemRarity } from '../../graphql/generated/graphql'

import Decrement from '../parts/decrement'
import Increment from '../parts/increment'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'

import { MAX_STARTING_ITEM_SLOTS } from '../rules/ranger-rules'

import { useEquipmentApi } from './equipment-api'

export default function Equipment() {
  const [ show, toggleShow ] = useState(false)
  const [ showMagic, toggleShowMagic ] = useState(true)
  const [ showMundane, toggleShowMundane ] = useState(true)

  const [ inventorySlots, updateInvetorySlots ] = useState(
    MAX_STARTING_ITEM_SLOTS
  )
  const { data } = useEquipmentApi().getEquipment

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
        <div>
          <div className='py-4'>
            <MinorHeader content='Basic Equipment List' />
            {data?.mundane?.nodes.map((item: any) => (
              <div key={item?.id} className='px-2'>
                <div className='flex gap-6 mt-4'>
                  <div className='text-lg font-bold capitalize'>
                    {item?.name}
                  </div>

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
                </div>
                <div className='italic text-slate-400 text-sm ml-2'>
                  {item?.description}
                </div>
              </div>
            ))}
          </div>

          <div className='py-4'>
            <MinorHeader content='Magical Equipment' />
            {data?.magic?.nodes.map((item: any) => (
              <div key={item?.id} className='px-2 border-'>
                <div className='flex gap-6 mb-8 mt-8'>
                  <div className='text-lg font-bold capitalize'>
                    {item?.name}
                  </div>

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
