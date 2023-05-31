import { gql } from 'graphql-request'

export default gql`
  mutation AddMemberLevel(
    $friendId: UUID
    $characterId: UUID
    $timesGranted: Int
    $levelGrantId: UUID
    $friendLevelGrantId: UUID
  ) {
    createMemberLevel(
      input: {
        memberLevel: {
          characterId: $characterId
          levelGrantId: $levelGrantId
          friendId: $friendId
          timesGranted: $timesGranted
          friendLevelGrantId: $friendLevelGrantId
        }
      }
    ) {
      memberLevel {
        id
        characterId
        friendId
        friendLevelGrantId
        levelGrantId
        timesGranted
        timesUsed
        nodeId
        friendLevelGrantByFriendLevelGrantId {
          nodeId
          id
          featuresByFriendLevelGrantId {
            nodes {
              id
              primaryType
              mechanicClass
              mechanicMod
              pickIds
              statSubtype
              statId
              skillId
              count
              limitPer
              value
              nodeId
            }
          }
          ppMilestoneFirst
          ppMilestoneSecond
        }
      }
    }
  }
`
