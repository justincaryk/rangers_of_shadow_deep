interface Props {
  content: string
  icon?: React.ReactNode | JSX.Element
  iconSize?: string
  subtext?: string
  subvalue?: number
}
export default function MinorHeader({
  content,
  icon,
  iconSize = 'w-8',
  subtext,
  subvalue,
}: Props) {
  return (
    <>
      <div className='flex items-center gap-x-1'>
        <div className='uppercase font-bold text-lg'>{content}</div>
        <div className={iconSize}>{icon}</div>
      </div>
      {subtext && (
        <div className='flex gap-2 mt-2'>
          {subtext}
          <span className='font-bold'>{subvalue}</span>
        </div>
      )}
    </>
  )
}
