import { InputHTMLAttributes } from 'react'
import classnames from 'classnames'

interface Props extends InputHTMLAttributes<any> {
  className?: string
}

export default function Input({ className, ...props }: Props) {
  const baseClasses = {
    'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none':
      true,
  }

  return (
    <input
      type='text'
      className={classnames({
        ...baseClasses,
        [className ?? '']: className ?? '',
      })}
      {...props}
    />
  )
}
