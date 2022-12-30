import { SparklesIcon } from '@heroicons/react/24/outline';
import MinorHeader from '../parts/minor-header';
import { RangerComponentProps } from '../types';

export default function Spells({updateBp}: RangerComponentProps) {
    return (
        <div>
        <MinorHeader content='spells' icon={<SparklesIcon className='text-pink-400' />} />
        <div className='px-4 py-5 sm:p-6'>TODO</div>
      </div>)
}
