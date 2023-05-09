import useGraphQL from '../graphql/useGraphQL'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  StatsQuery,
  UpdateMemberStatByIdMutation,
  UpdateMemberStatByIdMutationVariables,
} from '../../graphql/generated/graphql'

import GetStatsRequest from '../../graphql/queries/stats'
import UpdateMemberStatById from '../../graphql/mutations/character-stats-update'
import { RANGER_QUERY_KEYS } from '../ranger/ranger-api'

export enum STATS_QUERY_KEYS {
  STATS = 'stats',
  RANGER_STATS = 'ranger_stats',
  COMPANION_STATS = 'companion_stats',
}

export function useStatsApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()

  return {
    updateMemberStatById: useMutation({
      mutationFn: (data: UpdateMemberStatByIdMutationVariables) =>
        graphQLClient.request<UpdateMemberStatByIdMutation>(UpdateMemberStatById, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ STATS_QUERY_KEYS.RANGER_STATS ],
        })
        queryClient.invalidateQueries({
          queryKey: [ STATS_QUERY_KEYS.COMPANION_STATS ],
        })
        queryClient.invalidateQueries({
          queryKey: [ RANGER_QUERY_KEYS.RANGER ],
        })
      },
    }),
    getStats: useQuery({
      queryKey: [ STATS_QUERY_KEYS.STATS ],
      queryFn: async () => graphQLClient.request<StatsQuery>(GetStatsRequest),
    }),
  }
}
