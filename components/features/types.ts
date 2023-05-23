import { Feature as Codegen_Feature } from '../../graphql/generated/graphql'

export type Feature = Omit<
  Codegen_Feature,
  | 'featuresByFeatureId'
  | 'friendLevelGrantByFriendLevelGrantId'
  | 'injuryByInjuryId'
  | 'itemByExcludesItemId'
  | 'itemByRequiresItemId'
  | 'itemFeaturesByFeatureId'
  | 'levelGrantByLevelGrantId'
  | 'mercenaryByMercenaryId'
  | 'nodeId'
  | 'pickIds'
> & {
  pickIds?: string[]
}
