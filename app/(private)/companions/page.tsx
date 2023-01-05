'use client'

import { getAdjustedRecruitmentPoints } from '../../../components/utils'
import { useMemo, useState } from 'react'
import { BASE_RECRUITMENT_POINTS } from '../../../components/companions/rules/rules'
import { PLAYER_COUNT } from '../../../components/types'
import { objectKeys } from '../../../components/utils'
import CompanionsList from '../../../components/companions/companions-list'

export default function Companions() {
  const [ players, setPlayers ] = useState<PLAYER_COUNT>(PLAYER_COUNT.ONE)

  const points = useMemo(() => {
    return getAdjustedRecruitmentPoints(players, BASE_RECRUITMENT_POINTS)
  }, [ players ])

  const options = useMemo(() => {
    let counter = 0
    return objectKeys(PLAYER_COUNT).map(x => {
      counter++
      return {
        value: x,
        text: counter,
      }
    })
  }, [])

  const handlePlayerChange = (x: keyof typeof PLAYER_COUNT) => {
    setPlayers(PLAYER_COUNT[x])
  }
  return (
    <div>
      <div>{points}</div>
      <div>
        <select
          onChange={e =>
            handlePlayerChange(
              e.currentTarget.value as keyof typeof PLAYER_COUNT
            )
          }
        >
          {options.map(x => (
            <option key={x.value} value={x.value}>
              {x.text}
            </option>
          ))}
        </select>
      </div>
      <CompanionsList />
    </div>
  )
}
