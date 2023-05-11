import { gql } from 'graphql-request'

export default gql`
  query Friend($id: UUID!) {
    friendById(id: $id) {
      id
      name
      progressionPoints
      mercenaryId
      bonusSkill
      skillByBonusSkill {
        name
        id
      }
    }
  }
`
