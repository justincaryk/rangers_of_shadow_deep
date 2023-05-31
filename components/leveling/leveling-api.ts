import useGraphQL from '../graphql/useGraphQL'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCurrentMember } from '../react-query/hooks'

import {
  AddMemberLevelMutation,
  AddMemberLevelMutationVariables,
  FriendLevelRulesQuery,
  MemberLevel,
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

  const getQueryContextOnMutate = () => {
    const prev = queryClient.getQueryData([ LEVEL_RULES.MEMBER_LEVELS ]) as MemberLevelsQuery
    return { old: prev?.allMemberLevels?.nodes ?? [] }
  }

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
      onMutate: getQueryContextOnMutate,
      onSuccess: (data, _, context) => {
        if (memberType === 'ranger') {
          queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER ] })
        }
        if (memberType === 'friend') {
          if (context?.old && data.createMemberLevel?.memberLevel) {
            const updated: MemberLevelsQuery = {
              allMemberLevels: {
                nodes: [ ...context.old, data.createMemberLevel.memberLevel ] as MemberLevel[],
              },
            }
            queryClient.setQueryData([ LEVEL_RULES.MEMBER_LEVELS ], updated)
          }
        }
      },
    }),
    updateLevelRef: useMutation({
      mutationFn: (data: UpdateMemberLevelMutationVariables) =>
        graphQLClient.request<UpdateMemberLevelMutation>(UpdateMemberLevelRequest, data),
      onMutate: getQueryContextOnMutate,
      onSuccess: (data, _, context) => {
        if (memberType === 'ranger') {
          queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER ] })
        }
        if (memberType === 'friend' && context?.old) {
          const updated: MemberLevelsQuery = {
            allMemberLevels: {
              nodes: [
                ...context.old.map(x => {
                  if (x.id === data.updateMemberLevelById?.memberLevel?.id) {
                    return data.updateMemberLevelById!.memberLevel!
                  }
                  return x
                }),
              ],
            },
          }
          queryClient.setQueryData([ LEVEL_RULES.MEMBER_LEVELS ], updated)
        }
      },
    }),
  }
}
