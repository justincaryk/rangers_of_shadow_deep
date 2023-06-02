import { gql } from 'graphql-request'

export default gql`
query MemberLevels($friendId: UUID, $characterId: UUID) {
  allMemberLevels(condition: {characterId: $characterId, friendId: $friendId}) {
    nodes {
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
        id
        description
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
