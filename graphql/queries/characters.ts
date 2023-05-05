import { gql } from 'graphql-request'

export default gql`
  query AllCharacters {
    allCharacters {
      totalCount
      nodes {
        avatarUrl
        id
        level
        name
        nodeId
        totalHeroicActions
        totalRecruitmentPoints
        totalSkillPoints
        totalStatPoints
        xp
        userId
        nodeId
      }
    }
  }
`
