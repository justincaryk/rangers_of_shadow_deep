'use client'

import classnames from 'classnames'
import React from 'react'

interface Props {
  onClick?: () => void
  className?: string
  children: string | React.ReactNode
}

// TODO: add spinner to replace text momentarily while clicked
export default function SmallButton({ onClick, className, children }: Props) {
  const baseStyles = {
    'inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out':
      true,
  }
  return (
    <button
      onClick={onClick}
      data-mdb-ripple='true'
      data-mdb-ripple-color='light'
      className={classnames({
        ...baseStyles,
        [className || '']: className,
      })}
    >
      {children}
    </button>
  )
}
