import { Character } from '../../graphql/generated/graphql'

export type RangerLevelingFields = Pick<
  Character,
  'totalHeroicActions' | 'totalRecruitmentPoints' | 'totalSkillPoints' | 'totalStatPoints'
>

export type AllRangersCharacter = Pick<
  Character,
  | 'avatarUrl'
  | 'id'
  | 'level'
  | 'name'
  | 'nodeId'
  | 'totalHeroicActions'
  | 'totalRecruitmentPoints'
  | 'totalSkillPoints'
  | 'totalStatPoints'
  | 'xp'
  | 'userId'
  | 'nodeId'
>
