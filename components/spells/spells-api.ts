import {
    // AllCharactersQuery,
    // CharacterByIdQuery,
    // CreateCharacterMutation,
    // CreateCharacterMutationVariables,
    // DeleteCharacterMutationVariables,
    // DeleteCharacterMutation,
    // UpdateCharacterMutation,
    // UpdateCharacterMutationVariables,
    SpellsQuery,
  } from '../../graphql/generated/graphql'
  import useGraphQL from '../graphql/useGraphQL'
  
  import GetSpellsRequest from '../../graphql/queries/spells'
  import { useParams } from 'next/navigation'
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
  
  export enum SPELLS_QUERY_KEYS {
    ALL_SPELLS = 'all_spells',
  }
  
  export function useSpellsApi() {
    const { graphQLClient } = useGraphQL()
    // const queryClient = useQueryClient()
    // const params = useParams()
  
    return {
    //   createRanger: useMutation({
    //     mutationFn: (data: CreateCharacterMutationVariables) =>
    //       graphQLClient.request<CreateCharacterMutation>(
    //         CreateCharacterRequest,
    //         data
    //       ),
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({
    //         queryKey: [ RANGER_QUERY_KEYS.ALL_RANGERS ],
    //       })
    //     },
    //   }),
    //   updateRanger: useMutation({
    //     mutationFn: (data: UpdateCharacterMutationVariables) =>
    //       graphQLClient.request<UpdateCharacterMutation>(
    //         UpdateCharacterById,
    //         data
    //       ),
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({ queryKey: [ RANGER_QUERY_KEYS.RANGER ] })
    //       queryClient.invalidateQueries({
    //         queryKey: [ RANGER_QUERY_KEYS.ALL_RANGERS ],
    //       })
    //     },
    //   }),
    //   deleteRanger: useMutation({
    //     mutationFn: (data: DeleteCharacterMutationVariables) =>
    //       graphQLClient.request<DeleteCharacterMutation>(
    //         DeleteCharacterRequest,
    //         data
    //       ),
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({
    //         queryKey: [ RANGER_QUERY_KEYS.ALL_RANGERS ],
    //       })
    //     },
    //   }),
      getSpells: useQuery({
        queryKey: [ SPELLS_QUERY_KEYS.ALL_SPELLS ],
        queryFn: async () =>
          graphQLClient.request<SpellsQuery>(GetSpellsRequest),
      }),
    //   getRangerById: useQuery({
    //     queryKey: [ RANGER_QUERY_KEYS.RANGER ],
    //     queryFn: async () => {
    //       return params?.id ? (
    //         graphQLClient.request<CharacterByIdQuery>(GetCharacterByIdRequest, {
    //         id: params?.id,
    //         })) : null
    //       },
    //   }),
    }
  }
  