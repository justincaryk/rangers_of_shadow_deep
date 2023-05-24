import { gql } from 'graphql-request'

export default gql`
  mutation SetSpellUses($lookupId: UUID!, $uses: Int!) {
    setSpellUses: updateMemberSpellById(input: { memberSpellPatch: { uses: $uses }, id: $lookupId }) {
      memberSpell {
        characterId
        friendId
        id
      }
    }
  }
`
