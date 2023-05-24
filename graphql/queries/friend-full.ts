import { gql } from 'graphql-request'

export default gql`
  query FriendFull($id: UUID!) {
    friendById(id: $id) {
      id
      name
      progressionPoints
      mercenaryId
      bonusSkill
      skillByBonusSkill {
        name
        id
        description
      }
      mercenaryByMercenaryId {
        id
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
          }
        }
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
      memberLevelsByFriendId {
        totalCount
        nodes {
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
          id
          itemId
          itemByItemId {
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
        }
        totalCount
      }
      memberStatsByFriendId {
        nodes {
          id
          statId
          value
        }
      }
      memberSkillsByFriendId {
        nodes {
          skillId
          value
          id
        }
      }
      memberSpellsByFriendId {
        nodes {
          id
          spellId
          uses
        }
        totalCount
      }
    }
  }
`
