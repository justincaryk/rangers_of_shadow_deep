import React from 'react'

interface Props {
  content: string
  icon?: React.ReactNode
}
export default function MinorHeader({ content, icon }: Props) {
  return (
    <div className='flex items-center gap-x-1'>
      <div className='uppercase font-bold text-lg'>{content}</div>
      <div className='w-6'>{icon}</div>
    </div>
  )
}
