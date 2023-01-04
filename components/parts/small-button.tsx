import classnames from 'classnames'
import React from 'react'

interface Props {
  onClick?: () => void
  className?: string
  children: string | React.ReactNode
}

export default function SmallButton({ onClick, className, children }: Props) {
  return (
    <button
      onClick={onClick}
      className={classnames({
        'border rounded px-4 py-1 bg-blue-400 text-white font-bold': true,
        [className || '']: className,
      })}
    >
      {children}
    </button>
  )
}
