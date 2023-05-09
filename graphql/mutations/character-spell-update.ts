import { gql } from 'graphql-request'

export default gql`
  mutation SetSpellUses($lookupId: UUID!, $characterId: UUID!, $uses: Int!, $newTotalKnown: Int!) {
    setSpellUses: updateMemberSpellById(input: { memberSpellPatch: { uses: $uses }, id: $lookupId }) {
      clientMutationId
    }

    updateCharacter: updateCharacterById(
      input: { characterPatch: { totalHeroicActions: $newTotalKnown }, id: $characterId }
    ) {
      clientMutationId
    }
  }
`
