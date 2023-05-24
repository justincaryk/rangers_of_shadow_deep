import {
  LearnSpellMutation,
  LearnSpellMutationVariables,
  MemberSpellsQuery,
  SetSpellUsesMutation,
  SetSpellUsesMutationVariables,
  SpellsQuery,
  UnlearnSpellMutation,
  UnlearnSpellMutationVariables,
} from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

import GetSpellsRequest from '../../graphql/queries/spells'
import GetMemberSpellsRequest from '../../graphql/queries/member-spells'
import LearnSpellRequest from '../../graphql/mutations/member-spell-create'
import UnlearnSpellRequest from '../../graphql/mutations/member-spell-delete'
import SetSpellUsesRequest from '../../graphql/mutations/member-spell-update'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCurrentMember } from '../react-query/hooks'

export enum SPELLS_QUERY_KEYS {
  ALL_SPELLS = 'all_spells',
  MEMBER_SPELLS = 'member_spells',
}

export function useSpellsApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()
  const { id, referenceColumnName } = useCurrentMember()

  return {
    getSpells: useQuery({
      queryKey: [ SPELLS_QUERY_KEYS.ALL_SPELLS ],
      queryFn: async () => graphQLClient.request<SpellsQuery>(GetSpellsRequest),
    }),
    getMemberSpells: useQuery({
      queryKey: [ SPELLS_QUERY_KEYS.MEMBER_SPELLS ],
      queryFn: async () => {
        return id && referenceColumnName
          ? graphQLClient.request<MemberSpellsQuery>(GetMemberSpellsRequest, {
              [referenceColumnName]: id,
            })
          : null
      },
    }),
    learnSpell: useMutation({
      mutationFn: (data: LearnSpellMutationVariables) =>
        graphQLClient.request<LearnSpellMutation>(LearnSpellRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ SPELLS_QUERY_KEYS.MEMBER_SPELLS ],
        })
      },
    }),
    buyAdditionalUse: useMutation({
      mutationFn: (data: SetSpellUsesMutationVariables) =>
        graphQLClient.request<SetSpellUsesMutation>(SetSpellUsesRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ SPELLS_QUERY_KEYS.MEMBER_SPELLS ],
        })
      },
    }),
    unlearnSpell: useMutation({
      mutationFn: (data: UnlearnSpellMutationVariables) =>
        graphQLClient.request<UnlearnSpellMutation>(UnlearnSpellRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ SPELLS_QUERY_KEYS.MEMBER_SPELLS ],
        })
      },
    }),
  }
}
