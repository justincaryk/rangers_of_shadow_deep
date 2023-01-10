'use client'

import { useMemo } from 'react'
import { useAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'

import Card from '../../../components/parts/card'
import Dropdown from '../../../components/parts/dropdown'
import CompanionsList from '../../../components/companions/companions-list'
import SelectedCompanions from '../../../components/companions/companions-selected'

import { useRecruitmentPoints } from '../../../components/companions/atoms/recruitment-points'
import { useUpdatePlayerCount } from '../../../components/companions/atoms/players'
import { useCompanions } from '../../../components/companions/atoms/companions'

import { PLAYER_COUNT } from '../../../components/types'
import {
  // getAdjustedRecruitmentPoints,
  objectKeys,
} from '../../../components/utils'

export default function Companions() {
  const [ recruitmentPoints ] = useAtom(useRecruitmentPoints)
  const resetRecruitmentPoints = useResetAtom(useRecruitmentPoints)
  const resetCompanions = useResetAtom(useCompanions)
  const [ players, updatePlayers ] = useAtom(useUpdatePlayerCount)
  // const adjustedRecruitmentPoints = useMemo(() => {
  //   return getAdjustedRecruitmentPoints(players, BASE_RECRUITMENT_POINTS)
  // }, [players, recruitmentPoints])

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

  const handlePlayerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updatePlayers(
      PLAYER_COUNT[e.currentTarget.value as keyof typeof PLAYER_COUNT]
    )
    resetRecruitmentPoints()
    resetCompanions()
  }

  return (
    <div className='space-y-4'>
      <Card
        header={null}
        main={
          <div className='space-y-4'>
            <div>
              <div className='flex flex-row items-center gap-x-4 w-full'>
                <div className='font-bold uppercase whitespace-nowrap'>
                  Number of Players:
                </div>
                <Dropdown
                  className='w-32'
                  options={options}
                  value={players}
                  onChange={handlePlayerChange}
                />
              </div>
              <div className='text-sm italic'>
                Warning! Changing the number of players will remove any selected
                companions and reset your recruitment points.
              </div>
            </div>
            <div className='font-bold uppercase'>
              Remaining Recruitment Points: {recruitmentPoints}
            </div>
          </div>
        }
      />

      <SelectedCompanions />

      <CompanionsList />
    </div>
  )
}
