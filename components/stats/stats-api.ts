import {
  SetBaseStatsMutation,
  SetBaseStatsMutationVariables,
  StatsQuery,
} from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

import GetStatsRequest from '../../graphql/queries/stats'
// import { useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import SetBaseCharacterStats from '../../graphql/mutations/character-stats-base'

export enum STATS_QUERY_KEYS {
  STATS = 'stats',
  RANGER_STATS = 'ranger_stats',
  COMPANION_STATS = 'companion_stats',
}

export function useStatsApi() {
  const { graphQLClient } = useGraphQL()
  // const queryClient = useQueryClient()
  // const params = useParams()

  return {
    createBaseStats: useMutation({
      mutationFn: (data: SetBaseStatsMutationVariables) =>
        graphQLClient.request<SetBaseStatsMutation>(
          SetBaseCharacterStats,
          data
        ),
    }),
    //   createRanger: useMutation({
    //     mutationFn: (data: CreateCharacterMutationVariables) =>
    //       graphQLClient.request<CreateCharacterMutation>(
    //         CreateCharacterRequest,
    //         data
    //       ),
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({
    //         queryKey: [RANGER_QUERY_KEYS.ALL_RANGERS],
    //       })
    //     },
    //   }),
    //   updateRanger: useMutation({
    //     mutationFn: (data: UpdateCharacterMutationVariables) =>
    //       graphQLClient.request<UpdateCharacterMutation>(
    //         UpdateCharacterById,
    //         data
    //       ),
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({ queryKey: [RANGER_QUERY_KEYS.RANGER] })
    //       queryClient.invalidateQueries({
    //         queryKey: [RANGER_QUERY_KEYS.ALL_RANGERS],
    //       })
    //     },
    //   }),
    //   deleteRanger: useMutation({
    //     mutationFn: (data: DeleteCharacterMutationVariables) =>
    //       graphQLClient.request<DeleteCharacterMutation>(
    //         DeleteCharacterRequest,
    //         data
    //       ),
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({
    //         queryKey: [RANGER_QUERY_KEYS.ALL_RANGERS],
    //       })
    //     },
    //   }),
    getStats: useQuery({
      queryKey: [ STATS_QUERY_KEYS.STATS ],
      queryFn: async () => graphQLClient.request<StatsQuery>(GetStatsRequest),
    }),
    //   getRangerById: useQuery({
    //     queryKey: [RANGER_QUERY_KEYS.RANGER],
    //     queryFn: async () =>
    //       graphQLClient.request<CharacterByIdQuery>(GetCharacterByIdRequest, {
    //         id: params?.id,
    //       }),
    //   }),
  }
}
