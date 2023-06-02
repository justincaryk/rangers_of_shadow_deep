import { gql } from 'graphql-request'

export default gql`
  query FriendSummary($id: UUID!) {
    friendById(id: $id) {
      id
      name
      progressionPoints
      mercenaryId
      avatarUrl
      nodeId
      mercenaryByMercenaryId {
        id
        name
        move
        fight
        shoot
        armor
        will
        health
        nodeId
      }
    }
  }
`
