import { gql } from 'graphql-request'

export default gql`
  query Friends {
    allFriends {
      nodes {
        id
        name
        progressionPoints
        mercenaryId
        nodeId
      }
    }
  }
`
