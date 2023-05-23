'use client'

import classnames from 'classnames'
import { useMemo, useState } from 'react'

import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import { Item } from '../../graphql/generated/graphql'

import Decrement from '../parts/decrement'
import Increment from '../parts/increment'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'

import { MAX_STARTING_ITEM_SLOTS } from '../rules/creation-rules'

import { useEquipmentApi } from './equipment-api'
import { useRangerApi } from '../ranger/ranger-api'
import Card from '../parts/card'
import Checkbox from '../parts/checkbox'

export default function Equipment() {
  const [ show, toggleShow ] = useState(false)
  const [ showMagic, toggleShowMagic ] = useState(true)
  const [ showMundane, toggleShowMundane ] = useState(true)

  const { data: ranger } = useRangerApi().getRangerById
  const { data: equipment } = useEquipmentApi().getEquipment

  const { mutate: addRangerItem } = useEquipmentApi().createMemberItem
  const { mutate: removeRangerItem } = useEquipmentApi().deleteMemberItem

  const inventorySlots = useMemo(() => {
    if (ranger?.characterById?.memberItemsByCharacterId.nodes.length) {
      return (
        MAX_STARTING_ITEM_SLOTS -
        ranger.characterById.memberItemsByCharacterId.nodes.reduce((prev, curr) => {
          return prev + (curr.itemByItemId?.slotCost ?? 1)
        }, 0)
      )
    }
    return MAX_STARTING_ITEM_SLOTS
  }, [ ranger?.characterById?.memberItemsByCharacterId ])

  // TODO: add / remove custom equipment
  // TODO: make starting equipment list to always include 1 free dagger or 1 free throwing knife

  const tryAddItem = (item: Item) => {
    if (inventorySlots === 0 && inventorySlots < item.slotCost) {
      return null
    }

    addRangerItem({
      itemId: item.id,
      characterId: ranger?.characterById?.id,
    })
  }

  const tryRemoveItem = (item: Item) => {
    removeRangerItem({
      id: ranger?.characterById?.memberItemsByCharacterId.nodes.find(x => x.itemId === item.id)?.id,
    })
  }

  return (
    <div className='space-y-2'>
      <div className='mt-2 cursor-pointer' onClick={() => toggleShow(!show)}>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader
          content='equipment'
          icon={<WrenchScrewdriverIcon />}
          subtext='Available inventory slots:'
          subvalue={inventorySlots}
        />
      </div>

      {ranger?.characterById?.memberItemsByCharacterId.nodes.length && (
        <div>
          <div className='font-bold'>Carried:</div>
          <ul className='list-disc ml-6'>
          {ranger?.characterById?.memberItemsByCharacterId.nodes.map(item => (
            <li key={item.id} className='capitalize'>
              {item.itemByItemId?.name}
            </li>
          ))}
          </ul>
        </div>
      )}

      {show && (
        <div>
          <div className='py-4 space-y-2'>
            <MinorHeader
              content='Basic Equipment List'
              icon={<ShowHide isShow={showMundane} onClick={() => toggleShowMundane(!showMundane)} />}
              iconSize={'w-6'}
            />

            <Card header={'Choose Free Item:'}>
              {/* <div>Choose Free Item:</div> */}
              <div className='flex gap-x-4'>
                <div className='flex gap-x-2'>
                  <Checkbox />
                  <div>Throwing Knife</div>
                </div>
                <div className='flex gap-x-2'>
                  <Checkbox />
                  <div>Dagger</div>
                </div>
              </div>
            </Card>

            {showMundane &&
              equipment?.mundane?.nodes.map((item: any) => {
                const canIncrement = inventorySlots > 0
                const canDecrement =
                  ranger?.characterById?.memberItemsByCharacterId.nodes.filter(x => x.itemId === item.id).length ??
                  false

                return (
                  <div key={item?.id} className='px-2'>
                    <div className='flex gap-6 mt-4'>
                      <div className='text-lg font-bold capitalize'>{item?.name}</div>

                      <div className='flex gap-2'>
                        <div
                          className={classnames({
                            'w-6': true,
                            'cursor-pointer': canIncrement,
                            'cursor-not-allowed': !canIncrement,
                          })}
                        >
                          <Increment onClick={() => tryAddItem(item)} disabled={inventorySlots === 0} />
                        </div>
                        <div
                          className={classnames({
                            'w-6': true,
                            'cursor-not-allowed': !canDecrement,
                            'cursor-pointer': canDecrement,
                          })}
                        >
                          <Decrement
                            onClick={() => tryRemoveItem(item)}
                            disabled={
                              ranger?.characterById?.memberItemsByCharacterId.nodes.filter(x => x.itemId === item.id)
                                .length === 0
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className='italic text-slate-600 text-sm ml-2'>{item?.description}</div>
                  </div>
                )
              })}
          </div>

          <div className='py-4 space-y-2'>
            <MinorHeader
              content='Magical Equipment'
              icon={<ShowHide isShow={showMagic} onClick={() => toggleShowMagic(!showMagic)} />}
              iconSize={'w-6'}
            />
            {showMagic &&
              equipment?.magic?.nodes.map((item: any) => {
                const canIncrement = inventorySlots > 0
                const canDecrement =
                  ranger?.characterById?.memberItemsByCharacterId.nodes.filter(x => x.itemId === item.id).length ??
                  false

                return (
                  <div key={item?.id} className='px-2 border-'>
                    <div className='flex gap-6 mb-8 mt-8'>
                      <div className='text-lg font-bold capitalize'>{item?.name}</div>

                      <div className='flex gap-2'>
                        <div
                          className={classnames({
                            'w-6': true,
                            'cursor-pointer': canIncrement,
                            'cursor-not-alloqws': !canIncrement,
                          })}
                        >
                          <Increment onClick={() => tryAddItem(item)} disabled={!canIncrement} />
                        </div>
                        <div
                          className={classnames({
                            'w-6': true,
                            'cursor-not-allowed': !canDecrement,
                            'cursor-pointer': canDecrement,
                          })}
                        >
                          <Decrement onClick={() => tryRemoveItem(item)} disabled={!canDecrement} />
                        </div>
                      </div>
                    </div>
                    <div className='italic text-slate-600 text-sm ml-2'>{item?.description}</div>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}
