import { Stat as Codegen_Stat, MemberStat as Codegen_MemberStat } from '../../graphql/generated/graphql'
import { Mercenary } from '../companions/types'

export type Stat = Omit<Codegen_Stat, 'featuresByStatId' | 'memberStatsByStatId' | '__typename' | 'nodeId'>

export type MemberStat = Omit<
  Codegen_MemberStat,
  'mercenaryByMercenaryId' | 'characterByCharacterId' | 'statByStatId' | 'friendByFriendId' | '__typename'
>

type StatFieldName = Pick<Stat, 'name'>
type MercStatFields = Pick<Mercenary, 'armor' | 'move' | 'fight' | 'shoot' | 'health' | 'will'>
type Mapped<T, K> = {
  [Prop in keyof K]: keyof T
}

export type StatWithBaseTypedName = Omit<Stat, 'name'> & Mapped<MercStatFields, StatFieldName>
