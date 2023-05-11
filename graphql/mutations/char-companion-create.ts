import { gql } from 'graphql-request'

export default gql`
  mutation CreateCharacterCompanion($name: String!) {
    createCharacterCompanion(input: { characterCompanion: { name: $name } }) {
      characterCompanion {
        id
      }
    }
  }
`
