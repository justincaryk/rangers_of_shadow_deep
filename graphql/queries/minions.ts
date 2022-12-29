import { gql } from 'graphql-request'

export default gql`
  query MyQuery {
    allMinions {
      nodes {
        id
        userName
      }
    }
  }
`
