import { LevelGrantSubtype, MechanicModType } from '../../graphql/generated/graphql'
import { LevelGrant, RangerLevelCost } from './types'
import { RangerLevelingFields } from '../ranger/types'

export const determineApplicableRangerLevelUpBenefit = (
  newLevel: number,
  levelGrants: LevelGrant[]
): LevelGrant | null => {
  if (isNaN(newLevel) || !levelGrants.length) {
    throw new Error('missing args.')
  }
  const numOfOptions = levelGrants.length
  const levelCyclesReduced = newLevel / numOfOptions
  const levelCyclesReducedFloor = Math.floor(levelCyclesReduced)
  const timesLevelsCycled =
    levelCyclesReduced === levelCyclesReducedFloor ? levelCyclesReduced - 1 : levelCyclesReducedFloor
  const levelsToDiscard = numOfOptions * timesLevelsCycled
  const reducedTargetLevel = newLevel - levelsToDiscard

  let grantedBenefit = null

  for (const levelGrant of levelGrants) {
    if (reducedTargetLevel === levelGrant.firstLevelGranted) {
      grantedBenefit = levelGrant
      break
    }
  }

  return grantedBenefit
}

export const determineApplicableRangerLevelUpCost = (newLevel: number, levelCosts: RangerLevelCost[]) => {
  if (isNaN(newLevel) || !levelCosts.length) {
    throw new Error('missing args.')
  }

  for (const levelCost of levelCosts) {
    if (newLevel >= levelCost.levelMin && newLevel <= levelCost.levelMax) {
      return levelCost
    }
  }
  return null
}

export function roundDownToNearestTen(number: number): number {
  const numString = number.toString()
  const len = numString.length
  const roundedDownStr = `${numString[0]}0${len === 3 ? '0' : ''}`
  return Math.min(Number(roundedDownStr), 100)
}

type MechanicBenefit = {
  field: keyof RangerLevelingFields | null
  value: number
}
export function getMechanicBenefitForRanger(level: LevelGrant) {
  const { levelGrantType, value } =
    level.featuresByLevelGrantId.nodes.find(x => x.mechanicMod === MechanicModType.Modifier) ?? {}

  const mechanicBenefit = {
    field: null,
    value,
  } as MechanicBenefit

  if (levelGrantType === LevelGrantSubtype.HeroicAction) {
    mechanicBenefit.field = 'totalHeroicActions'
  }

  if (levelGrantType === LevelGrantSubtype.RecruitmentPoint) {
    mechanicBenefit.field = 'totalRecruitmentPoints'
  }

  if (levelGrantType === LevelGrantSubtype.Skill) {
    mechanicBenefit.field = 'totalSkillPoints'
  }
  if (levelGrantType === LevelGrantSubtype.Stat) {
    mechanicBenefit.field = 'totalStatPoints'
  }

  return mechanicBenefit
}
