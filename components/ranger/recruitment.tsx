// 'use client'

// import { UsersIcon } from '@heroicons/react/24/outline'

// import { useAtom } from 'jotai'
// import { useMemo, useState } from 'react'

// import Card from '../parts/card'
// import MinorHeader from '../parts/minor-header'
// import ShowHide from '../parts/show-hide'
// import SmallButton from '../parts/small-button'

// import { useRecruitmentPointsBp } from '../ranger/atoms/build-points'

// import {
//   RECRUITMENT_POINTS_PER_BP,
//   MAX_BP_FOR_RP,
// } from '../rules/creation-rules'
// import { useRangerApi } from '../ranger/ranger-api'

export default function RecruitmentPoints() {
  // const [ show, toggleShow ] = useState(false)
  // const [ recruitmentBp ] = useAtom(useRecruitmentPointsBp)

  // const { data: ranger } = useRangerApi().getRangerById
  // // const { mutate: updateRanger } = useRangerApi().updateRanger
  // const { mutate: mutateSpendBp } = useRangerApi().updateRangerBpAllottment
  // const budgetedRecruitmentCount = useMemo(() => {
  //   return ranger?.characterById?.totalRecruitmentPoints ?? 0
  // }, [ ranger ])

  // const spendBpForSkillPoints = () => {
  //   if (recruitmentBp > 0) {
  //     const current = ranger?.characterById?.characterBpLookupsByCharacterId?.nodes[0]
  //     mutateSpendBp({
  //       lookupId: current?.id,
  //       rp: (current?.bpSpentOnRp || 0) + 1,
  //     })
  //   }
  // }

  // const recoverBuildPoint = () => {
  //   // do they have enough points ?
  //   const hasEnoughForRefund = budgetedRecruitmentCount >= RECRUITMENT_POINTS_PER_BP
    
  //   // is the available amount from create only? 
  //   const maxPermittedRefund = (MAX_BP_FOR_RP - recruitmentBp) * RECRUITMENT_POINTS_PER_BP
  //   const isRefundInBounds = maxPermittedRefund >= RECRUITMENT_POINTS_PER_BP
  //   if (hasEnoughForRefund && isRefundInBounds) {
  //     mutateSpendBp({
  //       id: ranger?.characterById?.id,
  //       patch: {
  //         totalRecruitmentPoints: budgetedRecruitmentCount - RECRUITMENT_POINTS_PER_BP,
  //       },
  //     })
  //   }
  // }

  return (
    <div className='space-y-4'>
      {/* <div className='mt-2' onClick={() => toggleShow(!show)}>
        <div className='w-6 float-right'>
          <ShowHide isShow={show} />
        </div>
        <MinorHeader
          content='recruitment points'
          icon={<UsersIcon className='text-emerald-900' />}
          subtext={'Available build points:'}
          subvalue={recruitmentBp}
        />
      </div>
      {show && (
        <Card
          header={null}
          main={
            <div className='space-y-4'>
              <div className='flex gap-x-4'>
                <div className='font-bold'>Allotted Recruitment Points: {budgetedRecruitmentCount}</div>
              </div>
              <div className='space-y-1 text-sm text-dirty-orange'>
                <div>
                  Every <strong>1 BUILD POINT</strong> spent yields{' '}
                  <strong>{RECRUITMENT_POINTS_PER_BP} RECRUITMENT POINTS</strong>.
                </div>
              </div>
              <div className='space-x-2'>
                <SmallButton onClick={spendBpForSkillPoints} primary>
                  Increase allotment
                </SmallButton>
                <SmallButton onClick={recoverBuildPoint}>Decrease allotment</SmallButton>
              </div>
            </div>
          }
        />
      )} */}
    </div>
  )
}
