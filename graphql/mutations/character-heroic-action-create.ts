import { gql } from 'graphql-request'

export default gql`
  mutation LearnHeroicAction($characterId: UUID!, $heroicActionId: UUID!) {
    addAction: createMemberHeroicAction(
      input: { memberHeroicAction: { characterId: $characterId, heroicActionId: $heroicActionId } }
    ) {
      clientMutationId
    }
  }
`
