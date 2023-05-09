import {
  AllCharactersQuery,
  CharacterByIdQuery,
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
import GetCharacterByIdRequest from '../../graphql/queries/character'
import UpdateCharacterById from '../../graphql/mutations/character-update'
import CreateCharacterRequest from '../../graphql/mutations/character-create'
import DeleteCharacterRequest from '../../graphql/mutations/character-delete'
import HydrateCharacterRequest from '../../graphql/mutations/character-hydrate'
import UpdateRBpAllottmentRequest from '../../graphql/mutations/character-bp'

import { useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export enum RANGER_QUERY_KEYS {
  RANGER = 'ranger',
  ALL_RANGERS = 'all_rangers',
}

export function useRangerApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()
  const params = useParams()

  return {
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
        queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER ] })
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
    getAllRangers: useQuery({
      queryKey: [ RANGER_QUERY_KEYS.ALL_RANGERS ],
      queryFn: async () => graphQLClient.request<AllCharactersQuery>(GetAllCharactersRequest),
    }),
    getRangerById: useQuery({
      queryKey: [ RANGER_QUERY_KEYS.RANGER ],
      queryFn: async () => {
        return params?.id
          ? graphQLClient.request<CharacterByIdQuery>(GetCharacterByIdRequest, {
              id: params?.id,
            })
          : null
      },
    }),
    hydrateRanger: useMutation({
      mutationFn: (data: HydrateRangerMutationVariables) =>
        graphQLClient.request<HydrateRangerMutation>(HydrateCharacterRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER ] })
      },
    }),
    updateRangerBpAllottment: useMutation({
      mutationFn: (data: UpdateBpSpentMutationVariables) =>
        graphQLClient.request<UpdateBpSpentMutation>(UpdateRBpAllottmentRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER ] })
      },
    }),
  }
}
