import { Friend, Mercenary as Codegen_Mercenary } from '../../graphql/generated/graphql'
import { Item } from '../equipment/types'
import { Feature } from '../features/types'
import { MemberSkill } from '../skills/types'
import { MemberStat } from '../stats/types'

export type MercenaryItem = Omit<Item, 'rarity' | 'class' | 'description' | 'name' | 'slotCost'>
export type MercenaryFeature = Omit<Feature, 'id' | 'name'>

export type Mercenary = Omit<
  Codegen_Mercenary,
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
  memberStatsByMercenaryId: {
    nodes: MemberStat[]
  }
}

export type FriendSummary = Pick<
  Friend,
  'id' | 'name' | 'progressionPoints' | 'mercenaryId' | 'bonusSkill' | 'avatarUrl'
>
