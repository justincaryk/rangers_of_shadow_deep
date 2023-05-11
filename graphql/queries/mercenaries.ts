import { gql } from 'graphql-request'

export default gql`
  query Mercenaries {
    allMercenaries {
      nodes {
        id
        name
        subtype
        description
        cost
        armor
        fight
        health
        move
        shoot
        will
      }
    }
  }
`
