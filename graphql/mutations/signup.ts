import { gql } from 'graphql-request'

export default gql`
  mutation Signup($username: String!, $password: String!) {
    signup(input: { username: $username, password: $password }) {
      boolean
    }
  }
`
