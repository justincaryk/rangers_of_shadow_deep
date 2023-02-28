'use client'

import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import { mundaneEquipment, magicEquipment } from '../data'
import { MAX_STARTING_ITEM_SLOTS } from '../rules/ranger-rules'

export default function Equipment() {
  const [ show, toggleShow ] = useState(true)
  const [ inventorySlots, updateInvetorySlots ] = useState(
    MAX_STARTING_ITEM_SLOTS
  )

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
      {show && <div className='px-4 py-5 sm:p-6'></div>}
    </div>
  )
}
