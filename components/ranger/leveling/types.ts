import { LevelGrant as Codegen_LevelGrant, RangerLevelCost as Codegen_RangerLevelCost } from '../../../graphql/generated/graphql'
export type LevelGrant = Omit<
  Codegen_LevelGrant,
  | '__typename'
  | 'companionLevelingsByBenefit'
  | 'featureByBenefit'
  | 'featureByEntityLimit'
  | 'rangerLevelCostsByBenefit'
  | 'nodeId'
>

export type RangerLevelCost = Omit<
Codegen_RangerLevelCost,
  | '__typename'
  | 'nodeId'
>
