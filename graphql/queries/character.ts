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
          characterId
          itemId
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
          bpSpentOnHeroicActions
          nodeId
          characterId
        }
      }
      memberLevelsByCharacterId {
        nodes {
          id
          timesGranted
          timesUsed
          levelGrantByLevelGrantId {
            id
            grantType
            name
            description
            featuresByLevelGrantId {
              nodes {
                id
                levelGrantType
                mechanicMod
                skillId
                statId
                statSubtype
                value
              }
            }
          }
        }
      }
    }
  }
`
