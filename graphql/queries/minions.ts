import { gql } from 'graphql-request'

export default gql`
  query AllMinions {
    allMinions {
      nodes {
        id
        userName
        nodeId
      }
    }
  }
`
