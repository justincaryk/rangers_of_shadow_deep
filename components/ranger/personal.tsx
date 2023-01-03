'use client'

import { IdentificationIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import Input from '../parts/input'
import MinorHeader from '../parts/minor-header'
import { useBuildPoints } from './atoms/ranger-atom'


export default function Personal() {
  const [ buildPoints ] = useAtom(useBuildPoints)

  return (
    <div>
      <MinorHeader
        content='personal'
        icon={<IdentificationIcon className='text-emerald-400' />}
      />
      <div className='px-4 py-5 sm:p-6'>
        <Input placeholder='Ranger Name' className='w-1/4 block' />
      </div>
      <div className='font-bold'>Total BP Remaining: {buildPoints}</div>
    </div>
  )
}
