import { gql } from 'graphql-request'

export default gql`
  mutation HydrateRanger($characterId: UUID!) {
    hydrateRanger(input: { arg0: $characterId }) {
      clientMutationId
    }
  }
`
