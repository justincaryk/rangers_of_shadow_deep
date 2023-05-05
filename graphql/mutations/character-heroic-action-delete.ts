import { gql } from 'graphql-request'

export default gql`
  mutation UnlearnHeroicAction($characterId: UUID!, $id: UUID!, $newTotalKnown: Int!) {
    unlearnSpell: deleteMemberHeroicActionById(input: { id: $id }) {
      deletedMemberHeroicActionId
    }

    updateCharacter: updateCharacterById(
      input: { characterPatch: { totalHeroicActions: $newTotalKnown }, id: $characterId }
    ) {
      character {
        id
        nodeId
      }
    }
  }
`
