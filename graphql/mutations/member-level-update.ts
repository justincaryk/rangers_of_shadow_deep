import { gql } from 'graphql-request'

export default gql`
  mutation UpdateMemberLevel($id: UUID!, $timesGranted: Int, $timesUsed: Int) {
    updateMemberLevelById(
      input: { memberLevelPatch: { timesGranted: $timesGranted, timesUsed: $timesUsed }, id: $id }
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
