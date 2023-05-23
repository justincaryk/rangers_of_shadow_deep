import { gql } from 'graphql-request'

export default gql`
  query Mercenaries {
    allMercenaries {
      nodes {
        id
        name
        subtype
        description
        notes
        cost
        armor
        fight
        health
        move
        shoot
        will
        memberItemsByMercenaryId {
          nodes {
            id
            itemId
            itemByItemId {
              name
              description
            }
          }
        }
        memberSkillsByMercenaryId {
          nodes {
            id
            skillId
            value
            skillBySkillId {
              name
            }
          }
        }
        memberStatsByMercenaryId {
          nodes {
            id
            statId
            value
            statByStatId {
              name
            }
          }
        }
      }
    }
  }
`
