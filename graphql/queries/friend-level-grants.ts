import { gql } from 'graphql-request'

export default gql`
  query FriendLevelRules {
    allFriendLevelGrants {
      nodes {
        id
        description
        ppMilestoneFirst
        ppMilestoneSecond
        featuresByFriendLevelGrantsId {
          nodes {
            id
            mechanicMod
            levelGrantType
            statId
            value
            skillId
          }
        }
      }
    }
  }
`
