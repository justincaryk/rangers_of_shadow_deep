import { gql } from 'graphql-request'

export default gql`
  mutation UnlearnSpell($characterId: UUID!, $id: UUID!, $newTotalKnown: Int!) {
    unlearnSpell: deleteMemberSpellById(input: { id: $id }) {
      deletedMemberSpellId
    }

    updateCharacter: updateCharacterById(
      input: { characterPatch: { totalHeroicActions: $newTotalKnown }, id: $characterId }
    ) {
      character {
        id
      }
    }
  }
`
