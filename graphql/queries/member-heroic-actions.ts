import { gql } from 'graphql-request'

export default gql`
  query MemberHeroicActions($friendId: UUID, $characterId: UUID) {
    allMemberHeroicActions(condition: { characterId: $characterId, friendId: $friendId }) {
      nodes {
        id
        characterId
        friendId
        heroicActionId
        uses
        heroicActionByHeroicActionId {
          name
          description
        }
      }
    }
  }
`
