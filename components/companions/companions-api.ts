import {
  CharCompanionQuery,
  CompanionsQuery,
  CreateCharacterCompanionMutation,
  CreateCharacterCompanionMutationVariables,
  DeleteCharCompanionMutation,
  DeleteCharCompanionMutationVariables,
  UpdateCharCompanionMutation,
  UpdateCharCompanionMutationVariables,
} from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

import GetAllCompanionsRequest from '../../graphql/queries/companions'
import GetAllCharCompanionsRequest from '../../graphql/queries/char-companions'
import GetCharCompanionRequest from '../../graphql/queries/char-companion'
import CreateCharCompanionRequest from '../../graphql/mutations/char-companion-create'
import UpdateCharCompanionRequest from '../../graphql/mutations/char-companion-update'
import DeleteCharCompanionRequest from '../../graphql/mutations/char-companion-delete'

import { useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export enum COMPANION_QUERY_KEYS {
  CHAR_COMPANION = 'char_companion',
  CHAR_COMPANIONS = 'char_companions',
  ALL_COMPANIONS = 'all_companions',
}

export function useRangerApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()
  const params = useParams()

  return {
    getAllCompanions: useQuery({
      queryKey: [ COMPANION_QUERY_KEYS.ALL_COMPANIONS ],
      queryFn: async () => graphQLClient.request<CompanionsQuery>(GetAllCompanionsRequest),
    }),
    getAllCharCompanions: useQuery({
      queryKey: [ COMPANION_QUERY_KEYS.ALL_COMPANIONS ],
      queryFn: async () => graphQLClient.request<CompanionsQuery>(GetAllCharCompanionsRequest),
    }),
    getCharCompanion: useQuery({
      queryKey: [ COMPANION_QUERY_KEYS.CHAR_COMPANION ],
      queryFn: async () => {
        return params?.id
          ? graphQLClient.request<CharCompanionQuery>(GetCharCompanionRequest, {
              id: params?.id,
            })
          : null
      },
    }),
    createCharCompanion: useMutation({
      mutationFn: (data: CreateCharacterCompanionMutationVariables) =>
        graphQLClient.request<CreateCharacterCompanionMutation>(CreateCharCompanionRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ COMPANION_QUERY_KEYS.CHAR_COMPANIONS ],
        })
      },
    }),
    updateCharCompanion: useMutation({
      mutationFn: (data: UpdateCharCompanionMutationVariables) =>
        graphQLClient.request<UpdateCharCompanionMutation>(UpdateCharCompanionRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [ COMPANION_QUERY_KEYS.ALL_COMPANIONS ] })
      },
    }),
    deleteCharCompanion: useMutation({
      mutationFn: (data: DeleteCharCompanionMutationVariables) =>
        graphQLClient.request<DeleteCharCompanionMutation>(DeleteCharCompanionRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ COMPANION_QUERY_KEYS.CHAR_COMPANIONS ],
        })
      },
    }),
  }
}
