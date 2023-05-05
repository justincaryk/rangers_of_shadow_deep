import { gql } from 'graphql-request'

export default gql`
  query Spells {
    allSpells {
      nodes {
        id
        cost
        description
        name
        nodeId
      }
    }
  }
`
