import { Features } from '@headlessui/react/dist/utils/render'
import {
  LevelGrant as Codegen_LevelGrant,
  MemberLevel as Codegen_MemberLevel,
  RangerLevelCost as Codegen_RangerLevelCost,
  FriendLevelGrant as Codegen_FriendLevelGrant,
  MemberLevelsQuery as Codegen_MemberLevelsQuery,
  FeaturesConnection,
} from '../../graphql/generated/graphql'
import { Feature } from '../features/types'

export type MemberLevelFeature = Pick<
  Feature,
  'id' | 'primaryType' | 'mechanicClass' | 'mechanicMod' | 'value' | 'statSubtype' | 'statId' | 'pickIds' | 'nodeId'
>

export type MemberLevel = Omit<
  Codegen_MemberLevel,
  'characterByCharacterId' | 'friendByFriendId' | 'friendLevelGrantByFriendLevelGrantId'
> & {
  friendLevelGrantByFriendLevelGrantId?: Omit<FriendLevelGrant, 'featuresByFriendLevelGrantId'> & {
    featuresByFriendLevelGrantId?: {
      nodes: MemberLevelFeature[]
    }
  }
}

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
  > {
  featuresByLevelGrantId: Omit<FeaturesConnection, '__typename' | 'edges' | 'pageInfo' | 'totalCount' | 'nodes'> & {
    nodes: Pick<Feature, 'id' | 'mechanicMod' | 'mechanicClass' | 'primaryType' | 'value'>[]
  }
}

export type RangerLevelCost = Omit<Codegen_RangerLevelCost, '__typename'>

export type FriendLevelGrant = Omit<Codegen_FriendLevelGrant, '__typename' | 'memberLevelsByFriendLevelGrantId'>

export type FriendLevelGrantUnwound = FriendLevelGrant & {
  unwoundCost: number
}

export type NextRangerLevel = {
  availableForPurchase: boolean
  level: LevelGrant | null
  cost: RangerLevelCost | null
}
