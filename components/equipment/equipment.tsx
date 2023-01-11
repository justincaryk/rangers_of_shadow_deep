'use client'

import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'

export default function Equipment() {
  const [ show, toggleShow ] = useState(true)
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
          minorBuildPoints={null}
        />
      </div>
      {show && (
        <div className='px-4 py-5 sm:p-6'>
          <strong>TODO</strong>
        </div>
      )}
    </div>
  )
}
