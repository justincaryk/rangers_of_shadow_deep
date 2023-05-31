import { gql } from 'graphql-request'

export default gql`
  mutation CreateMemberSkill($skillId: UUID!, $value: Int!, $characterId: UUID, $friendId: UUID, $mercenaryId: UUID) {
    createMemberSkill(
      input: {
        memberSkill: {
          skillId: $skillId
          mercenaryId: $mercenaryId
          friendId: $friendId
          characterId: $characterId
          value: $value
        }
      }
    ) {
      memberSkill {
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
