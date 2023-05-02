import { gql } from 'graphql-request'

export default gql`
  mutation DeleteCharacter($id: UUID!) {
    deleteCharacterById(input: { id: $id }) {
      deletedCharacterId
    }
  }
`
