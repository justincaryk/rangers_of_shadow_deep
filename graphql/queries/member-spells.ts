import { gql } from 'graphql-request'

export default gql`
  query MemberSpells($friendId: UUID, $characterId: UUID) {
    allMemberSpells(condition: { characterId: $characterId, friendId: $friendId }) {
      nodes {
        id
        spellId
        uses
        friendId
        characterId
        spellBySpellId {
          name
          description
        }
      }
    }
  }
`
