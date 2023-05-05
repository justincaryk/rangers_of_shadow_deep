import { gql } from 'graphql-request'

export default gql`
mutation LearnHeroicAction($characterId: UUID!, $heroicActionId: UUID!, $newTotalKnown: Int) {
  addAction: createMemberHeroicAction(
    input: { memberHeroicAction: { characterId: $characterId, heroicActionId: $heroicActionId } }
  ) {
    clientMutationId
  }
  updateCharacter: updateCharacterById(
    input: { characterPatch: { totalHeroicActions: $newTotalKnown }, id: $characterId }
  ) {
    clientMutationId
  }
}
`
