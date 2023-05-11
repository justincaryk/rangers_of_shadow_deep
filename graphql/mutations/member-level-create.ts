import { gql } from 'graphql-request'

export default gql`
  mutation AddMemberLevel(
    $companionId: UUID
    $characterId: UUID
    $granted: Int
    $levelGrantId: UUID
    $companionLevelingId: UUID
  ) {
    createMemberLevel(
      input: {
        memberLevel: {
          characterId: $characterId
          levelGrantId: $levelGrantId
          companionId: $companionId
          granted: $granted
          companionLevelingId: $companionLevelingId
        }
      }
    ) {
      clientMutationId
    }
  }
`
