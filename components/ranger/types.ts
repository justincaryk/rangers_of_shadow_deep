import { Character } from '../../graphql/generated/graphql'

export type RangerLevelingFields = Pick<
  Character,
  'totalHeroicActions' | 'totalRecruitmentPoints' | 'totalSkillPoints' | 'totalStatPoints'
>
