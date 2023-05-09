import { gql } from 'graphql-request'

export default gql`
  mutation LearnSpell($characterId: UUID!, $spellId: UUID!) {
    addAction: createMemberSpell(input: { memberSpell: { characterId: $characterId, spellId: $spellId } }) {
      clientMutationId
    }
  }
`
