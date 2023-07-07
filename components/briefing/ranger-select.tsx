'use client'

import classnames from 'classnames'

import { useAtom } from 'jotai'
import { useRangerApi } from '../ranger/ranger-api'
import { useDeployedRanger, useSetDeployedRanger } from './atoms'
import { listItemActiveStyles, listItemBaseStyles, listItemDormantStyles } from './styles'

export default function RangerSelect() {
  const [ deployedRanger ] = useAtom(useDeployedRanger)
  const [ _, setDeployedRangerId ] = useAtom(useSetDeployedRanger)
  const { data } = useRangerApi().getAllRangers

  return (
    <div
      className={classnames({
        fade: true,
        'overflow-x-auto grow': true,
      })}
    >
      <div className='overflow-y-auto space-y-2 mb-10'>
        {data?.allCharacters?.nodes.map(ranger => (
          <div key={ranger.id} onClick={() => setDeployedRangerId(ranger)}>
            <div
              className={classnames({
                [listItemBaseStyles]: true,
                [listItemDormantStyles]: ranger.id !== deployedRanger?.id,
                [listItemActiveStyles]: ranger.id === deployedRanger?.id,
              })}
            >
              {ranger.name} ({ranger.level})
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
