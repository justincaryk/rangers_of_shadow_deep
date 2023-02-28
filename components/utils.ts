'use client'

import { useAtom } from 'jotai'
import { useBuildPoints } from './ranger/atoms/build-points'
import { PLAYER_COUNT } from './types'

export const NAV_TEXT_STYLE =
  'text-dirty-orange font-roboto uppercase hover:text-hover-white hover:no-underline cursor-pointer outline-none'

export function objectKeys<Obj extends object>(obj: Obj): (keyof Obj)[] {
  return Object.keys(obj) as (keyof Obj)[]
}

export function useGetTrueAvailBp(minorBp: number) {
  const [ totalBp ] = useAtom(useBuildPoints)

  if (totalBp > minorBp) {
    return minorBp
  } else {
    return totalBp
  }
}

export function getAdjustedRecruitmentPoints(
  players: PLAYER_COUNT,
  brp: number
) {
  const adjustments = {
    [PLAYER_COUNT.ONE]: (brp: number) => brp,
    [PLAYER_COUNT.TWO]: (brp: number) => brp * 0.5 - 10,
    [PLAYER_COUNT.THREE]: (brp: number) => brp * 0.3,
    [PLAYER_COUNT.FOUR]: (brp: number) => brp * 0.1,
  }

  return adjustments[players]?.(brp)
}

export function getMaxNumberOfCompanions(players: number) {}

export const parseJwt = (token: string) => {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}
