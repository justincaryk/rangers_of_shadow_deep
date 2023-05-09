import { InputHTMLAttributes } from 'react'
import classnames from 'classnames'

export interface InputProps extends InputHTMLAttributes<any> {
  className?: string
  label?: string
  autoFocus?: boolean
}

export const baseInputClasses =
  'form-control px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
export const baseInputClassesFullWidth = `${baseInputClasses} block w-full`

export default function Input({ className, autoFocus = false, ...props }: InputProps) {
  return (
    <input
      autoFocus={autoFocus}
      type='text'
      className={classnames({
        [baseInputClassesFullWidth]: true,
        [className ?? '']: className ? true : false,
      })}
      {...props}
    />
  )
}
