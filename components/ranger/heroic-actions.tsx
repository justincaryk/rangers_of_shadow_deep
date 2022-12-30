import { BoltIcon } from '@heroicons/react/24/outline'
import MinorHeader from '../parts/minor-header'
import { RangerComponentProps } from '../types'

export default function HeroicActions({ updateBp }: RangerComponentProps) {
  return (
    <div>
      <MinorHeader content='heroic abilities' icon={<BoltIcon className='text-yellow-400' />} />
      <div className='px-4 py-5 sm:p-6'>TODO</div>
    </div>
  )
}
