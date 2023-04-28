import { gql } from 'graphql-request'

export default gql`
  query AllItems {
    allItems {
        nodes {
          class
          description
          entityLimit
          id
          name
          rarity
          slotCost
        }
      }
  }
`
