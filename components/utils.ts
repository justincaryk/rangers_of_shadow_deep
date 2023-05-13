'use client'

import { Mercenary } from './companions/types'
import { Skill } from './skills/types'
import { PLAYER_COUNT } from './types'

export const NAV_TEXT_STYLE =
  'text-dirty-orange font-roboto uppercase hover:text-hover-white hover:no-underline cursor-pointer outline-none'

export function objectKeys<Obj extends object>(obj: Obj): (keyof Obj)[] {
  return Object.keys(obj) as (keyof Obj)[]
}

export function getAdjustedRecruitmentPoints(players: PLAYER_COUNT, brp: number) {
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

export const capitalize = <T extends string>(s: T) => (s[0].toUpperCase() + s.slice(1)) as Capitalize<typeof s>

export const capitalizeEach = <T extends string>(s: T) => s.split(' ').map(x => capitalize(x)).join(' ') as Capitalize<typeof s>

export const getLetterAt = (pos: number) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  return alphabet[pos]
}

export const parseSkillsFromMercNotes = ({ notes }: Mercenary, skills: Skill[]) => {
  let mercStats: any = {}

  if (!notes) {
    return mercStats
  }

  const notesSplit = notes.split(',')
  const probStatsAsStrings = notesSplit.filter(maybeStatString => maybeStatString.includes(' +'))

  if (!probStatsAsStrings.length) {
    return mercStats
  }

  const convertedToObjectArray = probStatsAsStrings.map(x => {
    const split = x.split(' +')
    return {
      statKey: split[0].toLowerCase(),
      value: Number(split[1])
    }
  })

  convertedToObjectArray.forEach(x => {
    if (x.statKey) {
      mercStats[x.statKey] = x.value
    }
  })

  return mercStats
}
