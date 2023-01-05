'use client'

import { useMemo, useState } from 'react'

import Card from '../../../components/parts/card'
import Dropdown from '../../../components/parts/dropdown'
import CompanionsList from '../../../components/companions/companions-list'

import { BASE_RECRUITMENT_POINTS } from '../../../components/companions/rules/rules'
import { PLAYER_COUNT } from '../../../components/types'
import {
  getAdjustedRecruitmentPoints,
  objectKeys,
} from '../../../components/utils'

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
    <div className='space-y-4'>
      <Card
        header={null}
        main={
          <div className='space-y-4'>
            <div className='font-bold uppercase'>
              Recruitment Points: {points}
            </div>
            <div className='flex flex-row items-center gap-x-4 w-full'>
              <div className='font-bold uppercase whitespace-nowrap'>Number of Players:</div>
              <Dropdown
              className='w-32'
                options={options}
                onChange={e =>
                  handlePlayerChange(
                    e.currentTarget.value as keyof typeof PLAYER_COUNT
                  )
                }
              />
            </div>
          </div>
        }
      />

      <CompanionsList />
    </div>
  )
}
