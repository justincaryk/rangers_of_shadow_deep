'use client'

import { UsersIcon } from '@heroicons/react/24/outline'
import Card from '../parts/card'
import MinorHeader from '../parts/minor-header'
import ShowHide from '../parts/show-hide'

import { useAtom } from 'jotai'
import { useState } from 'react'
import { useRecruitmentPointsBp } from '../ranger/atoms/build-points'
import { useRangerApi } from '../ranger/ranger-api'

import { RECRUITMENT_POINTS_PER_BP } from '../rules/creation-rules'

export default function RecruitmentPoints() {
  const [ show, toggleShow ] = useState(false)
  const [ recruitmentBp ] = useAtom(useRecruitmentPointsBp)
  const { data: ranger } = useRangerApi().getRangerSummary

  return (
    <div className='space-y-4'>
      <div className='mt-2 cursor-pointer' onClick={() => toggleShow(!show)}>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader
          content='recruitment points'
          icon={<UsersIcon className='text-emerald-900' />}
          subtext={'Available points:'}
          subvalue={ranger?.characterById?.totalRecruitmentPoints ?? 0}
        />
      </div>
      {show && (
        <Card>
          <div className='space-y-4'>
            <div className='flex gap-x-4'>
              <div className='font-bold'>BP Spent at Creation: {recruitmentBp}</div>
            </div>
            <div className='space-y-1 text-sm text-dirty-orange'>
              <div>
                Every <strong>1 BUILD POINT</strong> spent yields{' '}
                <strong>{RECRUITMENT_POINTS_PER_BP} RECRUITMENT POINTS</strong>.
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
