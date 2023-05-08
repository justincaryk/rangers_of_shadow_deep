import { gql } from 'graphql-request'

export default gql`
  query Skills {
    allSkills(orderBy: NAME_ASC) {
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
