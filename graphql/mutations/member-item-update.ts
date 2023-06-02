import { gql } from 'graphql-request'

export default gql`
  mutation UpdateMemberItem($id: UUID!, $itemId: UUID!) {
    updateMemberItemById(input: { memberItemPatch: { itemId: $itemId }, id: $id }) {
      memberItem {
        id
        friendId
        characterId
        itemId
        nodeId
      }
    }
  }
`
