import { gql } from 'graphql-request'

export default gql`
  mutation UpdateFeatureRefsById(
    $id: UUID!
    $injuryId: UUID
    $skillId: UUID
    $statId: UUID
    $levelGrantId: UUID
  ) {
    updateFeatureById(
      input: {
        featurePatch: { injuryId: $injuryId, levelGrantId: $levelGrantId, skillId: $skillId, statId: $statId }
        id: $id
      }
    ) {
      clientMutationId
    }
  }
`
