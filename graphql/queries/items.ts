import { gql } from 'graphql-request'

export default gql`
  query GetEquipment {
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
