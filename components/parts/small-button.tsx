import classnames from 'classnames'
import React, { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  disabled?: boolean
  className?: string
  primary?: boolean
  children: string | React.ReactNode
}

// TODO: add spinner to replace text momentarily while clicked
export default function SmallButton({ onClick, primary, disabled, className, children }: Props) {
  const btnBgColor = primary ? 'bg-blue' : 'bg-gray'
  const baseStyles = {
    [`inline-block px-6 py-2.5 ${btnBgColor}-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md transition duration-150 ease-in-out`]:
      true,
  }
  const baseHoverStyles = {
    'hover:${btnBgColor}-700 hover:shadow-lg focus:${btnBgColor}-700 focus:shadow-lg focus:outline-none focus:ring-0 active:${btnBgColor}-800 active:shadow-lg':
      !disabled,
  }
  return (
    <button
      onClick={onClick}
      data-mdb-ripple='true'
      data-mdb-ripple-color='light'
      className={classnames({
        'bg-blue-600': false,
        'bg-gray-600': false,
        'cursor-pointer': !disabled,
        'cursor-not-allowed': disabled,
        ...baseStyles,
        ...baseHoverStyles,
        [className || '']: className,
      })}
    >
      {children}
    </button>
  )
}
