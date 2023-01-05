import { SelectHTMLAttributes, OptionHTMLAttributes } from 'react'
import { baseClassesList } from './input'

type Option = OptionHTMLAttributes<any> & {
  text: string | number
}

interface Props extends SelectHTMLAttributes<any> {
  label?: string
  className?: string
  options: Option[]
}

export default function Dropdown({
  label,
  className,
  options,
  ...props
}: Props) {
  const fullClasses = `${baseClassesList.join(' ')} ${className}`

  return (
    <>
      {label && (
        <label
          htmlFor={props.name}
          className='form-label inline-block mb-2 text-gray-700'
        >
          {label}
        </label>
      )}
      <select className={fullClasses} {...props}>
        {options.map(opt => (
          <option key={opt.text} {...opt}>
            {opt.text}
          </option>
        ))}
      </select>
    </>
  )
}
