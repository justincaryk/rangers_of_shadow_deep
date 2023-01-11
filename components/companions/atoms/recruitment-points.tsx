import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'


import {
  BASE_RECRUITMENT_POINTS,
  MAX_BUILD_POINTS_BOOSTER,
  RP_BONUS_PER_BUILD_POINT,
  RP_BONUS_PER_LEADERSHIP_SP,
  INITIAL_RECRUIT_SKILL_BUMP,
} from '../../rules/companion-rules'

export const useRecruitmentPoints = atomWithReset(BASE_RECRUITMENT_POINTS)

export const useSpendRecruitmentPoints = atom(null, (get, set, price: number) => {
  set(useRecruitmentPoints, get(useRecruitmentPoints) - price)
})

export const useRefundRecruitmentPoints = atom(null, (get, set, refund: number) => {
    set(useRecruitmentPoints, get(useRecruitmentPoints) + refund)
  })