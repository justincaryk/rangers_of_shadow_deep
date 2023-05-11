import { gql } from 'graphql-request'

export default gql`
  query Features {
    allFeatures {
      nodes {
        id
        injuryId
        itemId
        levelGrantId
        levelGrantType
        mechanicMod
        nodeId
        primaryType
        riderSubtype
        skillId
        statSubtype
        statId
        value
        name
      }
    }
  }
`
