import classnames from 'classnames'
import React from 'react'

interface Props {
  onClick?: () => void
  className?: string
  primary?: boolean
  children: string | React.ReactNode
}

// TODO: add spinner to replace text momentarily while clicked
export default function SmallButton({ onClick, primary, className, children }: Props) {
  const btnBgColor = primary ? 'bg-blue' : 'bg-gray'
  const baseStyles = {
    [`inline-block px-6 py-2.5 ${btnBgColor}-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:${btnBgColor}-700 hover:shadow-lg focus:${btnBgColor}-700 focus:shadow-lg focus:outline-none focus:ring-0 active:${btnBgColor}-800 active:shadow-lg transition duration-150 ease-in-out`]:
      true,
  }
  return (
    <button
      onClick={onClick}
      data-mdb-ripple='true'
      data-mdb-ripple-color='light'
      className={classnames({
        'bg-blue-600': false,
        'bg-gray-600': false,
        ...baseStyles,
        [className || '']: className,
      })}
    >
      {children}
    </button>
  )
}
