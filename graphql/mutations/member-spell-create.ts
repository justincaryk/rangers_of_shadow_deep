import { gql } from 'graphql-request'

export default gql`
  mutation LearnSpell($characterId: UUID, $spellId: UUID!, $friendId: UUID) {
    addAction: createMemberSpell(
      input: { memberSpell: { characterId: $characterId, spellId: $spellId, friendId: $friendId } }
    ) {
      memberSpell {
        id
        spellId
        uses
        friendId
        characterId
        nodeId
        spellBySpellId {
          name
          description
          nodeId
        }
      }
    }
  }
`
