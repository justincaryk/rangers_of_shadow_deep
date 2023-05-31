import { gql } from 'graphql-request'

export default gql`
  query FriendSummary($id: UUID!) {
    friendById(id: $id) {
      id
      name
      progressionPoints
      mercenaryId
      bonusSkill
      avatarUrl
      nodeId
    }
  }
`
