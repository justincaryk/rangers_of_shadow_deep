import { gql } from 'graphql-request'

export default gql`
  query MemberStats($friendId: UUID, $characterId: UUID, $mercenaryId: UUID) {
    allMemberStats(condition: { mercenaryId: $mercenaryId, friendId: $friendId, characterId: $characterId }) {
      nodes {
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
