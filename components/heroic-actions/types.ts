import { HeroicAction as Codegen_HeroicAction } from '../../graphql/generated/graphql'

export type HeroicAction = Omit<Codegen_HeroicAction, 'memberHeroicActionsByHeroicActionId' | 'memberStatsByStatsId'>

