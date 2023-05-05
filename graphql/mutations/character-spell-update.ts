import { gql } from 'graphql-request'

export default gql`
  mutation LearnSpell($characterId: UUID!, $spellId: UUID!, $newTotalKnown: Int!) {
    addAction: createMemberSpell(input: { memberSpell: { characterId: $characterId, spellId: $spellId } }) {
      clientMutationId
    }
    updateCharacter: updateCharacterById(
      input: { characterPatch: { totalHeroicActions: $newTotalKnown }, id: $characterId }
    ) {
      clientMutationId
    }
  }
`
