import { gql } from 'graphql-request'

export default gql`
  query Features {
    allFeatures {
      nodes {
        id
        name
        levelGrantType
        mechanicMod
        primaryType
        statSubtype
        riderSubtype
        injuryId
        itemId
        levelGrantId
        friendLevelGrantId
        skillId
        statId
        value
        nodeId
      }
    }
  }
`
