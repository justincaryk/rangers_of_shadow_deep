import { MinusCircleIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { Companion } from '../data'
import Card from '../parts/card'
import { useCompanions, useDeleteCompanion } from './atoms/companions'
import { useRefundRecruitmentPoints } from './atoms/recruitment-points'

export default function SelectedCompanions() {
  const [ companions ] = useAtom(useCompanions)
  const [ , removeCompanion ] = useAtom(useDeleteCompanion)
  const [ , refundRecruitmentPoints ] = useAtom(useRefundRecruitmentPoints)

  const handleBanishCompanion = (companion: Companion) => {
    removeCompanion(companion)
    refundRecruitmentPoints(companion.cost)
  }
  return (
    <Card
      header={<div className='font-bold text-lg'>Purchased:</div>}
      main={
        companions.length ? (
          <ul>
            {companions.map((companion, i) => (
              <li key={companion.name + i}>
                {companion.name}{' '}
                <MinusCircleIcon
                  onClick={() => handleBanishCompanion(companion)}
                  className='w-4 inline-block ml-4'
                  color='red'
                />
              </li>
            ))}
          </ul>
        ) : null
      }
    />
  )
}
