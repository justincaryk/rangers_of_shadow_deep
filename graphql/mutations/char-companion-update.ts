import { gql } from 'graphql-request'

export default gql`
  mutation UpdateCharCompanion($id: UUID!, $patch: CharacterCompanionPatch!) {
    updateCharacterCompanionById(input: { characterCompanionPatch: $patch, id: $id }) {
      clientMutationId
    }
  }
`
