import { SelectHTMLAttributes, OptionHTMLAttributes } from 'react'
import classnames from 'classnames'

type Option = OptionHTMLAttributes<any> & {
  text: string | number
  value?: string | number
}

interface Props extends SelectHTMLAttributes<any> {
  className?: string
  options: Option[]
}

export default function Dropdown({ className, options, ...rest }: Props) {
  const baseClasses = {
    'form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none':
      true,
  }

  return (
    <select
      className={classnames({
        ...baseClasses,
        [className ?? '']: className ?? false,
      })}
      {...rest}
    >
      {options.map(opt => (
        <option key={opt.text} {...opt} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  )
}
