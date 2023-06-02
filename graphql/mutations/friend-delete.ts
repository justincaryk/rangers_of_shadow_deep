import { gql } from 'graphql-request'

export default gql`
  mutation DeleteFriend($id: UUID!) {
    deleteFriendById(input: { id: $id }) {
      clientMutationId
    }
  }
`
