import { useMemo } from 'react'
import { companions } from '../data'
import Card from '../parts/card'
import { STATS_ENUM } from '../types'
import { objectKeys } from '../utils'
import classnames from 'classnames'
export default function CompanionsList() {
  const statKeys = useMemo(() => {
    return objectKeys(STATS_ENUM)
  }, [])

  const baseBorderColor = 'border border-orange-900 border-collapse'
  const baseBgColor = 'bg-amber-600/50'
  const baseTableClasses = {[`table-auto w-full border-collapse border ${baseBorderColor} text-center`]: true}
  const noBorderTopClass = 'border-t-0'

  return (
    <div className='space-y-4'>
      {companions.map(comp => (
        <Card
          key={comp.name}
          header={null}
          main={
            <div className='space-y-2'>
              <div className='space-y-2'>
                <div>
                  <span className='uppercase font-bold text-lg'>
                    {comp.name}
                  </span>
                  <span className='ml-2 uppercase text-sm italic'>
                    ({comp.subtype})
                  </span>
                </div>
                <div>{comp.desc}</div>
              </div>
              <div>
                <table className={classnames({
                  ...baseTableClasses,
                  ['border-b-0']: true
                })}>
                  <thead>
                    <tr>
                      <th className={`pl-1.5 capitalize text-left ${baseBgColor} ${baseBorderColor} py-2`}>{comp.name}</th>
                      <th className={`${baseBgColor} ${baseBorderColor} py-2`}>RP</th>
                      <th className={`${baseBorderColor} bg-slate-200/30 py-2`}>{comp.cost}</th>
                    </tr>
                  </thead>
                </table>
                <table className={classnames({
                  ...baseTableClasses,
                  [noBorderTopClass]: true
                })}>
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
