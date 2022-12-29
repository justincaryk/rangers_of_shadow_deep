import { gql } from 'graphql-request'

export default gql`
  mutation Signin($username: String!, $password: String!) {
    signin(input: { password: $password, username: $username }) {
      jwtToken
    }
  }
`
