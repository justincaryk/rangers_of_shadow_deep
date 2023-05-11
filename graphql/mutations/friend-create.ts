import { gql } from 'graphql-request'

export default gql`
  mutation CreateFriend($name: String! $userId: UUID!) {
    createFriend(input: { friend: { name: $name, userId: $userId } }) {
      friend {
        id
      }
    }
  }
`
