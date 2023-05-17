import useGraphQL from '../graphql/useGraphQL'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  AddMemberLevelMutation,
  AddMemberLevelMutationVariables,
  FriendLevelRulesQuery,
  RangerLevelingRulesQuery,
  UpdateMemberLevelMutation,
  UpdateMemberLevelMutationVariables,
} from '../../graphql/generated/graphql'

import RangerLevelRulesRequest from '../../graphql/queries/character-level-grants'
import AddMemberLevelRequest from '../../graphql/mutations/member-level-create'
import UpdateMemberLevelRequest from '../../graphql/mutations/member-level-update'
import FriendLevelRulesRequest from '../../graphql/queries/friend-level-grants'

import { RANGER_QUERY_KEYS } from '../ranger/ranger-api'
import { COMPANION_QUERY_KEYS } from '../companions/companions-api'

enum LEVEL_RULES {
  RANGER_RULES = 'ranger_rules',
  COMPANION_RULES = 'companion_rules',
}

export function useLevelingApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()

  return {
    rangerRules: useQuery({
      queryKey: [ LEVEL_RULES.RANGER_RULES ],
      queryFn: async () => graphQLClient.request<RangerLevelingRulesQuery>(RangerLevelRulesRequest),
    }),
    createLevelRef: useMutation({
      mutationFn: (data: AddMemberLevelMutationVariables) =>
        graphQLClient.request<AddMemberLevelMutation>(AddMemberLevelRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER ] })
        queryClient.invalidateQueries({ queryKey: [ COMPANION_QUERY_KEYS.FRIEND ] })
      },
    }),
    updateLevelRef: useMutation({
      mutationFn: (data: UpdateMemberLevelMutationVariables) =>
        graphQLClient.request<UpdateMemberLevelMutation>(UpdateMemberLevelRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER ] })
        queryClient.invalidateQueries({ queryKey: [ COMPANION_QUERY_KEYS.FRIEND ] })
      },
    }),
    friendRules: useQuery({
      queryKey: [ LEVEL_RULES.COMPANION_RULES ],
      queryFn: async () => graphQLClient.request<FriendLevelRulesQuery>(FriendLevelRulesRequest),
    }),
  }
}
