import { gql } from 'graphql-request'

export default gql`
  query MemberSkills($friendId: UUID, $characterId: UUID) {
    allMemberSkills(condition: { characterId: $characterId, friendId: $friendId }) {
      nodes {
        id
        characterId
        friendId
        skillId
        value
        nodeId
        skillBySkillId {
          name
          description
          nodeId
        }
      }
    }
  }
`
