import { gql } from 'graphql-request'

export default gql`
  mutation CreateMemberItem($itemId: UUID!, $characterId: UUID, $friendId: UUID, $mercenaryId: UUID) {
    createMemberItem(
      input: {
        memberItem: { itemId: $itemId, characterId: $characterId, friendId: $friendId, mercenaryId: $mercenaryId }
      }
    ) {
      clientMutationId
    }
  }
`