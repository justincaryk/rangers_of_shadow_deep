import { gql } from 'graphql-request'

export default gql`
  query Features {
    allFeatures {
      nodes {
        id
        name
        primaryType
        mechanicClass
        mechanicMod
        statSubtype
        riderSubtype
        count
        limitPer
        value
        statId
        skillId
        requiresItemId
        excludesItemId
        featureId
        friendLevelGrantId
        injuryId
        itemId
        levelGrantId
        mercenaryId
        pickIds
        nodeId
      }
    }
  }
`
