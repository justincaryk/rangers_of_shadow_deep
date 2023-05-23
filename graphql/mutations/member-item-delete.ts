import { gql } from 'graphql-request'

export default gql`
  mutation DeleteMemberItem($id: UUID!) {
    deleteMemberItemById(input: { id: $id }) {
      deletedMemberItemId
    }
  }
`
