import { FireIcon } from '@heroicons/react/24/outline'
import MinorHeader from '../parts/minor-header'
import { RangerComponentProps } from '../types'

export default function Skills({updateBp}: RangerComponentProps) {
  return (
    <div>
      <MinorHeader content='skills' icon={<FireIcon className='text-orange-400' />} />
      <div className='px-4 py-5 sm:p-6'>TODO</div>
    </div>
  )
}
