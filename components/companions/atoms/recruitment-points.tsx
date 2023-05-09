import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'

import { BASE_RECRUITMENT_POINTS } from '../../rules/creation-rules'

export const useSpentRecruitmentPoints = atomWithReset(0)
export const useAdjustedRecruitmentPoints = atomWithReset(BASE_RECRUITMENT_POINTS)

export const useSetAdjustedRecruitmentPoints = atom(null, (get, set, updatedTotal: number) => {
  set(useAdjustedRecruitmentPoints, updatedTotal)
})

export const useSpendRecruitmentPoints = atom(null, (get, set, price: number) => {
  set(useSpentRecruitmentPoints, get(useSpentRecruitmentPoints) - price)
})

export const useRefundRecruitmentPoints = atom(null, (get, set, refund: number) => {
  set(useSpentRecruitmentPoints, get(useSpentRecruitmentPoints) + refund)
})
