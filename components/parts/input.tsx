import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<any> {
  label?: string
  className?: string
}

const baseClassesList = [
  'block',
  'w-full',
  'px-3',
  'py-1.5',
  'text-base',
  'font-normal',
  'text-gray-700',
  'bg-white bg-clip-padding',
  'border border-solid',
  'rounded',
  'transition',
  'ease-in-out',
  'm-0',
  'focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none',
]

export default function Input({ label, className, ...props }: Props) {
  const fullClasses = `${baseClassesList.join(' ')} ${className}`

  return (
    <div>
      {label && (
        <label
          htmlFor={props.name}
          className='form-label inline-block mb-2 text-gray-700'
        >
          {label}
        </label>
      )}
      <input type='text' className={fullClasses} {...props} />
    </div>
  )
}
