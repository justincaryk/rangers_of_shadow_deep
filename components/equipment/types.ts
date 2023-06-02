import { Item as Codegen_Item } from '../../graphql/generated/graphql'

export type Item = Omit<
  Codegen_Item,
  | 'featuresByExcludesItemId'
  | '__typename'
  | 'featuresByItemId'
  | 'featuresByRequiresItemId'
  | 'itemFeaturesByItemId'
  | 'memberItemsByItemId'
>
