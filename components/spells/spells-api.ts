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

import { staticQueryConfig } from '../react-query/defaults'

export enum SPELLS_QUERY_KEYS {
  ALL_SPELLS = 'all_spells',
  MEMBER_SPELLS = 'member_spells',
}

export function useSpellsApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()
  const { id, referenceColumnName } = useCurrentMember()
  console.log('x: ', {
    ...staticQueryConfig,
  })
  const getQueryContextOnMutate = () => {
    const prev = queryClient.getQueryData([ SPELLS_QUERY_KEYS.MEMBER_SPELLS ]) as MemberSpellsQuery
    return { prev: prev || null }
  }

  return {
    getSpells: useQuery({
      queryKey: [ SPELLS_QUERY_KEYS.ALL_SPELLS ],
      queryFn: async () => graphQLClient.request<SpellsQuery>(GetSpellsRequest),
      ...staticQueryConfig,
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
      mutationFn: async (data: LearnSpellMutationVariables) => {
        return graphQLClient.request<LearnSpellMutation>(LearnSpellRequest, data)
      },
      onMutate: getQueryContextOnMutate,
      onSuccess: (data, _, context) => {
        if (context?.prev?.allMemberSpells?.nodes) {
          if (data.addAction?.memberSpell) {
            context.prev.allMemberSpells.nodes.push(data.addAction.memberSpell)
          }
          queryClient.setQueryData([ SPELLS_QUERY_KEYS.MEMBER_SPELLS ], () => context.prev)
        }
      },
    }),
    setNumberOfUses: useMutation({
      mutationFn: (data: SetSpellUsesMutationVariables) =>
        graphQLClient.request<SetSpellUsesMutation>(SetSpellUsesRequest, data),
      onMutate: getQueryContextOnMutate,
      onSuccess: (data, variables, context) => {
        if (context?.prev?.allMemberSpells?.nodes) {
          context.prev.allMemberSpells.nodes.find(x => x.id === data.setSpellUses?.memberSpell?.id)!.uses =
            variables.uses
          queryClient.setQueryData([ SPELLS_QUERY_KEYS.MEMBER_SPELLS ], context.prev)
        }
      },
    }),
    unlearnSpell: useMutation({
      mutationFn: (data: UnlearnSpellMutationVariables) =>
        graphQLClient.request<UnlearnSpellMutation>(UnlearnSpellRequest, data),
      onMutate: getQueryContextOnMutate,
      onSuccess: (data, variables, context) => {
        if (context?.prev?.allMemberSpells?.nodes) {
          if (data.unlearnSpell?.deletedMemberSpellId) {
            const filtered = context.prev.allMemberSpells.nodes.filter(x => x.id !== variables.id)
            context.prev.allMemberSpells.nodes = filtered
          }
          queryClient.setQueryData([ SPELLS_QUERY_KEYS.MEMBER_SPELLS ], () => context.prev)
        }
      },
    }),
  }
}
