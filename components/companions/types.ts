import { Friend, Mercenary as Codegen_Mercenary } from '../../graphql/generated/graphql'
import { Item } from '../equipment/types'
import { Feature } from '../features/types'
import { MemberSkill } from '../skills/types'

export type MercenaryItem = Omit<Item, 'rarity' | 'class' | 'description' | 'name' | 'slotCost'>
export type MercenaryFeature = Omit<Feature, 'id' | 'name'>

export type Mercenary = Omit<
  Codegen_Mercenary,
  | 'nodeId'
  | 'friendsByMercenaryId'
  | '__typename'
  | 'featuresByMercenaryId'
  | 'memberItemsByMercenaryId'
  | 'memberSkillsByMercenaryId'
  | 'memberStatsByMercenaryId'
> & {
  featuresByMercenaryId: {
    nodes: MercenaryFeature[]
  }
  memberItemsByMercenaryId: {
    nodes: MercenaryItem[]
  }
  memberSkillsByMercenaryId: {
    nodes: MemberSkill[]
  }
}

export type FriendSummary = Pick<
  Friend,
  'id' | 'name' | 'progressionPoints' | 'mercenaryId' | 'bonusSkill' | 'avatarUrl'
>
