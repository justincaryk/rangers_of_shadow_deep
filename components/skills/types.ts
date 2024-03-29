import { Skill as Codegen_Skill, MemberSkill as Codegen_MemberSkill } from '../../graphql/generated/graphql'

export type Skill = Omit<
  Codegen_Skill,
  'friendsByBonusSkill' | 'memberSkillsBySkillId' | 'featuresBySkillId' | '__typename'
>
export type MemberSkill = Omit<
  Codegen_MemberSkill,
  'characterByCharacterId' | 'characterCompanionByCompanionId' | 'skillBySkillId' | '__typename'
>
