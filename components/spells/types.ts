import { Spell as Codegen_Spell } from '../../graphql/generated/graphql'

export type Spell = Omit<Codegen_Spell, 'memberSpellsBySpellId' | '__typename' | 'nodeId'>
