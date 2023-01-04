import React from 'react'
import classnames from 'classnames'

interface Props {
  collapsible?: boolean
  isExpanded?: boolean
  header: React.ReactNode | string | null
  main: React.ReactNode | string | null
}

export default function Card({
  collapsible = false,
  isExpanded,
  header,
  main,
}: Props) {
  return (
    <div className='block rounded-lg shadow-lg border'>
      <div
        className={classnames({
          'py-3 px-6 border-b border-collapse': true,
          hidden: !header,
        })}
      >
        {header}
      </div>
      <div
        className={classnames({
          'p-6': true,
          hidden: !main || (collapsible && !isExpanded),
        })}
      >
        {main}
      </div>
    </div>
  )
}
