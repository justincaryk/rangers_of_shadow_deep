import { gql } from 'graphql-request'

export default gql`
  query CharCompanion($id: UUID!) {
    characterCompanionById(id: $id) {
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
`
