import { gql } from 'graphql-request'

export default gql`
  mutation CreateCharacter($name: String!, $userId: UUID!) {
    createCharacter(input: { character: { name: $name, userId: $userId } }) {
      character {
        id
      }
    }
  }
`
