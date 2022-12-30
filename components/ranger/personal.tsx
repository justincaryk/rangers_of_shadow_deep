import { IdentificationIcon } from '@heroicons/react/24/outline'
import Input from '../parts/input'
import MinorHeader from '../parts/minor-header'

interface Props {
  bp: number
}
export default function Personal({ bp }: Props) {
  return (
    <div>
      <MinorHeader
        content='personal'
        icon={<IdentificationIcon className='text-emerald-400' />}
      />
      <div className='px-4 py-5 sm:p-6'>
        <Input placeholder='Ranger Name' label='Ranger Name' />
      </div>
      <div className='font-bold'>Total BP Remaining: {bp}</div>
    </div>
  )
}
