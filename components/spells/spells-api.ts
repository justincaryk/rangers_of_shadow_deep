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

  const getQueryContextOnMutate = () => {
    const prev = queryClient.getQueryData([ SPELLS_QUERY_KEYS.MEMBER_SPELLS ]) as MemberSpellsQuery
    return { old: prev.allMemberSpells?.nodes || [] }
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
        if (context?.old && data.addAction?.memberSpell?.id) {
          const updated: MemberSpellsQuery = {
            allMemberSpells: {
              nodes: [ ...context.old, data.addAction.memberSpell ],
            },
          }

          queryClient.setQueryData([ SPELLS_QUERY_KEYS.MEMBER_SPELLS ], updated)
        }
      },
    }),
    setNumberOfUses: useMutation({
      mutationFn: (data: SetSpellUsesMutationVariables) =>
        graphQLClient.request<SetSpellUsesMutation>(SetSpellUsesRequest, data),
      onMutate: getQueryContextOnMutate,
      onSuccess: (data, _, context) => {
        if (context?.old) {
          const updated: MemberSpellsQuery = {
            allMemberSpells: {
              nodes: [
                ...context.old.map(x =>
                  x.id === data.setSpellUses?.memberSpell?.id ? data.setSpellUses!.memberSpell! : x
                ),
              ],
            },
          }
          queryClient.setQueryData([ SPELLS_QUERY_KEYS.MEMBER_SPELLS ], updated)
        }
      },
    }),
    unlearnSpell: useMutation({
      mutationFn: (data: UnlearnSpellMutationVariables) =>
        graphQLClient.request<UnlearnSpellMutation>(UnlearnSpellRequest, data),
      onMutate: getQueryContextOnMutate,
      onSuccess: (_, variables, context) => {
        if (context?.old) {
          const updated: MemberSpellsQuery = {
            allMemberSpells: { nodes: [ ...context.old.filter(x => x.id !== variables.id) ] },
          }

          queryClient.setQueryData([ SPELLS_QUERY_KEYS.MEMBER_SPELLS ], updated)
        }
      },
    }),
  }
}
