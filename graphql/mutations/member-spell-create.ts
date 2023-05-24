import { gql } from 'graphql-request'

export default gql`
  mutation LearnSpell($characterId: UUID, $spellId: UUID!, $friendId: UUID) {
    addAction: createMemberSpell(
      input: { memberSpell: { characterId: $characterId, spellId: $spellId, friendId: $friendId } }
    ) {
      clientMutationId
    }
  }
`
