import { gql } from 'graphql-request'

export default gql`
  query RangerLeadershipSkill($characterId: UUID!) {
    allSkills(condition: { name: "leadership" }) {
      nodes {
        id
        name
        memberSkillsBySkillId(condition: { characterId: $characterId }) {
          nodes {
            id
            value
            nodeId
          }
        }
        nodeId
      }
    }
  }
`
