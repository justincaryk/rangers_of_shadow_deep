interface Props {
  content: string
}
export default function PageHeader({ content }: Props) {
  return (
    <div className='pt-6 text-xl text-center font-bold'>
      {content}
    </div>
  )
}
