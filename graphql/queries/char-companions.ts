import { gql } from 'graphql-request'

export default gql`
  query CharCompanions {
    allCharacterCompanions {
      nodes {
        id
        name
        progressionPoints
        companionId
        bonusSkill
        skillByBonusSkill {
          name
          id
        }
      }
    }
  }
`
