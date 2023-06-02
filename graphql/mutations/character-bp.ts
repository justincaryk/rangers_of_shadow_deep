import { gql } from 'graphql-request'

export default gql`
  mutation UpdateBpSpent($heroic: Int, $rp: Int, $skills: Int, $stats: Int, $lookupId: UUID!) {
    updateCharacterBpLookupById(
      input: {
        characterBpLookupPatch: {
          bpSpentOnHeroicAbilities: $heroic
          bpSpentOnRp: $rp
          bpSpentOnSkills: $skills
          bpSpentOnStats: $stats
        }
        id: $lookupId
      }
    ) {
      clientMutationId
    }
  }
`
