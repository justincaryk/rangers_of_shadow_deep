import { gql } from 'graphql-request'

export default gql`
  mutation UpdateCharacter($id: UUID!, $patch: CharacterPatch!) {
    updateCharacterById(input: { characterPatch: $patch, id: $id }) {
      character {
        id
      }
    }
  }
`
