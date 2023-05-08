import { Skill as Codegen_Skill } from '../../graphql/generated/graphql'

export type Skill = Omit<Codegen_Skill, 'memberSkillsBySkillId' | 'featuresBySkillId' | '__typename' | 'nodeId'>
