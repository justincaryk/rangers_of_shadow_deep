import { gql } from 'graphql-request'

export default gql`
  query RangerLevelingRules {
    allLevelGrants {
      nodes {
        id
        name
        description
        entityLimit
        grantType
        benefit
        nodeId
      }
    }
  }
`
