'use client'

import React, { useMemo, useState } from 'react'
import Card from '../../../../components/parts/card'

// Log to console
console.log('Hello console')

export default function Injuries() {
  const [ opts, updateOpts ] = useState([
    {
      name: 'dread (lesser)',
      cost: 225,
      level: 6,
      count: false,
      rarity: null,
    },
    {
      name: 'trollhound vest',
      cost: 230,
      level: 6,
      count: false,
      rarity: null,
    },
    {
      name: 'breastplate',
      cost: 8,
      count: false,
      rarity: null,
    },
    {
      name: 'lifting belt',
      cost: 80,
      level: 4,
      count: false,
      rarity: null,
    },
    {
      name: 'fearsome',
      cost: 160,
      level: 5,
      count: false,
      rarity: null,
    },
    {
      name: 'axe',
      cost: 8,
      level: 0,
      count: false,
      rarity: null,
    },
    {
      name: 'striking rune',
      cost: 65,
      level: 4,
      count: false,
      rarity: null,
    },
    {
      name: 'potency 1',
      cost: 35,
      level: 2,
      count: false,
      rarity: null,
    },
  ])
  const total = useMemo(() => {
    return opts.reduce((prev, curr) => {
      if (curr.count) {
        return prev + curr.cost
      }
      return prev
    }, 0)
  }, [ opts ])

  const handleClick = (opt: any) => {
    updateOpts([
      ...opts.map(x => {
        if (x.name === opt.name) {
          x.count = !x.count
        }
        return x
      }),
    ])
  }

  const getItemsLevel = (lvl: number) => {
    return opts.reduce((prev,curr) => {
      if (curr.count && curr.level === lvl) {
        return prev + 1
      }
      return prev
    }, 0)
  }
  return (
    <Card>
      <div className='space-y-4'>
        <div className='uppercase text-black font-bold'>
          <div>allowed: 720</div>
          <div>spent: {total}</div>
          <div>remaining: {720 - total}</div>
          <div className='mt-2 space-y-2'>
            <div>slots:</div>
            <div>
              <div className='flex gap-x-2'>6th: (1) {getItemsLevel(6)}</div>
              <div className='flex gap-x-2'>5th: (2) {getItemsLevel(5)}</div>
              <div className='flex gap-x-2'>4th: (1) {getItemsLevel(4)}</div>
              <div className='flex gap-x-2'>3rd: (2) {getItemsLevel(3)}</div>
            </div>
          </div>
          
        </div>
        <div>
          {opts.map(x => (
            <div className='grid grid-cols-5 gap-x-4 border' key={x.name} onClick={() => handleClick(x)}>
              <div>{x.name}</div>
              <div>{x.cost}gp</div>
              <div>level {x.level}</div>
              <div>{x.count ? 'added' : 'x'}</div>
              <div>{x.rarity ? x.rarity : 'w/e'}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )

  // return (
  //   <>
  //     <div>Injuries Page</div>

  //   </>
  // )
}
