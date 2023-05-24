import { gql } from 'graphql-request'

export default gql`
  mutation CreateMemberStat($mercenaryId: UUID, $statId: UUID!, $value: Int!) {
    createMemberStat(input: { memberStat: { value: $value, mercenaryId: $mercenaryId, statId: $statId } }) {
      clientMutationId
    }
  }
`
