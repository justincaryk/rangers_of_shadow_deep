import { gql } from 'graphql-request'

export default gql`
  mutation AddMemberLevel(
    $friendId: UUID
    $characterId: UUID
    $timesGranted: Int
    $timesUsed: Int
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
          timesUsed: $timesUsed
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
        levelGrantByLevelGrantId {
          id
          grantType
          firstLevelGranted
          name
          description
          nodeId
          featuresByLevelGrantId {
            nodes {
              id
              primaryType
              mechanicClass
              mechanicMod
              count
              limitPer
              value
              pickIds
              nodeId
            }
          }
        }
        friendLevelGrantByFriendLevelGrantId {
          nodeId
          id
          description
          ppMilestoneFirst
          ppMilestoneSecond
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
        }
      }
    }
  }
`
