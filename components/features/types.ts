import { Feature as Codegen_Feature } from '../../graphql/generated/graphql'

export type Feature = Omit<
  Codegen_Feature,
  | 'injuryByInjuryId'
  | 'itemFeaturesByFeatureId'
  | 'levelGrantByLevelGrantId'
  | 'nodeId'
  | 'skillBySkillId'
  | 'statByStatId'
>
