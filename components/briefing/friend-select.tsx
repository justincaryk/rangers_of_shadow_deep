'use client'

import classnames from 'classnames'

import { useAtom } from 'jotai'
import { useCompanionsApi } from '../companions/companions-api'
import { useRangerApi } from '../ranger/ranger-api'
import { useDeployedRanger, useSetDeployedRanger } from './atoms'

export default function RangerSelect() {
  const [ deployedRangerId ] = useAtom(useDeployedRanger)
  const [ _, setDeployedRangerId ] = useAtom(useSetDeployedRanger)
  const { data } = useCompanionsApi().getFriends

  return (
    <div
      className={classnames({
        fade: true,
        'overflow-x-auto grow': true,
      })}
    >
      <div className='font-semibold overflow-y-auto space-y-2 mb-10'>
        {data?.allFriends?.nodes.map(friend => (
          <div key={friend.id} className='leading-7 text-white cursor-pointer hover:bold hover:text-cyan-700 hover:text-lg'>
            <div>
              {friend.name} ({friend.progressionPoints})
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
