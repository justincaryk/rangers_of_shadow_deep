'use client'

import { FingerPrintIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import MinorHeader from '../../parts/minor-header'
import ShowHide from '../../parts/show-hide'
import { useCompanionsApi } from '../companions-api'
import MercenariesList from '../mercenaries/mercenaries-list'
import { Mercenary } from '../types'

export default function PickMercType() {
  const [ show, toggleShow ] = useState(false)

  const { data: friend } = useCompanionsApi().getFriendSummary
  const { mutate: assignMutate, status, reset } = useCompanionsApi().updateFriend

  useEffect(() => {
    if (show && status === 'success') {
      toggleShow(false)
      reset()
    }
  }, [ show, status, reset ])

  const handleMercTypeSelect = (merc: Mercenary) => {
    if (status === 'loading') {
      return null
    }

    assignMutate({
      id: friend?.friendById?.id,
      patch: {
        mercenaryId: merc.id,
      },
    })
  }

  return (
    <div className='space-y-6'>
      <div className='mt-2 cursor-pointer' onClick={() => toggleShow(!show)}>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader content='mercenary type' icon={<FingerPrintIcon className='text-pink-600' />} />
      </div>
      {show && <MercenariesList onMercSelect={handleMercTypeSelect} />}
    </div>
  )
}
