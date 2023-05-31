import { gql } from 'graphql-request'

export default gql`
  mutation UpdateMemberSkill($id: UUID!, $value: Int!) {
    updateMemberSkillById(input: { memberSkillPatch: { value: $value }, id: $id }) {
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
