import { gql } from 'graphql-request'

export default gql`
  mutation AddItemToRanger($characterId: UUID!, $itemId: UUID!) {
    createMemberItem(input: { memberItem: { itemId: $itemId, characterId: $characterId } }) {
      clientMutationId
    }
  }
`
