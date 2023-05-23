import { gql } from 'graphql-request'

export default gql`
  query FriendLevelRules {
    allFriendLevelGrants {
      nodes {
        id
        description
        ppMilestoneFirst
        ppMilestoneSecond
        featuresByFriendLevelGrantId {
          nodes {
            id
            mechanicClass
            mechanicMod
            value
            statId
            skillId
            pickIds
          }
        }
      }
    }
  }
`
