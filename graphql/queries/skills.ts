import { gql } from 'graphql-request'

export default gql`
  query Skills {
    allSkills {
      nodes {
        id
        name
        description
        cost
        nodeId
      }
    }
  }
`
