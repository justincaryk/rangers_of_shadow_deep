import { gql } from 'graphql-request'

export default gql`
  query StatsByCharacterId($id: UUID!) {
    characterById(id: $id) {
      memberStatsByCharacterId {
        nodes {
          id
          characterId
          statsId
          value
          nodeId
        }
      }
    }
  }
`
