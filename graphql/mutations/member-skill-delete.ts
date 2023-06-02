import { gql } from 'graphql-request'

export default gql`
  mutation DeleteMemberSkill($id: UUID!) {
    deleteMemberSkillById(input: { id: $id }) {
      deletedMemberSkillId
    }
  }
`
