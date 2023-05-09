import { LevelGrant as Codegen_LevelGrant } from '../../../graphql/generated/graphql'
export type LevelGrant = Omit<
  Codegen_LevelGrant,
  | '__typename'
  | 'companionLevelingsByBenefit'
  | 'featureByBenefit'
  | 'featureByEntityLimit'
  | 'rangerLevelCostsByBenefit'
  | 'nodeId'
>
