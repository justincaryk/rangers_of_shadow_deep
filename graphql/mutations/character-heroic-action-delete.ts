import { gql } from 'graphql-request'

export default gql`
  mutation UnlearnHeroicAction($characterId: UUID!, $id: UUID!) {
    unlearnSpell: deleteMemberHeroicActionById(input: { id: $id }) {
      deletedMemberHeroicActionId
    }
  }
`
