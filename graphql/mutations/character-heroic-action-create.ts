import { gql } from 'graphql-request'

export default gql`
  mutation LearnHeroicAction($characterId: UUID!, $heroicActionId: UUID!) {
    addAction: createMemberHeroicAction(
      input: { memberHeroicAction: { characterId: $characterId, heroicActionId: $heroicActionId } }
    ) {
      memberHeroicAction {
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
