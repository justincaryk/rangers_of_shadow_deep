'use client'

import { useMemo, useEffect, useCallback } from 'react'
import { useAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'

import Card from '../../../components/parts/card'
import SmallButton from '../../../components/parts/small-button'
import Dropdown from '../../../components/parts/dropdown'
import MinorHeader from '../../../components/parts/minor-header'
import CompanionsList from '../../../components/companions/companions-list'
import SelectedCompanions from '../../../components/companions/companions-selected'

import { useBpForRecruitmentPoints } from '../../../components/ranger/atoms/build-points'
import {
  useAdjustedRecruitmentPoints,
  useSpentRecruitmentPoints,
} from '../../../components/companions/atoms/recruitment-points'
import { useUpdatePlayerCount } from '../../../components/companions/atoms/players'
import { useCompanions } from '../../../components/companions/atoms/companions'

import { PLAYER_COUNT } from '../../../components/types'
import {
  getAdjustedRecruitmentPoints,
  objectKeys,
  useGetTrueAvailBp,
} from '../../../components/utils'

import { DECREASE, INCREASE } from '../../../components/rules/ranger-rules'

import {
  BASE_RECRUITMENT_POINTS,
  RP_BONUS_PER_BUILD_POINT,
  MAX_BUILD_POINTS_FOR_RP,
} from '../../../components/rules/companion-rules'

export default function Companions() {
  const [ bpSpentOnRp, updateBpSpentOnRp ] = useAtom(useBpForRecruitmentPoints)
  const trueAvailBp = useGetTrueAvailBp(MAX_BUILD_POINTS_FOR_RP - bpSpentOnRp)

  const [ spentRp ] = useAtom(useSpentRecruitmentPoints)
  const [ adjustedTotalRp, setAdjustedTotalBp ] = useAtom(
    useAdjustedRecruitmentPoints
  )

  const resetSpent = useResetAtom(useSpentRecruitmentPoints)
  const resetAdjusted = useResetAtom(useAdjustedRecruitmentPoints)
  const resetCompanions = useResetAtom(useCompanions)

  const resetViewState = useCallback(() => {
    resetSpent()
    resetAdjusted()
    resetCompanions()
  }, [ resetSpent, resetAdjusted, resetCompanions ])

  const [ players, updatePlayers ] = useAtom(useUpdatePlayerCount)

  const updateAdjustedRecruitmentPoints = useCallback(() => {
    const bonusRp = bpSpentOnRp * RP_BONUS_PER_BUILD_POINT
    const total = getAdjustedRecruitmentPoints(
      players,
      bonusRp + BASE_RECRUITMENT_POINTS
    )
    setAdjustedTotalBp(total)
  }, [ bpSpentOnRp, players, setAdjustedTotalBp ])

  useEffect(() => {
    updateAdjustedRecruitmentPoints()
  }, [ players, bpSpentOnRp, updateAdjustedRecruitmentPoints ])

  const playerOptions = useMemo(() => {
    let counter = 0
    return objectKeys(PLAYER_COUNT).map(x => {
      counter++
      return {
        value: PLAYER_COUNT[x],
        text: counter,
      }
    })
  }, [])

  const spendBuildPoint = async () => {
    if (trueAvailBp > 0) {
      await updateBpSpentOnRp(INCREASE)
    }
  }
  const recoverBuildPoint = () => {
    if (bpSpentOnRp > 0) {
      updateBpSpentOnRp(DECREASE)
    }
  }

  const handlePlayerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    resetViewState()
    updatePlayers(e.currentTarget.value as PLAYER_COUNT)
  }

  return (
    <div className='space-y-4'>
      <MinorHeader
        content='companions'
        subtext={'Available build points:'}
        subvalue={trueAvailBp}
      />

      <Card
        header={null}
        main={
          <div className='space-y-4'>
            <div className='font-bold'>
              Allotted Build Points for Recruitment Points: {bpSpentOnRp}
            </div>
            <div className='space-y-1 text-sm text-dirty-orange'>
              <div>
                Every <strong>1 BUILD POINT</strong> spent yields{' '}
                <strong>{RP_BONUS_PER_BUILD_POINT} RECRUITMENT POINTS</strong>.
              </div>
            </div>
            <div className='space-x-2'>
              <SmallButton onClick={spendBuildPoint}>
                Increase allotment
              </SmallButton>
              <SmallButton onClick={recoverBuildPoint} className='bg-gray-400'>
                Decrease allotment
              </SmallButton>
            </div>
          </div>
        }
      />

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
                  options={playerOptions}
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
              Total Recruitment Points: {adjustedTotalRp}
            </div>
            <div className='font-bold uppercase'>
              Remaining Recruitment Points: {adjustedTotalRp - spentRp}
            </div>
          </div>
        }
      />

      <SelectedCompanions />

      <CompanionsList />
    </div>
  )
}
