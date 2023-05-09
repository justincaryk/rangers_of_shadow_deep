import React, { useState, FocusEvent, FocusEventHandler } from 'react'
import Input, { InputProps } from './input'

interface InputDisplayToggleProps extends InputProps {
  stateVal: string | number
  label?: string
  onBlur: FocusEventHandler<FocusEvent<any, Element>>
}
export const InputDisplayToggle = ({ stateVal, label, onBlur, ...rest }: InputDisplayToggleProps) => {
  const [ isEdit, setIsEdit ] = useState(false)
  const divWrapperRef = React.createRef<HTMLDivElement>()

  const handleInputBlur = (e: FocusEvent<any, Element>) => {
    setIsEdit(!isEdit)
    onBlur?.(e)
    divWrapperRef.current?.focus()
  }

  const showInput = () => {
    setIsEdit(!isEdit)
  }

  return (
    <div onClick={showInput} tabIndex={0} ref={divWrapperRef} className='focus:outline-none cursor-pointer'>
      {label && <span className='font-bold'>{label} &nbsp;</span>}
      {isEdit ? (
        <Input className={'inline w-1/4'} onBlur={handleInputBlur} {...rest} autoFocus />
      ) : (
        <span>{stateVal}</span>
      )}
    </div>
  )
}
