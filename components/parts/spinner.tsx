import classnames from 'classnames'

export const Spinner = () => {
  
  const baseStyles = {
    'spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0': true,
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
        <span className='visually-hidden'>Loading...</span>
      </div>
      <div
        className={classnames({
          ...baseStyles,
          'text-cyan-600': true,
        })}
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
      <div
        className={classnames({
          ...baseStyles,
          'text-emerald-300': true,
        })}
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
      <div
        className={classnames({
          ...baseStyles,
          'text-sky-200': true,
        })}
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}
