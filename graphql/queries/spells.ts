import { gql } from 'graphql-request'

export default gql`
  query Spells {
    allSpells(orderBy: NAME_ASC) {
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
