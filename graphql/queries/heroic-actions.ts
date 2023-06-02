import { gql } from 'graphql-request'

export default gql`
  query HeroicActions {
    allHeroicActions(orderBy: NAME_ASC) {
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
