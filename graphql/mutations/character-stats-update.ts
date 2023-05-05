import { gql } from 'graphql-request'

export default gql`
  mutation UpdateMemberStatById($id: UUID!, $value: Int!) {
    updateMemberStatById(
      input: { memberStatPatch: { value: $value }, id: $id }
    ) {
      clientMutationId
    }
  }
`
