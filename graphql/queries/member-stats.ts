import { gql } from 'graphql-request'

export default gql`
  query MemberStats($friendId: UUID, $characterId: UUID) {
    allMemberStats(condition: { mercenaryId: "", friendId: "" }) {
      nodes {
        id
        characterId
        friendId
        statId
        value
        statByStatId {
          name
          rangerDefault
          statType
          hardCap
        }
      }
    }
  }
`
