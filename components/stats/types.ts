import { Stat as Codegen_Stat, MemberStat as Codegen_MemberStat } from '../../graphql/generated/graphql'

export type Stat = Omit<Codegen_Stat, 'featuresByStatId' | 'memberStatsByStatId' | '__typename' | 'nodeId'>

export type MemberStat = Omit<
  Codegen_MemberStat,
  'mercenaryByMercenaryId' | 'characterByCharacterId' | 'statByStatId' | 'friendByFriendId' | '__typename'
>
