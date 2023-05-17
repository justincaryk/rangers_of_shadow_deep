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
    clientMutationId
  }
}
`
