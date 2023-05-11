import { gql } from 'graphql-request'

export default gql`
  mutation UpdateFeatureRefsById($id: UUID!, $patch: FeaturePatch!) {
    updateFeatureById(input: { featurePatch: $patch, id: $id }) {
      clientMutationId
    }
  }
`
