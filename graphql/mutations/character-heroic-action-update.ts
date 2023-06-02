import { gql } from 'graphql-request'

export default gql`
  mutation SetHeroicActionUses($lookupId: UUID!, $uses: Int!) {
    setHeroicActionUses: updateMemberHeroicActionById(
      input: { memberHeroicActionPatch: { uses: $uses }, id: $lookupId }
    ) {
      memberHeroicAction {
        id
        characterId
        friendId
        heroicActionId
        uses
        nodeId
        heroicActionByHeroicActionId {
          name
          description
          nodeId
        }
      }
    }
  }
`
