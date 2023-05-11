import { gql } from 'graphql-request'

export default gql`
  mutation DeleteCharCompanion($id: UUID!) {
    deleteCharacterCompanionById(input: { id: $id }) {
      clientMutationId
    }
  }
`
