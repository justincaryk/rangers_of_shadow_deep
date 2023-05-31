import { gql } from 'graphql-request'

export default gql`
  query FriendFull($id: UUID!) {
    friendById(id: $id) {
      id
      name
      progressionPoints
      mercenaryId
      bonusSkill
      nodeId
      skillByBonusSkill {
        nodeId
        name
        id
        description
      }
      mercenaryByMercenaryId {
        id
        nodeId
        description
        cost
        name
        subtype
        notes
        move
        fight
        shoot
        armor
        will
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
        memberItemsByMercenaryId {
          nodes {
            id
            itemId
            nodeId
            itemByItemId {
              nodeId
              name
              description
            }
          }
        }
        memberSkillsByMercenaryId {
          nodes {
            nodeId
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
            nodeId
            id
            statId
            value
            statByStatId {
              name
            }
          }
        }
      }
      memberLevelsByFriendId {
        totalCount
        nodes {
          nodeId
          id
          friendId
          friendLevelGrantId
          levelGrantId
          timesGranted
          timesUsed
        }
      }
      memberItemsByFriendId {
        nodes {
          nodeId
          id
          itemId
          itemByItemId {
            nodeId
            description
            name
          }
        }
      }
      memberHeroicActionsByFriendId {
        nodes {
          heroicActionId
          id
          uses
          nodeId
        }
        totalCount
      }
      memberStatsByFriendId {
        nodes {
          id
          statId
          value
          nodeId
        }
      }
      memberSkillsByFriendId {
        nodes {
          skillId
          value
          id
          nodeId
        }
      }
      memberSpellsByFriendId {
        nodes {
          id
          spellId
          uses
          nodeId
        }
        totalCount
      }
    }
  }
`
