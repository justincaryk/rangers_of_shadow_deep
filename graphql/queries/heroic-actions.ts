import { gql } from 'graphql-request'

export default gql`
  query HeroicActions {
    allHeroicActions {
      nodes {
        cost
        description
        id
        name
        nodeId
      }
    }
  }
`
