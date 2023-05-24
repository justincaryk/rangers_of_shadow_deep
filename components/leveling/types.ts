import {
  LevelGrant as Codegen_LevelGrant,
  MemberLevel as Codegen_MemberLevel,
  RangerLevelCost as Codegen_RangerLevelCost,
  FriendLevelGrant as Codegen_FriendLevelGrant,
  FeaturesConnection,
} from '../../graphql/generated/graphql'
import { Feature } from '../features/types'

export type MemberLevel = Omit<
  Codegen_MemberLevel,
  | 'nodeId'
  | 'friendLevelGrantByFriendLevelGrantId'
  | 'friendByFriendId'
  | 'characterByCharacterId'
  | 'levelGrantByLevelGrantId'
  | '__typename'
>

export interface LevelGrant
  extends Omit<
    Codegen_LevelGrant,
    | '__typename'
    | 'companionLevelingsByBenefit'
    | 'featureByBenefit'
    | 'featureByEntityLimit'
    | 'rangerLevelCostsByBenefit'
    | 'memberLevelsByLevelGrantId'
    | 'featuresByLevelGrantId'
    | 'nodeId'
  > {
  featuresByLevelGrantId: Omit<FeaturesConnection, '__typename' | 'edges' | 'pageInfo' | 'totalCount' | 'nodes'> & {
    nodes: Pick<Feature, 'id' | 'mechanicMod' | 'mechanicClass' | 'primaryType' | 'value'>[]
  }
}

export type RangerLevelCost = Omit<Codegen_RangerLevelCost, '__typename' | 'nodeId'>

export type FriendLevelGrant = Omit<
  Codegen_FriendLevelGrant,
  'nodeId' | '__typename' | 'memberLevelsByFriendLevelGrantId' | 'featuresByFriendLevelGrantId'
>

export type FriendLevelGrantUnwound = FriendLevelGrant & {
  unwoundCost: number
}

export type NextRangerLevel = {
  availableForPurchase: boolean
  level: LevelGrant | null
  cost: RangerLevelCost | null
}
