import useGraphQL from '../../graphql/useGraphQL'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { RangerLevelingRulesQuery } from '../../../graphql/generated/graphql'

import RangerLevelingRulesRequest from '../../../graphql/queries/character-level-grants'

enum STATS_QUERY_KEYS {
  STATS = 'stats',
  RANGER_STATS = 'ranger_stats',
  COMPANION_STATS = 'companion_stats',
}

enum RANGER_LEVEL_RULES {
  RULES_GET = 'rules_get',
}

export function useLevelingApi() {
  const { graphQLClient } = useGraphQL()

  return {
    rangerRules: useQuery({
      queryKey: [ RANGER_LEVEL_RULES.RULES_GET ],
      queryFn: async () => graphQLClient.request<RangerLevelingRulesQuery>(RangerLevelingRulesRequest),
    }),
  }
}
