'use client'

import classnames from 'classnames'

import { useAtom } from 'jotai'
import { useRangerApi } from '../ranger/ranger-api'
import { useDeployedRanger, useSetDeployedRanger } from './atoms'

export default function RangerSelect() {
  const [ deployedRangerId ] = useAtom(useDeployedRanger)
  const [ _, setDeployedRangerId ] = useAtom(useSetDeployedRanger)
  const { data } = useRangerApi().getAllRangers

  return (
    <div
      className={classnames({
        fade: true,
        'overflow-x-auto grow': true,
      })}
    >
      <div className='text-white font-semibold overflow-y-auto space-y-2 mb-10'>
        {data?.allCharacters?.nodes.map(ranger => (
          <div key={ranger.id}>
            <div>
              {ranger.name} ({ranger.level})
            </div>
          </div>
        ))}
        {data?.allCharacters?.nodes.map(ranger => (
          <div key={ranger.id}>
            <div>
              {ranger.name} ({ranger.level})
            </div>
          </div>
        ))}
        {data?.allCharacters?.nodes.map(ranger => (
          <div key={ranger.id}>
            <div>
              {ranger.name} ({ranger.level})
            </div>
          </div>
        ))}
        {data?.allCharacters?.nodes.map(ranger => (
          <div key={ranger.id}>
            <div>
              {ranger.name} ({ranger.level})
            </div>
          </div>
        ))}
        
      </div>
    </div>
  )
}
