import React from 'react'
import classnames from 'classnames'

interface Props {
  collapsible?: boolean
  isExpanded?: boolean
  header: React.ReactNode | string | null
  main: React.ReactNode | string | null
  className?: string
}

export default function Card({
  collapsible = false,
  isExpanded,
  header,
  main,
  className,
}: Props) {
  return (
    <div
      className={classnames({
        'block rounded-lg bg-slate-500/10 shadow-lg border': true,
        [className ?? '']: className
      })}
    >
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
