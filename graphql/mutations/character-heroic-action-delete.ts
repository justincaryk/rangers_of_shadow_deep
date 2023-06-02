import { gql } from 'graphql-request'

export default gql`
  mutation UnlearnHeroicAction($id: UUID!) {
    deleteMemberHeroicActionById(input: { id: $id }) {
      deletedMemberHeroicActionId
    }
  }
`
