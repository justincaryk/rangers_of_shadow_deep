import { gql } from 'graphql-request'

export default gql`
  query FeatureRelationData {
    allInjuries {
      nodes {
        name
        description
        id
      }
    }
    allLevelGrants {
      nodes {
        id
        name
        description
      }
    }
    allCompanionLevelings {
      nodes {
        id
        description
      }
    }
    allSkills {
      nodes {
        id
        name
      }
    }
    allStats {
      nodes {
        id
        name
      }
    }
    allItems {
      nodes {
        name
        id
        description
      }
    }
  }
`
