import useGraphQL from '../graphql/useGraphQL'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  CreateMemberStatMutation,
  CreateMemberStatMutationVariables,
  DeleteMemberSkillMutation,
  DeleteMemberStatMutationVariables,
  StatsQuery,
  UpdateMemberStatByIdMutation,
  UpdateMemberStatByIdMutationVariables,
} from '../../graphql/generated/graphql'

import GetStatsRequest from '../../graphql/queries/stats'
import UpdateMemberStatById from '../../graphql/mutations/character-stats-update'
import CreateMemberStatRequest from '../../graphql/mutations/member-stat-create'
import DeleteMemberStatRequest from '../../graphql/mutations/member-stat-delete'

import { RANGER_QUERY_KEYS } from '../ranger/ranger-api'
import { COMPANION_QUERY_KEYS } from '../companions/companions-api'

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
    createMemberStat: useMutation({
      mutationFn: (data: CreateMemberStatMutationVariables) =>
        graphQLClient.request<CreateMemberStatMutation>(CreateMemberStatRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ COMPANION_QUERY_KEYS.MERCENARIES ],
        })
      },
    }),
    deleteMemberStat: useMutation({
      mutationFn: (data: DeleteMemberStatMutationVariables) =>
        graphQLClient.request<DeleteMemberSkillMutation>(DeleteMemberStatRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ COMPANION_QUERY_KEYS.MERCENARIES ],
        })
      },
    }),
  }
}
