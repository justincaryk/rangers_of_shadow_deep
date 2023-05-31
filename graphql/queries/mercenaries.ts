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
        nodeId
        memberItemsByMercenaryId {
          nodes {
            id
            itemId
            nodeId
            itemByItemId {
              name
              description
              nodeId
            }
          }
        }
        memberSkillsByMercenaryId {
          nodes {
            id
            skillId
            value
            nodeId
            skillBySkillId {
              name
              nodeId
            }
          }
        }
        memberStatsByMercenaryId {
          nodes {
            id
            statId
            value
            nodeId
            statByStatId {
              name
              nodeId
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
            nodeId
          }
        }
      }
    }
  }
`
