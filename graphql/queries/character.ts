import { gql } from 'graphql-request'

export default gql`
  query CharacterById($id: UUID!) {
    characterById(id: $id) {
      avatarUrl
      id
      level
      name
      xp
      userId
      totalHeroicActions
      totalSkillPoints
      totalStatPoints
      totalRecruitmentPoints
      nodeId
      memberHeroicActionsByCharacterId {
        nodes {
          __typename
          id
          heroicActionId
          characterId
          uses
          nodeId
        }
        totalCount
      }
      memberItemsByCharacterId {
        nodes {
          __typename
          id
          itemId
          itemByItemId {
            id
            name
            description
            entityLimit
            slotCost
            featuresByItemId {
              nodes {
                id
                primaryType
                riderSubtype
                statId
                value
                mechanicMod
                nodeId
              }
            }
            nodeId
          }
          nodeId
        }
        totalCount
      }
      memberStatsByCharacterId {
        nodes {
          __typename
          id
          characterId
          value
          statId
          nodeId
        }
        totalCount
      }
      memberSpellsByCharacterId {
        nodes {
          __typename
          id
          characterId
          spellId
          uses
          nodeId
        }
        totalCount
      }
      memberSkillsByCharacterId {
        nodes {
          __typename
          id
          skillId
          characterId
          value
          nodeId
        }
        totalCount
      }
      characterBpLookupsByCharacterId {
        nodes {
          id
          bpSpentOnStats
          bpSpentOnSkills
          bpSpentOnRp
          bpSpentOnHeroicAbilities
          nodeId
          characterId
        }
      }
      memberLevelsByCharacterId {
        nodes {
          id
          timesGranted
          timesUsed
          levelGrantId
          levelGrantByLevelGrantId {
            id
            grantType
            name
            description
            nodeId
          }
          nodeId
        }
        totalCount
      }
    }
  }
`
