import { gql } from 'graphql-request'

export default gql`
  mutation UnlearnSpell($id: UUID!) {
    unlearnSpell: deleteMemberSpellById(input: { id: $id }) {
      deletedMemberSpellId
      memberSpell {
        characterId
        friendId
      }
    }
  }
`
