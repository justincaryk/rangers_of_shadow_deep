import { gql } from 'graphql-request'

export default gql`
  mutation SetHeroicActionUses($lookupId: UUID!, $uses: Int!) {
    setHeroicActionUses: updateMemberHeroicActionById(
      input: { memberHeroicActionPatch: { uses: $uses }, id: $lookupId }
    ) {
      clientMutationId
    }
  }
`
