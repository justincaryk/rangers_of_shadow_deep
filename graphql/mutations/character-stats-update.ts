import { gql } from 'graphql-request'

export default gql`
  mutation UpdateMemberStatById($id: UUID!, $value: Int!) {
    updateMemberStatById(input: { memberStatPatch: { value: $value }, id: $id }) {
      memberStat {
        id
        characterId
        friendId
        statId
        value
        nodeId
        statByStatId {
          name
          rangerDefault
          statType
          hardCap
          nodeId
        }
      }
    }
  }
`
