'use client'

import { FingerPrintIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'
import { useCompanionsApi } from '../companions/companions-api'
import MercenariesList from '../companions/mercenaries/mercenaries-list'
import { Mercenary } from '../companions/types'
import { notify } from '../parts/toast'

export default function PickMercType() {
  const [ show, toggleShow ] = useState(false)

  const { data: friend } = useCompanionsApi().getFriendSummary
  const { mutateAsync: assignMutate, status, reset } = useCompanionsApi().updateFriend

  const handleMercTypeSelect = async (merc: Mercenary) => {
    if (status === 'loading') {
      return null
    }

    await assignMutate({
      id: friend?.friendById?.id,
      patch: {
        mercenaryId: merc.id,
      },
    })

    reset()
    notify('Companion type saved!', { type: 'success' })
    toggleShow(false)
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
