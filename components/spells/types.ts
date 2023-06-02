import { Spell as Codegen_Spell, MemberSpell as Codegen_MemberSpell } from '../../graphql/generated/graphql'

export type Spell = Omit<Codegen_Spell, 'memberSpellsBySpellId' | '__typename' | 'nodeId'>
export type MemberSpell = Omit<
  Codegen_MemberSpell,
  'characterByCharacterId' | 'characterCompanionByCompanionId' | 'spellBySpellId' | '__typename' | 'nodeId'
>
