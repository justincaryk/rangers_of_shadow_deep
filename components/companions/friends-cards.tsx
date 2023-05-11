import Image from 'next/image'

function getLetterAt(pos: number) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  return alphabet[pos]
}

interface MemberCardProps {
  companion: any
  i: number // TODO: remove and replace with avatar url
}

const MemberContent = ({ companion, i }: MemberCardProps) => (
  <div className='rounded shadow-lg'>
    <div className='p-2 flex justify-between rounded-t bg-sky-900'>
      <div>
        <div className='text-xl font-bold'>{companion?.name}</div>
        <div className='whitespace-nowrap overflow-ellipsis font-roboto uppercase font-bold text-xs text-slate-400'>
          <span>Level {companion.progressionPoints ?? 0}</span>
        </div>
      </div>
      <div className='w-16 h-16 relative'>
        <Image className='object-cover' src={`/images/avatars/avatar-${getLetterAt(i)}.png`} alt={'avatar'} fill />
      </div>
    </div>
    <div className='p-2 flex justify-between rounded-b bg-slate-500/30'>
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

export default function FriendCards() {
  const dummy = [ { name: 'Mike' }, { name: 'Bob' }, { name: 'Steve' }, { name: 'Chris' } ]

  return (
    <div className='grid grid-cols-3 gap-x-5 gap-y-5'>
      {dummy.map((x, i) => (
        <MemberContent key={x.name} companion={x} i={i} />
      ))}
    </div>
  )
}
