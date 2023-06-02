import {
  AllCharactersQuery,
  CharacterFullQuery,
  CharacterSummaryQuery,
  CreateCharacterMutation,
  CreateCharacterMutationVariables,
  DeleteCharacterMutationVariables,
  DeleteCharacterMutation,
  UpdateCharacterMutation,
  UpdateCharacterMutationVariables,
  HydrateRangerMutation,
  HydrateRangerMutationVariables,
  UpdateBpSpentMutation,
  UpdateBpSpentMutationVariables,
} from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

import GetAllCharactersRequest from '../../graphql/queries/characters'
import GetCharacterFullRequest from '../../graphql/queries/character-full'
import GetCharacterSummaryRequest from '../../graphql/queries/character-summary'
import UpdateCharacterById from '../../graphql/mutations/character-update'
import CreateCharacterRequest from '../../graphql/mutations/character-create'
import DeleteCharacterRequest from '../../graphql/mutations/character-delete'
import HydrateCharacterRequest from '../../graphql/mutations/character-hydrate'
import UpdateRBpAllottmentRequest from '../../graphql/mutations/character-bp'

import { useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export enum RANGER_QUERY_KEYS {
  RANGER_SUMMARY = 'ranger-summary',
  RANGER_FULL = 'ranger-full',
  ALL_RANGERS = 'all_rangers',
}

export function useRangerApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()
  const params = useParams()

  return {
    getAllRangers: useQuery({
      queryKey: [ RANGER_QUERY_KEYS.ALL_RANGERS ],
      queryFn: async () => graphQLClient.request<AllCharactersQuery>(GetAllCharactersRequest),
    }),
    getRangerSummary: useQuery({
      queryKey: [ RANGER_QUERY_KEYS.RANGER_SUMMARY ],
      queryFn: async () => {
        return params?.memberId
          ? graphQLClient.request<CharacterSummaryQuery>(GetCharacterSummaryRequest, {
              id: params?.memberId,
            })
          : null
      },
    }),
    getRangerFull: useQuery({
      queryKey: [ RANGER_QUERY_KEYS.RANGER_FULL ],
      queryFn: async () => {
        return params?.memberId
          ? graphQLClient.request<CharacterFullQuery>(GetCharacterFullRequest, {
              id: params?.memberId,
            })
          : null
      },
    }),
    createRanger: useMutation({
      mutationFn: (data: CreateCharacterMutationVariables) =>
        graphQLClient.request<CreateCharacterMutation>(CreateCharacterRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ RANGER_QUERY_KEYS.ALL_RANGERS ],
        })
      },
    }),
    updateRanger: useMutation({
      mutationFn: (data: UpdateCharacterMutationVariables) =>
        graphQLClient.request<UpdateCharacterMutation>(UpdateCharacterById, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER_SUMMARY ] })
        queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER_FULL ] })
        queryClient.invalidateQueries({
          queryKey: [ RANGER_QUERY_KEYS.ALL_RANGERS ],
        })
      },
    }),
    deleteRanger: useMutation({
      mutationFn: (data: DeleteCharacterMutationVariables) =>
        graphQLClient.request<DeleteCharacterMutation>(DeleteCharacterRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ RANGER_QUERY_KEYS.ALL_RANGERS ],
        })
      },
    }),
    hydrateRanger: useMutation({
      mutationFn: (data: HydrateRangerMutationVariables) =>
        graphQLClient.request<HydrateRangerMutation>(HydrateCharacterRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER_SUMMARY ] })
        queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER_FULL ] })
      },
    }),
    updateRangerBpAllottment: useMutation({
      mutationFn: (data: UpdateBpSpentMutationVariables) =>
        graphQLClient.request<UpdateBpSpentMutation>(UpdateRBpAllottmentRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER_SUMMARY ] })
        queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER_FULL ] })
      },
    }),
  }
}
