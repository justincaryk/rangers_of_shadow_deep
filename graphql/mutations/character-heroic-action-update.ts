import { gql } from 'graphql-request'

export default gql`
  mutation SetHeroicActionUses($lookupId: UUID!, $characterId: UUID!, $uses: Int!, $newTotalKnown: Int!) {
    setHeroicActionUses: updateMemberHeroicActionById(
      input: { memberHeroicActionPatch: { uses: $uses }, id: $lookupId }
    ) {
      clientMutationId
    }

    updateCharacter: updateCharacterById(
      input: { id: $characterId, characterPatch: { totalHeroicActions: $newTotalKnown } }
    ) {
      clientMutationId
    }
  }
`
