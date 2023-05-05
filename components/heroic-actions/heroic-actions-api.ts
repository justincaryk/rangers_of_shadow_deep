import {
  HeroicActionsQuery,
  LearnHeroicActionMutation,
  LearnHeroicActionMutationVariables,
  UnlearnHeroicActionMutation,
  UnlearnHeroicActionMutationVariables,
} from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

import GetHeroicActionsRequest from '../../graphql/queries/heroic-actions'
import LearnHeroicActionRequest from '../../graphql/mutations/character-heroic-action-create'
import UnlearnHeroicActionRequest from '../../graphql/mutations/character-heroic-action-delete'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { RANGER_QUERY_KEYS } from '../ranger/ranger-api'

export enum HEROIC_ACTIONS_QUERY_KEYS {
  ALL_HEROIC_ACTIONS = 'all_heroic_actions',
}

export function useHeroicActionApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()

  return {
    learnHeroicAction: useMutation({
      mutationFn: (data: LearnHeroicActionMutationVariables) =>
        graphQLClient.request<LearnHeroicActionMutation>(LearnHeroicActionRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ RANGER_QUERY_KEYS.RANGER ],
        })
      },
    }),
    unlearnHeroicAction: useMutation({
      mutationFn: (data: UnlearnHeroicActionMutationVariables) =>
        graphQLClient.request<UnlearnHeroicActionMutation>(UnlearnHeroicActionRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ RANGER_QUERY_KEYS.RANGER ],
        })
      },
    }),
    getHeroicActions: useQuery({
      queryKey: [ HEROIC_ACTIONS_QUERY_KEYS.ALL_HEROIC_ACTIONS ],
      queryFn: async () => graphQLClient.request<HeroicActionsQuery>(GetHeroicActionsRequest),
    }),
  }
}
