import useGraphQL from '../graphql/useGraphQL'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import {
  SetBaseStatsMutation,
  SetBaseStatsMutationVariables,
  StatsByCharacterIdQuery,
  StatsQuery,
  UpdateMemberStatByIdMutation,
  UpdateMemberStatByIdMutationVariables,
} from '../../graphql/generated/graphql'

import GetStatsRequest from '../../graphql/queries/stats'
import SetBaseCharacterStats from '../../graphql/mutations/character-stats-base'
import StatsByCharacterIdRequest from '../../graphql/queries/character-stats'
import UpdateMemberStatById from '../../graphql/mutations/character-stats-update'

export enum STATS_QUERY_KEYS {
  STATS = 'stats',
  RANGER_STATS = 'ranger_stats',
  COMPANION_STATS = 'companion_stats',
}

export function useStatsApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()
  const params = useParams()

  return {
    createBaseStats: useMutation({
      mutationFn: (data: SetBaseStatsMutationVariables) =>
        graphQLClient.request<SetBaseStatsMutation>(
          SetBaseCharacterStats,
          data
        ),
    }),
    updateMemberStatById: useMutation({
      mutationFn: (data: UpdateMemberStatByIdMutationVariables) =>
        graphQLClient.request<UpdateMemberStatByIdMutation>(
          UpdateMemberStatById,
          data
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ STATS_QUERY_KEYS.RANGER_STATS ],
        })
        queryClient.invalidateQueries({
          queryKey: [ STATS_QUERY_KEYS.COMPANION_STATS ],
        })
      },
    }),
    getStatsByRangerId: useQuery({
      queryKey: [ STATS_QUERY_KEYS.RANGER_STATS ],
      queryFn: async () => {
        return params?.id
          ? graphQLClient.request<StatsByCharacterIdQuery>(
              StatsByCharacterIdRequest,
              {
                id: params?.id,
              }
            )
          : null
      },
    }),
    getStats: useQuery({
      queryKey: [ STATS_QUERY_KEYS.STATS ],
      queryFn: async () => graphQLClient.request<StatsQuery>(GetStatsRequest),
    }),
  }
}
