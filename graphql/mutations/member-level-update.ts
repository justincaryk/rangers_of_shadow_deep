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
      }
    }
  }
`
