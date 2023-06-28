'use client'

import classnames from 'classnames'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { PLAYER_COUNT } from '../types'
import { objectKeys } from '../utils'

import { usePlayerCount, useSetPlayerCount } from './atoms'

export default function PlayerCount() {
  const [ playerCount ] = useAtom(usePlayerCount)
  const [ _, setPlayerCount ] = useAtom(useSetPlayerCount)

  const playerOptions = useMemo(() => {
    let counter = 0
    return objectKeys(PLAYER_COUNT).map(x => {
      counter++
      return {
        text: PLAYER_COUNT[x],
        value: counter,
      }
    })
  }, [])

  const handlePlayerCountSelect = (players: number) => {
    console.log('x: ', players)
    setPlayerCount(players)
  }

  return (
    <div className='grow w-full'>
      <div
        className={classnames({
          'grid grid-cols-4': true,
          'h-full justify-items-center content-center': true,
          'leading-9': true,
        })}
      >
        {playerOptions.map(opt => (
          <div
            key={opt.value}
            className='font-glue text-white text-6xl font-semibold'
            onClick={() => handlePlayerCountSelect(opt.value)}
          >
            <span
              className={classnames({
                'hover:font-bold hover:cursor-pointer hover:text-cyan-700 hover:text-7xl': true,
                'font-bold cursor-pointer text-cyan-500 text-7xl': playerCount === opt.value,
              })}
            >
              {opt.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
