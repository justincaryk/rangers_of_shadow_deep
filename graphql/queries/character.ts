import { gql } from 'graphql-request'

export default gql`
  query CharacterById($id: UUID!) {
    characterById(id: $id) {
      avatarUrl
      id
      level
      name
      totalHeroicActions
      xp
      userId
      totalSkillPoints
      totalStatPoints
      totalRecruitmentPoints
      nodeId
    }
  }
`
