import { gql } from 'graphql-request'

export default gql`
query CharacterSummary($id: UUID!) {
    characterById(id: $id) {
      avatarUrl
      id
      level
      name
      xp
      userId
      totalHeroicActions
      totalSkillPoints
      totalStatPoints
      totalRecruitmentPoints
      nodeId
      characterBpLookupsByCharacterId {
        nodes {
          id
          bpSpentOnStats
          bpSpentOnSkills
          bpSpentOnRp
          bpSpentOnHeroicAbilities
          characterId
          nodeId
        }
      }
    }
  }
`
