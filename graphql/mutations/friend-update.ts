import { gql } from 'graphql-request'

export default gql`
  mutation UpdateFriend($id: UUID!, $patch: FriendPatch!) {
    updateFriendById(input: { id: $id, friendPatch: $patch }) {
      clientMutationId
    }
  }
`
