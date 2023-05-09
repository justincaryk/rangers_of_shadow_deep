import { gql } from 'graphql-request'

export default gql`
  query Stats {
    allStats {
      nodes {
        id
        name
        statType
        rangerDefault
        hardCap
        nodeId
      }
    }
  }
`
