import { gql } from 'graphql-request'

export default gql`
  mutation CreateMemberStat($mercenaryId: UUID, $characterId: UUID, $friendId: UUID, $statId: UUID!, $value: Int!) {
    createMemberStat(
      input: {
        memberStat: {
          mercenaryId: $mercenaryId
          characterId: $characterId
          friendId: $friendId
          statId: $statId
          value: $value
        }
      }
    ) {
      memberStat {
        id
        friendId
        characterId
        mercenaryId
        statId
        value
        nodeId
      }
    }
  }
`
