import { LevelGrant, RangerLevelCost } from './types'

export const determineApplicableRangerLevelUpBenefit = (
  newLevel: number,
  levelGrants: LevelGrant[]
): LevelGrant | null => {
  if (isNaN(newLevel) || !levelGrants.length) {
    throw new Error('missing args.')
  }

  let grantedBenefit = null
  function checkLog(num: number) {
    return Math.log(num) / Math.LN10
  }
  const numOfBenefitOptions = checkLog(levelGrants.length)
  let currenModToEval = 0

  while (!grantedBenefit && currenModToEval < newLevel) {
    for (const levelGrant of levelGrants) {
      if (currenModToEval + levelGrant.firstLevelGranted === newLevel) {
        grantedBenefit = levelGrant
      }
    }
    currenModToEval += numOfBenefitOptions
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
}
