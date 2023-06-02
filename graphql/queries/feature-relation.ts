import { gql } from 'graphql-request'

export default gql`
  query FeatureRelationData {
    allInjuries {
      nodes {
        name
        description
        id
        nodeId
      }
    }
    allLevelGrants {
      nodes {
        id
        name
        description
        nodeId
      }
    }
    allFriendLevelGrants {
      nodes {
        id
        description
        nodeId
      }
    }
    allSkills {
      nodes {
        id
        name
        nodeId
      }
    }
    allStats {
      nodes {
        id
        name
        nodeId
      }
    }
    allItems {
      nodes {
        name
        id
        description
        nodeId
      }
    }
    allMercenaries {
      nodes {
        id
        name
        description
        nodeId
      }
    }
  }
`
