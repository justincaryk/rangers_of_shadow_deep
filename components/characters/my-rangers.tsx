import Image from 'next/image'


function getLetterAt(pos: number) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  return alphabet[pos]
}

const MemberContent = ({ ranger, i }: any) => (
  <div className='rounded'>
    <div className='bg-stone text-white p-2 flex justify-between rounded-t'>
      <div>
        <div className='text-xl font-bold text-dirty-orange'>
          {ranger?.name}
        </div>
        <div className='whitespace-nowrap overflow-ellipsis font-roboto text-xs text-gray-400'>
          <span>Level {ranger.level}</span>
        </div>
      </div>
      <div className='w-16 h-16 relative'>
        <Image
          className='object-cover'
          src={`/images/avatars/avatar-${getLetterAt(i)}.png`}
          alt={'avatar'}
          fill
          // width={50}
          // height={50}
        />
      </div>
    </div>
    <div className='p-2 flex justify-between border-b border-l border-r'>
      <div>
        <button
          className='text-sky-blue font-roboto uppercase hover:no-underline cursor-pointer outline-none'
          // onClick={() => history.push(`/create/${char?.characterId}/sheet`)}
        >
          View
        </button>
      </div>
      <div>
        <button
          className='text-sky-blue font-roboto uppercase hover:no-underline cursor-pointer outline-none'
          // onClick={() =>
          //   history.push(`/create/${char?.characterId}/description`)
          // }
        >
          Edit
        </button>
      </div>
      <div>
        <button className='text-red-500 font-roboto uppercase hover:no-underline cursor-pointer outline-none'>
          TODO: Delete
        </button>
      </div>
    </div>
  </div>
)

export default function MyRangers() {
  const dummy = [
    { name: 'Mike' },
    { name: 'Bob' },
    { name: 'Steve' },
    { name: 'Chris' },
  ]

  return (
    <div className='grid grid-cols-3 gap-x-5 gap-y-5'>
      {dummy.map((x, i) => (
        <MemberContent key={x.name} ranger={x} i={i} />
      ))}
    </div>
  )
}
