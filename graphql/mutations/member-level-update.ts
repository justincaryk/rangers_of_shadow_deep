import { gql } from 'graphql-request'

export default gql`
  mutation UpdateMemberLevel($id: UUID!, $granted: Int) {
    updateMemberLevelById(input: { memberLevelPatch: { granted: $granted }, id: $id }) {
      clientMutationId
    }
  }
`
