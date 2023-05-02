import { gql } from 'graphql-request'

export default gql`
query GetEquipmentSorted {
  mundane: allItems(condition: { rarity: MUNDANE }) {
    nodes {
      id
      name
      class
      description
      entityLimit
      rarity
      slotCost
    }
  }
  magic: allItems(condition: { rarity: MAGIC }) {
    nodes {
      id
      name
      class
      description
      entityLimit
      rarity
      slotCost
    }
  }
}

`
