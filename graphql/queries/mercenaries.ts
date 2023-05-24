import { gql } from 'graphql-request'

export default gql`
  query Mercenaries {
    allMercenaries(orderBy: NAME_ASC) {
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
        featuresByMercenaryId(condition: { primaryType: MERCENARY }) {
          nodes {
            primaryType
            mechanicClass
            mechanicMod
            pickIds
            value
          }
        }
      }
    }
  }
`
