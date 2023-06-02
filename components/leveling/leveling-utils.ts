import { MechanicClassType, MechanicModType } from '../../graphql/generated/graphql'
import { LevelGrant, MemberLevel, RangerLevelCost } from './types'
import { RangerLevelingFields } from '../ranger/types'
import { Feature } from '../features/types'

export const determineApplicableRangerLevelUpBenefit = (
  newLevel: number,
  levelGrants: LevelGrant[]
): LevelGrant | null => {
  if (isNaN(newLevel) || !levelGrants.length) {
    throw new Error('missing args.')
  }
  const levelsWithoutCreateGrants = levelGrants.filter(x => x.firstLevelGranted > 0)
  const numOfOptions = levelsWithoutCreateGrants.length
  const levelCyclesReduced = newLevel / numOfOptions
  const levelCyclesReducedFloor = Math.floor(levelCyclesReduced)
  const timesLevelsCycled =
    levelCyclesReduced === levelCyclesReducedFloor ? levelCyclesReduced - 1 : levelCyclesReducedFloor
  const levelsToDiscard = numOfOptions * timesLevelsCycled
  const reducedTargetLevel = newLevel - levelsToDiscard

  let grantedBenefit = null

  for (const levelGrant of levelsWithoutCreateGrants) {
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
  // const { mechanicClass, value } =
  const { mechanicClass, value } =
    level.featuresByLevelGrantId.nodes.find(x => x.mechanicMod === MechanicModType.Pick || x.mechanicMod === MechanicModType.Modifier) ?? ({} as Feature)

  const mechanicBenefit = {
    field: null,
    value,
  } as MechanicBenefit

  if (mechanicClass === MechanicClassType.HeroicAbility) {
    mechanicBenefit.field = 'totalHeroicActions'
  }

  if (mechanicClass === MechanicClassType.RecruitmentPoint) {
    mechanicBenefit.field = 'totalRecruitmentPoints'
  }

  if (mechanicClass === MechanicClassType.Skill) {
    mechanicBenefit.field = 'totalSkillPoints'
  }
  if (mechanicClass === MechanicClassType.Stat) {
    mechanicBenefit.field = 'totalStatPoints'
  }

  return mechanicBenefit
}

export function getPendingPickTypeMemberLevels (memberLevels: MemberLevel[], classType: MechanicClassType) {
  const pendingTargetLevels: MemberLevel[] = []

    // check for member levels that have not been effected
    for (const memberLevel of memberLevels) {
      if (memberLevel.timesGranted > memberLevel.timesUsed) {
        const features = memberLevel.friendLevelGrantByFriendLevelGrantId?.featuresByFriendLevelGrantId?.nodes ?? []
        // check the member level's features for Pick & Stat type
        for (const feature of features) {
          if (feature.mechanicMod === MechanicModType.Pick && feature.mechanicClass === classType) {
            pendingTargetLevels.push(memberLevel)
          }
        }
      }
    }

    return pendingTargetLevels
}