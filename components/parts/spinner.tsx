import classnames from 'classnames'

export const Spinner = () => {
  const baseStyles = {
    'spinner-grow inline-block w-4 h-4 bg-current rounded-full opacity-0 animate-[spinner-grow_0.75s_linear_infinite] motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]':
      true,
  }

  const baseTextStyles = {
    '!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]': true,
  }
  return (
    <div className='flex justify-center items-center space-x-2'>
      <div
        className={classnames({
          ...baseStyles,
          'text-cyan-900': true,
        })}
        role='status'
      >
        <span
          className={classnames({
            ...baseTextStyles,
          })}
        >
          Loading...
        </span>
      </div>
      <div
        className={classnames({
          ...baseStyles,
          'text-cyan-600': true,
        })}
        role='status'
      >
        <span
          className={classnames({
            ...baseTextStyles,
          })}
        >
          Loading...
        </span>
      </div>
      <div
        className={classnames({
          ...baseStyles,
          'text-emerald-300': true,
        })}
        role='status'
      >
        <span
          className={classnames({
            ...baseTextStyles,
          })}
        >
          Loading...
        </span>
      </div>
      <div
        className={classnames({
          ...baseStyles,
          'text-sky-200': true,
        })}
        role='status'
      >
        <span
          className={classnames({
            ...baseTextStyles,
          })}
        >
          Loading...
        </span>
      </div>
    </div>
  )
}
