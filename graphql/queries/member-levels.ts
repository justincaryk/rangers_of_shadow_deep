import { gql } from 'graphql-request'

export default gql`
  query MemberLevels($friendId: UUID, $characterId: UUID) {
    allMemberLevels(condition: { characterId: $characterId, friendId: $friendId }) {
      nodes {
        id
        characterId
        friendId
        friendLevelGrantId
        levelGrantId
        timesGranted
        timesUsed
        nodeId
        friendLevelGrantByFriendLevelGrantId {
          id
          ppMilestoneFirst
          ppMilestoneSecond
          nodeId
          featuresByFriendLevelGrantId {
            nodes {
              id
              primaryType
              mechanicClass
              mechanicMod
              value
              statSubtype
              statId
              pickIds
              nodeId
            }
          }
        }
      }
    }
  }
`
