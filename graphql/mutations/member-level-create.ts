import { gql } from 'graphql-request'

export default gql`
  mutation AddMemberLevel(
    $friendId: UUID
    $characterId: UUID
    $granted: Int
    $levelGrantId: UUID
    $friendLevelGrantId: UUID
  ) {
    createMemberLevel(
      input: {
        memberLevel: {
          characterId: $characterId
          levelGrantId: $levelGrantId
          friendId: $friendId
          granted: $granted
          friendLevelGrantsId: $friendLevelGrantId
        }
      }
    ) {
      clientMutationId
    }
  }
`
