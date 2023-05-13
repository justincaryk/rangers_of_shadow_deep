import Card from '../parts/card'
import SmallButton from '../parts/small-button'
import classnames from 'classnames'

import { BASE_STATS_ENUM, EXTENDED_STATS_ENUM } from '../types'
import { Mercenary } from './types'

import { objectKeys } from '../utils'

const baseBorderColor = { 'border border-orange-900 border-collapse': true }
const baseBgColor = 'bg-amber-600/50'
const noBorderTopClass = 'border-t-0'
const baseTableClasses = {
  [`table-auto w-full border-collapse border ${baseBorderColor} text-center`]: true,
}

const statKeys = [ ...objectKeys(BASE_STATS_ENUM), ...objectKeys(EXTENDED_STATS_ENUM) ]

export interface MercenaryProps {
  mercenary: Mercenary
  onMercSelect?: (merc: Mercenary) => void
  onMercRemove?: (merc: Mercenary) => void
}

export default function MercenaryCard({ onMercSelect, onMercRemove, mercenary }: MercenaryProps) {
  return (
    <Card>
      <div className='space-y-2'>
        <div className='space-y-2'>
          <div className='flex flex-row items-center justify-between'>
            <div>
              <span className='uppercase font-bold text-lg align-middle'>{mercenary.name}</span>
              <span className='ml-2 uppercase text-sm italic align-middle'>({mercenary.subtype})</span>
            </div>
            <div className='flex gap-x-2'>
              {!!onMercRemove ? (
                <div>
                  <SmallButton
                    className='bg-red-500/80 hover:bg-red-700/80 active:bg-red-700'
                    onClick={() => onMercRemove?.(mercenary)}
                  >
                    Remove type
                  </SmallButton>
                </div>
              ) : null}
              {!!onMercSelect ? (
                <div>
                  <SmallButton
                    className='bg-lime-500/80 hover:bg-lime-700/80 active:bg-lime-700'
                    onClick={() => onMercSelect?.(mercenary)}
                  >
                    Assign type
                  </SmallButton>
                </div>
              ) : null}
            </div>
          </div>
          <div>{mercenary.description}</div>
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
                <th className={`pl-1.5 capitalize text-left ${baseBgColor} ${baseBorderColor} py-2`}>
                  {mercenary.name}
                </th>
                <th className={`${baseBgColor} ${baseBorderColor} py-2`}>RP</th>
                <th className={`${baseBorderColor} bg-slate-200/30 py-2`}>{mercenary.cost}</th>
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
                  <td className={`border ${baseBorderColor}`} key={`${key}-val`}>
                    {key === EXTENDED_STATS_ENUM.notes ? '' : '+'}
                    {mercenary[key]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}
