import { gql } from 'graphql-request'

export default gql`
  mutation UpdateMemberLevel($id: UUID!, $timesGranted: Int, $timesUsed: Int) {
    updateMemberLevelById(
      input: { memberLevelPatch: { timesGranted: $timesGranted, timesUsed: $timesUsed }, id: $id }
    ) {
      clientMutationId
    }
  }
`
