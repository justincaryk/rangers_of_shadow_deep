import {
  LearnHeroicActionMutationVariables,
  LearnSpellMutation,
  LearnSpellMutationVariables,
  SpellsQuery,
  UnlearnSpellMutation,
  UnlearnSpellMutationVariables,
} from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

import GetSpellsRequest from '../../graphql/queries/spells'
import LearnSpellRequest from '../../graphql/mutations/character-spell-update'
import UnlearnSpellRequest from '../../graphql/mutations/character-spell-delete'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { RANGER_QUERY_KEYS } from '../ranger/ranger-api'

export enum SPELLS_QUERY_KEYS {
  ALL_SPELLS = 'all_spells',
}

export function useSpellsApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()

  return {
    getSpells: useQuery({
      queryKey: [ SPELLS_QUERY_KEYS.ALL_SPELLS ],
      queryFn: async () => graphQLClient.request<SpellsQuery>(GetSpellsRequest),
    }),
    learnSpell: useMutation({
      mutationFn: (data: LearnSpellMutationVariables) =>
        graphQLClient.request<LearnSpellMutation>(LearnSpellRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ RANGER_QUERY_KEYS.RANGER ],
        })
      },
    }),
    unlearnSpell: useMutation({
      mutationFn: (data: UnlearnSpellMutationVariables) =>
        graphQLClient.request<UnlearnSpellMutation>(UnlearnSpellRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ RANGER_QUERY_KEYS.RANGER ],
        })
      },
    }),
  }
}
