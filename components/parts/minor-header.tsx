'use client'

import { useAtom } from 'jotai'
import React, { useMemo } from 'react'
import { useBuildPoints } from '../ranger/atoms/build-points'

interface Props {
  content: string
  icon?: React.ReactNode | JSX.Element
  minorBuildPoints: number | null
}
export default function MinorHeader({
  content,
  icon,
  minorBuildPoints,
}: Props) {
  const [ totalBuildPoints ] = useAtom(useBuildPoints)
  const trueAvailBp = useMemo(() => {
    if (minorBuildPoints === null) {
      return null
    }
    if (totalBuildPoints > minorBuildPoints) {
      return minorBuildPoints
    } else {
      return totalBuildPoints
    }
  }, [ totalBuildPoints, minorBuildPoints ])

  return (
    <>
      <div className='flex items-center gap-x-1'>
        <div className='uppercase font-bold text-lg'>{content}</div>
        <div className='w-6'>{icon}</div>
      </div>
      {trueAvailBp !== null && (
        <div className='flex gap-2 mt-2 px-2'>
          Available build points:
          <span className='font-bold'>{trueAvailBp}</span>
        </div>
      )}
    </>
  )
}
