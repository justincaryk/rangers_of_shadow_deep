'use client'

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
  RangerLeadershipSkillQuery,
} from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

import GetAllCharactersRequest from '../../graphql/queries/characters'
import GetCharacterFullRequest from '../../graphql/queries/character-full'
import GetCharacterSummaryRequest from '../../graphql/queries/character-summary'
import GetCharacterLeadershipRequest from '../../graphql/queries/character-leadership'
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
  RANGER_LEADERSHIP = 'ranger-leadership',
}

export function useRangerApi(characterId?: string) {
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
    getRangerLeadership: useQuery({
      queryKey: [ RANGER_QUERY_KEYS.RANGER_LEADERSHIP ],
      queryFn: async () => {
        if (characterId) {
          return graphQLClient.request<RangerLeadershipSkillQuery>(GetCharacterLeadershipRequest, {
            characterId: characterId,
          })
        }
        if (params?.memberId) {
          return graphQLClient.request<RangerLeadershipSkillQuery>(GetCharacterLeadershipRequest, {
            characterId: params?.memberId,
          })
        }
        return null
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
