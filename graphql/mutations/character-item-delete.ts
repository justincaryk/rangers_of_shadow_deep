import { gql } from 'graphql-request'

export default gql`
  mutation DeleteRangerItem($id: UUID!) {
    deleteMemberItemById(input: { id: $id }) {
      deletedMemberItemId
    }
  }
`
