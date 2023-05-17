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
        description
      }
      mercenaryByMercenaryId {
        id
        description
        cost
        name
        subtype
        notes
        move
        fight
        shoot
        armor
        will
      }
      memberLevelsByFriendId {
        totalCount
        nodes {
          id
          friendId
          friendLevelGrantId
          levelGrantId
          timesGranted
          timesUsed
        }
      }
    }
  }
`
