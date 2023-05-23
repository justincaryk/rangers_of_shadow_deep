import { gql } from 'graphql-request'

export default gql`
  query RangerLevelingRules {
    levelCosts: allRangerLevelCosts(orderBy: LEVEL_MIN_ASC) {
      nodes {
        id
        cost
        levelMin
        levelMax
      }
    }
    levelGrants: allLevelGrants(orderBy: FIRST_LEVEL_GRANTED_ASC) {
      nodes {
        id
        name
        description
        grantType
        firstLevelGranted
        nodeId
        featuresByLevelGrantId {
          nodes {
            id
            mechanicMod
            primaryType
            value
            mechanicClass
            pickIds
          }
        }
      }
    }
  }
`
