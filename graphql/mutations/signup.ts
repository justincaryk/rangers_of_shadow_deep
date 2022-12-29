import { gql } from 'graphql-request'

export default gql`
  mutation SignUp($username: String!, $password: String!) {
    signup(input: { username: $username, password: $password }) {
      boolean
    }
  }
`
