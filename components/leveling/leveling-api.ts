import useGraphQL from '../graphql/useGraphQL'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCurrentMember } from '../react-query/hooks'

import {
  AddMemberLevelMutation,
  AddMemberLevelMutationVariables,
  FriendLevelRulesQuery,
  MemberLevelsQuery,
  RangerLevelingRulesQuery,
  UpdateMemberLevelMutation,
  UpdateMemberLevelMutationVariables,
} from '../../graphql/generated/graphql'

import RangerLevelRulesRequest from '../../graphql/queries/character-level-grants'
import AddMemberLevelRequest from '../../graphql/mutations/member-level-create'
import UpdateMemberLevelRequest from '../../graphql/mutations/member-level-update'
import FriendLevelRulesRequest from '../../graphql/queries/friend-level-grants'
import GetMemberLevelsRequest from '../../graphql/queries/member-levels'

import { RANGER_QUERY_KEYS } from '../ranger/ranger-api'
import { staticQueryConfig } from '../react-query/defaults'

enum LEVEL_RULES {
  RANGER_RULES = 'ranger_rules',
  COMPANION_RULES = 'companion_rules',
  MEMBER_LEVELS = 'member_levels',
}

export function useLevelingApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()
  const { id, referenceColumnName, memberType } = useCurrentMember()

  return {
    rangerRules: useQuery({
      queryKey: [ LEVEL_RULES.RANGER_RULES ],
      queryFn: async () => graphQLClient.request<RangerLevelingRulesQuery>(RangerLevelRulesRequest),
      ...staticQueryConfig,
    }),
    friendRules: useQuery({
      queryKey: [ LEVEL_RULES.COMPANION_RULES ],
      queryFn: async () => graphQLClient.request<FriendLevelRulesQuery>(FriendLevelRulesRequest),
      ...staticQueryConfig,
    }),
    getMemberLevels: useQuery({
      queryKey: [ LEVEL_RULES.MEMBER_LEVELS ],
      queryFn: async () => {
        return id && referenceColumnName
          ? graphQLClient.request<MemberLevelsQuery>(GetMemberLevelsRequest, {
              [referenceColumnName]: id,
            })
          : null
      },
    }),
    createLevelRef: useMutation({
      mutationFn: (data: AddMemberLevelMutationVariables) =>
        graphQLClient.request<AddMemberLevelMutation>(AddMemberLevelRequest, data),
      onSuccess: data => {
        if (memberType === 'ranger') {
          queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER ] })
        }
        if (memberType === 'friend') {
          queryClient.setQueryData([ LEVEL_RULES.MEMBER_LEVELS ], (prev: any) => [
            ...prev,
            data.createMemberLevel?.memberLevel,
          ])
          // queryClient.invalidateQueries({ queryKey: [ LEVEL_RULES.MEMBER_LEVELS ] })
        }
      },
    }),
    updateLevelRef: useMutation({
      mutationFn: (data: UpdateMemberLevelMutationVariables) =>
        graphQLClient.request<UpdateMemberLevelMutation>(UpdateMemberLevelRequest, data),
      onSuccess: data => {
        if (memberType === 'ranger') {
          queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER ] })
        }
        if (memberType === 'friend') {
          queryClient.setQueryData(
            [ LEVEL_RULES.MEMBER_LEVELS, data.updateMemberLevelById?.memberLevel?.id ],
            data.updateMemberLevelById?.memberLevel
          )
          // queryClient.invalidateQueries({ queryKey: [ LEVEL_RULES.MEMBER_LEVELS ] })
        }
      },
    }),
  }
}
