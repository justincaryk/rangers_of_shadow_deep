'use client'

import {
  HeroicActionsQuery,
  LearnHeroicActionMutation,
  LearnHeroicActionMutationVariables,
  MemberHeroicActionsQuery,
  SetHeroicActionUsesMutation,
  SetHeroicActionUsesMutationVariables,
  UnlearnHeroicActionMutation,
  UnlearnHeroicActionMutationVariables,
} from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

import GetHeroicActionsRequest from '../../graphql/queries/heroic-actions'
import GetMemberHeroicActionsRequest from '../../graphql/queries/member-heroic-actions'
import LearnHeroicActionRequest from '../../graphql/mutations/character-heroic-action-create'
import UnlearnHeroicActionRequest from '../../graphql/mutations/character-heroic-action-delete'
import SetHeroicActionUsesRequest from '../../graphql/mutations/character-heroic-action-update'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCurrentMember } from '../react-query/hooks'
import { staticQueryConfig } from '../react-query/defaults'

export enum HEROIC_ACTIONS_QUERY_KEYS {
  ALL_HEROIC_ACTIONS = 'all_heroic_actions',
  MEMBER_HEROIC_ACTIONS = 'member_heroic_actions',
}

export function useHeroicActionApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()
  const { id, referenceColumnName } = useCurrentMember()

  const getQueryContextOnMutate = () => {
    const prev = queryClient.getQueryData([ HEROIC_ACTIONS_QUERY_KEYS.MEMBER_HEROIC_ACTIONS ]) as MemberHeroicActionsQuery
    return { old: prev?.allMemberHeroicActions?.nodes ?? [] }
  }

  return {
    getHeroicActions: useQuery({
      queryKey: [ HEROIC_ACTIONS_QUERY_KEYS.ALL_HEROIC_ACTIONS ],
      queryFn: async () => graphQLClient.request<HeroicActionsQuery>(GetHeroicActionsRequest),
      ...staticQueryConfig,
    }),
    getMemberHeroicActions: useQuery({
      queryKey: [ HEROIC_ACTIONS_QUERY_KEYS.MEMBER_HEROIC_ACTIONS ],
      queryFn: async () => {
        return id && referenceColumnName
          ? graphQLClient.request<MemberHeroicActionsQuery>(GetMemberHeroicActionsRequest, {
              [referenceColumnName]: id,
            })
          : null
      },
    }),
    learnHeroicAction: useMutation({
      mutationFn: (data: LearnHeroicActionMutationVariables) =>
        graphQLClient.request<LearnHeroicActionMutation>(LearnHeroicActionRequest, data),
      onMutate: getQueryContextOnMutate,
      onSuccess: (data, _, context) => {
        if (context?.old && data.addAction?.memberHeroicAction) {
          const updated: MemberHeroicActionsQuery = {
            allMemberHeroicActions: {
              nodes: [ ...context.old, data.addAction?.memberHeroicAction ],
            },
          }
          queryClient.setQueryData([ HEROIC_ACTIONS_QUERY_KEYS.MEMBER_HEROIC_ACTIONS ], updated)
        }
      },
    }),
    buyAdditionalUse: useMutation({
      mutationFn: (data: SetHeroicActionUsesMutationVariables) =>
        graphQLClient.request<SetHeroicActionUsesMutation>(SetHeroicActionUsesRequest, data),
      onMutate: getQueryContextOnMutate,
      onSuccess: (data, _, context) => {
        if (context?.old && data.setHeroicActionUses?.memberHeroicAction) {
          const updated: MemberHeroicActionsQuery = {
            allMemberHeroicActions: {
              nodes: [
                ...context.old.map(x => {
                  if (x.id === data.setHeroicActionUses?.memberHeroicAction?.id) {
                    return data.setHeroicActionUses!.memberHeroicAction!
                  }
                  return x
                }),
              ],
            },
          }
          queryClient.setQueryData([ HEROIC_ACTIONS_QUERY_KEYS.MEMBER_HEROIC_ACTIONS ], updated)
        }
      },
    }),
    unlearnHeroicAction: useMutation({
      mutationFn: (data: UnlearnHeroicActionMutationVariables) =>
        graphQLClient.request<UnlearnHeroicActionMutation>(UnlearnHeroicActionRequest, data),
      onMutate: getQueryContextOnMutate,
      onSuccess: (_, variables, context) => {
        if (context?.old) {
          const updated: MemberHeroicActionsQuery = {
            allMemberHeroicActions: {
              nodes: [
                ...context.old.filter(x => x.id !== variables.id),
              ],
            },
          }

          queryClient.setQueryData([ HEROIC_ACTIONS_QUERY_KEYS.MEMBER_HEROIC_ACTIONS ], updated)
        }
      },
    }),
  }
}
