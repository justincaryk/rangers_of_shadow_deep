import { gql } from 'graphql-request'

export default gql`
  query MemberItems($friendId: UUID, $characterId: UUID) {
    allMemberItems(condition: { friendId: $friendId, characterId: $characterId }) {
      nodes {
        id
        characterId
        friendId
        itemId
        itemByItemId {
          name
          description
          class
          rarity
          slotCost
          entityLimit
        }
      }
    }
  }
`
