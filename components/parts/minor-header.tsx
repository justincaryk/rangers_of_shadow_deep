interface Props {
  content: string
  icon?: React.ReactNode | JSX.Element
  subtext?: string
  subvalue?: number
}
export default function MinorHeader({
  content,
  icon,
  subtext,
  subvalue,
}: Props) {
  return (
    <>
      <div className='flex items-center gap-x-1'>
        <div className='uppercase font-bold text-lg'>{content}</div>
        <div className='w-6'>{icon}</div>
      </div>
      {subtext && (
        <div className='flex gap-2 mt-2 px-2'>
          {subtext}
          <span className='font-bold'>{subvalue}</span>
        </div>
      )}
    </>
  )
}
