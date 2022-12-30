import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import MinorHeader from '../parts/minor-header'

export default function Equipment() {
  return (
    <div>
      <MinorHeader content='equipment' icon={<WrenchScrewdriverIcon className='' />} />
      <div className='px-4 py-5 sm:p-6'>TODO</div>
    </div>
  )
}
