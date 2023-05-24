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

export enum HEROIC_ACTIONS_QUERY_KEYS {
  ALL_HEROIC_ACTIONS = 'all_heroic_actions',
  MEMBER_HEROIC_ACTIONS = 'member_heroic_actions',
}

export function useHeroicActionApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()
  const { id, referenceColumnName } = useCurrentMember()

  return {
    getHeroicActions: useQuery({
      queryKey: [ HEROIC_ACTIONS_QUERY_KEYS.ALL_HEROIC_ACTIONS ],
      queryFn: async () => graphQLClient.request<HeroicActionsQuery>(GetHeroicActionsRequest),
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
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ HEROIC_ACTIONS_QUERY_KEYS.MEMBER_HEROIC_ACTIONS ],
        })
      },
    }),
    buyAdditionalUse: useMutation({
      mutationFn: (data: SetHeroicActionUsesMutationVariables) =>
        graphQLClient.request<SetHeroicActionUsesMutation>(SetHeroicActionUsesRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ HEROIC_ACTIONS_QUERY_KEYS.MEMBER_HEROIC_ACTIONS ],
        })
      },
    }),
    unlearnHeroicAction: useMutation({
      mutationFn: (data: UnlearnHeroicActionMutationVariables) =>
        graphQLClient.request<UnlearnHeroicActionMutation>(UnlearnHeroicActionRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ HEROIC_ACTIONS_QUERY_KEYS.MEMBER_HEROIC_ACTIONS ],
        })
      },
    }),
  }
}
