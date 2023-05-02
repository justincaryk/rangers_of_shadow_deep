import { gql } from 'graphql-request'

export default gql`
  mutation SetBaseStats(
    $shoot: MemberStatInput!
    $move: MemberStatInput!
    $health: MemberStatInput!
    $armor: MemberStatInput!
    $will: MemberStatInput!
    $fight: MemberStatInput!
  ) {
    shoot: createMemberStat(input: { memberStat: $shoot }) {
      memberStat {
        id
      }
    }
    move: createMemberStat(input: { memberStat: $move }) {
      memberStat {
        id
      }
    }
    health: createMemberStat(input: { memberStat: $health }) {
      memberStat {
        id
      }
    }
    armor: createMemberStat(input: { memberStat: $armor }) {
      memberStat {
        id
      }
    }
    will: createMemberStat(input: { memberStat: $will }) {
      memberStat {
        id
      }
    }
    fight: createMemberStat(input: { memberStat: $fight }) {
      memberStat {
        id
      }
    }
  }
`
