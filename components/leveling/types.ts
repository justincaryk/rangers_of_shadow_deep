import {
  LevelGrant as Codegen_LevelGrant,
  RangerLevelCost as Codegen_RangerLevelCost,
  FriendLevelGrant as Codegen_FriendLevelGrant,
} from '../../graphql/generated/graphql'
export type LevelGrant = Omit<
  Codegen_LevelGrant,
  | '__typename'
  | 'companionLevelingsByBenefit'
  | 'featureByBenefit'
  | 'featureByEntityLimit'
  | 'rangerLevelCostsByBenefit'
  | 'memberLevelsByLevelGrantId'
  | 'featuresByLevelGrantId'
  | 'nodeId'
>

export type RangerLevelCost = Omit<Codegen_RangerLevelCost, '__typename' | 'nodeId'>

export type FriendLevelGrantFlat = Omit<
  Codegen_FriendLevelGrant,
  'nodeId' | '__typename' | 'memberLevelsByFriendLevelGrantsId' | 'featuresByFriendLevelGrantsId'
>
