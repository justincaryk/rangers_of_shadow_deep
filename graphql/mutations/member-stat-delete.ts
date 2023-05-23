import { gql } from 'graphql-request'

export default gql`
  mutation DeleteMemberStat($id: UUID!) {
    deleteMemberStatById(input: { id: $id }) {
      deletedMemberStatId
    }
  }
`
