import { Stat as Codegen_Stat } from '../../graphql/generated/graphql'

export type Stat = Omit<Codegen_Stat, 'featuresByStatId' | 'memberStatsByStatId' | '__typename' | 'nodeId'>
