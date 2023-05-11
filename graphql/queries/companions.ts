import { gql } from 'graphql-request'

export default gql`
  query Companions {
    allCompanions {
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
