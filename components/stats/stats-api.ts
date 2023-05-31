import useGraphQL from '../graphql/useGraphQL'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCurrentMember } from '../react-query/hooks'

import {
  CreateMemberStatMutation,
  CreateMemberStatMutationVariables,
  DeleteMemberSkillMutation,
  DeleteMemberStatMutationVariables,
  MemberStatsQuery,
  StatsQuery,
  UpdateMemberStatByIdMutation,
  UpdateMemberStatByIdMutationVariables,
} from '../../graphql/generated/graphql'

import GetStatsRequest from '../../graphql/queries/stats'
import GetMemberStatsRequest from '../../graphql/queries/member-stats'
import UpdateMemberStatById from '../../graphql/mutations/character-stats-update'
import CreateMemberStatRequest from '../../graphql/mutations/member-stat-create'
import DeleteMemberStatRequest from '../../graphql/mutations/member-stat-delete'

import { COMPANION_QUERY_KEYS } from '../companions/companions-api'
import { staticQueryConfig } from '../react-query/defaults'

export enum STATS_QUERY_KEYS {
  STATS = 'stats',
  MEMBER_STATS = 'member_stats',
}

export function useStatsApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()
  const { id, referenceColumnName } = useCurrentMember()

  const getQueryContextOnMutate = () => {
    const prev = queryClient.getQueryData([ STATS_QUERY_KEYS.MEMBER_STATS ]) as MemberStatsQuery
    return { old: prev?.allMemberStats?.nodes || [] }
  }

  return {
    getStats: useQuery({
      queryKey: [ STATS_QUERY_KEYS.STATS ],
      queryFn: async () => graphQLClient.request<StatsQuery>(GetStatsRequest),
      ...staticQueryConfig,
    }),
    getMemberStats: useQuery({
      queryKey: [ STATS_QUERY_KEYS.MEMBER_STATS ],
      queryFn: async () => {
        return id && referenceColumnName
          ? graphQLClient.request<MemberStatsQuery>(GetMemberStatsRequest, {
              [referenceColumnName]: id,
            })
          : null
      },
    }),
    createMemberStat: useMutation({
      mutationFn: (data: CreateMemberStatMutationVariables) =>
        graphQLClient.request<CreateMemberStatMutation>(CreateMemberStatRequest, data),
      onMutate: getQueryContextOnMutate,
      onSuccess: (data, variables, context) => {
        if (variables.friendId) {
          if (context?.old && data.createMemberStat?.memberStat?.id) {
            const updated: MemberStatsQuery = {
              allMemberStats: {
                nodes: [ ...context.old, data.createMemberStat.memberStat ],
              },
            }

            queryClient.setQueryData([ STATS_QUERY_KEYS.MEMBER_STATS ], updated)
          }
        }
        if (variables.characterId) {
          queryClient.invalidateQueries({
            queryKey: [ STATS_QUERY_KEYS.MEMBER_STATS ],
          })
        }
      },
    }),
    updateMemberStatById: useMutation({
      mutationFn: (data: UpdateMemberStatByIdMutationVariables) =>
        graphQLClient.request<UpdateMemberStatByIdMutation>(UpdateMemberStatById, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ STATS_QUERY_KEYS.MEMBER_STATS ],
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
