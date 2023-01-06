'use client'

import { Companion, companions } from '../data'
import Card from '../parts/card'
import { STATS_ENUM } from '../types'
import { objectKeys } from '../utils'
import classnames from 'classnames'
import SmallButton from '../parts/small-button'
import { useAtom } from 'jotai'
import {
  useRecruitmentPoints,
  useSpendRecruitmentPoints,
} from './atoms/recruitment-points'
import { useAddCompanion } from './atoms/companions'

import toast from 'react-hot-toast'
import { useState } from 'react'
import { Spinner } from '../parts/spinner'

const baseBorderColor = { 'border border-orange-900 border-collapse': true }
const baseBgColor = 'bg-amber-600/50'
const baseTableClasses = {
  [`table-auto w-full border-collapse border ${baseBorderColor} text-center`]:
    true,
}
const noBorderTopClass = 'border-t-0'

const statKeys = objectKeys(STATS_ENUM)

export default function CompanionsList() {
  // prob a better way to handle this
  const [ buying, setBuying ] = useState<string | null>(null)

  const [ recruitmentPoints ] = useAtom(useRecruitmentPoints)
  const [ _x, spendRecruitmentPoints ] = useAtom(useSpendRecruitmentPoints)
  const [ _y, buyCompanion ] = useAtom(useAddCompanion)

  const turnOnBuying = (name: string) => {
    setBuying(name)
    setTimeout(() => setBuying(null), 1500)
  }
  const tryBuyCompanion = (companion: Companion) => {
    if (companion.cost < recruitmentPoints) {
      turnOnBuying(companion.name)
      spendRecruitmentPoints(companion.cost)
      buyCompanion(companion)

      // toast(
      //   <></>,
      //   {
      //     icon: ''
      //   }
      // )
    }
  }

  return (
    <div className='space-y-4'>
      {companions.map(comp => (
        <Card
          key={comp.name}
          header={null}
          main={
            <div className='space-y-2'>
              <div className='space-y-2'>
                <div className='flex flex-row items-center justify-between'>
                  <div>
                    <span className='uppercase font-bold text-lg align-middle'>
                      {comp.name}
                    </span>
                    <span className='ml-2 uppercase text-sm italic align-middle'>
                      ({comp.subtype})
                    </span>
                  </div>
                  <div>
                    {buying === comp.name ? (
                      <Spinner />
                    ) : (
                      <SmallButton
                        className='bg-yellow-700/80 hover:bg-yellow-700/80 focus:bg-yellow-700/80 active:bg-yellow-700/80'
                        onClick={() => tryBuyCompanion(comp)}
                      >
                        ADD
                      </SmallButton>
                    )}
                  </div>
                </div>
                <div>{comp.desc}</div>
              </div>
              <div>
                <table
                  className={classnames({
                    ...baseTableClasses,
                    ['border-b-0']: true,
                  })}
                >
                  <thead>
                    <tr>
                      <th
                        className={`pl-1.5 capitalize text-left ${baseBgColor} ${baseBorderColor} py-2`}
                      >
                        {comp.name}
                      </th>
                      <th className={`${baseBgColor} ${baseBorderColor} py-2`}>
                        RP
                      </th>
                      <th className={`${baseBorderColor} bg-slate-200/30 py-2`}>
                        {comp.cost}
                      </th>
                    </tr>
                  </thead>
                </table>
                <table
                  className={classnames({
                    ...baseTableClasses,
                    [noBorderTopClass]: true,
                  })}
                >
                  <thead className={baseBgColor}>
                    <tr>
                      {statKeys.map(key => (
                        <th
                          key={`${key}-key`}
                          className={`uppercase font-bold text-sm border ${baseBorderColor} ${noBorderTopClass}`}
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {statKeys.map(key => (
                        <td
                          className={`border ${baseBorderColor}`}
                          key={`${key}-val`}
                        >
                          {key === STATS_ENUM.notes ? '' : '+'}
                          {comp.stats[key]}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          }
        />
      ))}
    </div>
  )
}
