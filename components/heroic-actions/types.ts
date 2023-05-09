import {
  HeroicAction as Codegen_HeroicAction,
  MemberHeroicAction as Codegen_MemberHeroicAction,
} from '../../graphql/generated/graphql'

export type HeroicAction = Omit<Codegen_HeroicAction, 'memberHeroicActionsByHeroicActionId' | 'nodeId'>

export type MemberHeroicAction = Omit<
  Codegen_MemberHeroicAction,
  | 'characterByCharacterId'
  | 'characterCompanionByCompanionId'
  | 'heroicActionByHeroicActionId'
  | '__typename'
  | 'nodeId'
>
