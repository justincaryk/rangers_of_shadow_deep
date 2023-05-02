import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Character } from '../../graphql/generated/graphql'
import { PRIVATE_LINK_ROUTES } from '../nav/routes'
import { useRangerApi } from './ranger-api'

function getLetterAt(pos: number) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  return alphabet[pos]
}

interface MemberCardProps {
  ranger: Partial<Character>
  i: number // TODO: remove and replace with avatar url
}

const MemberContent = ({ ranger, i }: MemberCardProps) => {
  const { mutate } = useRangerApi().deleteRanger
  
  const deleteCharacter = () => {
    mutate({ id: ranger.id })
  }

  return (
    <div className='rounded shadow-lg'>
      <div className='p-2 flex justify-between rounded-t bg-orange-900'>
        <div>
          <div className='text-xl font-bold'>{ranger?.name}</div>
          <div className='whitespace-nowrap overflow-ellipsis uppercase font-roboto text-xs text-slate-400 font-bold'>
            <span>Level {ranger.level ?? 0}</span>
          </div>
          <div className='whitespace-nowrap overflow-ellipsis uppercase font-roboto text-xs text-slate-400 font-bold'>
            <span>XP: {ranger.xp ?? 0}</span>
          </div>
        </div>
        <div className='w-16 h-16 relative'>
          <Image
            className='object-cover'
            src={`/images/avatars/avatar-${getLetterAt(i)}.png`}
            alt={'avatar'}
            fill
          />
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
          <Link
            href={PRIVATE_LINK_ROUTES.CREATE_RANGER.replace('[id]', ranger.id)}
          >
            <button className='text-sky-blue font-roboto uppercase hover:no-underline cursor-pointer outline-none'>
              Edit
            </button>
          </Link>
        </div>
        <div>
          <button
            className='text-red-500 font-roboto uppercase hover:no-underline cursor-pointer outline-none'
            onClick={deleteCharacter}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MyRangers() {
  const { data, status } = useRangerApi().getAllRangers
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    if (status === 'success') {
      setLoading(false)
    }
  }, [ status, loading ])

  return (
    <>
      <div className='grid grid-cols-3 gap-x-5 gap-y-5'>
        {data?.allCharacters?.nodes.map(
          (ranger, i) =>
            ranger && <MemberContent key={ranger.id} ranger={ranger} i={i} />
        ) ?? null}
      </div>
      {!data?.allCharacters?.nodes.length && (
        <div>
          No rangers created yet. Get to work and reclaim Shadow Deep for the
          Light!
        </div>
      )}
    </>
  )
}
