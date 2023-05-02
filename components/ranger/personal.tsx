'use client'

import { IdentificationIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { FocusEvent } from 'react'
import { CharacterByIdQuery } from '../../graphql/generated/graphql'
import { InputDisplayToggle } from '../parts/input-display-toggle'
import MinorHeader from '../parts/minor-header'
import { useBuildPoints } from './atoms/build-points'
import { useRangerApi } from './ranger-api'
import * as Yup from 'yup'

const RangerCoreFieldsSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  xp: Yup.number().required('Required'),
  level: Yup.number().required('Required'),
})

export default function Personal() {
  const [ totalBuildPoints ] = useAtom(useBuildPoints)
  const { data, status } = useRangerApi().getRangerById
  const { mutate } = useRangerApi().updateRanger

  const handleCharacterUpdate = (e: FocusEvent<any, HTMLElement>) => {
    if (!e.target.value || status !== 'success') {
      return null
    }

    const key = e.target.name as keyof CharacterByIdQuery['characterById']
    const valueCast = RangerCoreFieldsSchema.cast({
      [key]: e.target.value,
    })

    if (e.target.value !== data?.characterById?.[key]) {
      mutate({
        id: data?.characterById?.id,
        patch: {
          [key]: valueCast[key],
        },
      })
    }
  }

  return (
    <div className='space-y-4'>
      <MinorHeader
        content='personal'
        icon={<IdentificationIcon className='text-emerald-400' />}
      />
      <InputDisplayToggle
          stateVal={data?.characterById?.name ?? ''}
          label='Ranger Name:'
          name={'name'}
          placeholder='Ranger Name'
          onBlur={handleCharacterUpdate}
        />
      <div className='space-y-1'>
        <InputDisplayToggle
          stateVal={data?.characterById?.xp ?? ''}
          label='Current XP:'
          name='xp'
          placeholder='Current XP'
          onBlur={handleCharacterUpdate}
        />
        <InputDisplayToggle
          stateVal={data?.characterById?.level ?? ''}
          label='Current Level:'
          name='level'
          placeholder='Current Level'
          onBlur={handleCharacterUpdate}
        />
      </div>
      <div className='font-bold ' onFocus={() => {}}>
        Total BP Remaining: {totalBuildPoints}
      </div>
    </div>
  )
}
