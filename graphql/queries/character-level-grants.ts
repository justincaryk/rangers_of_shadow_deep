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
    levelGrants: allLevelGrants(orderBy: NATURAL) {
      nodes {
        id
        name
        description
        entityLimit
        grantType
        firstLevelGranted
        benefit
        nodeId
      }
    }
  }
`
