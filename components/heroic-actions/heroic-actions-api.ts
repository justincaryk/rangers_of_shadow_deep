import {
    // AllCharactersQuery,
    // CharacterByIdQuery,
    // CreateCharacterMutation,
    // CreateCharacterMutationVariables,
    // DeleteCharacterMutationVariables,
    // DeleteCharacterMutation,
    // UpdateCharacterMutation,
    // UpdateCharacterMutationVariables,
    HeroicActionsQuery,
  } from '../../graphql/generated/graphql'
  import useGraphQL from '../graphql/useGraphQL'
  
  import GetHeroicActionsRequest from '../../graphql/queries/heroic-actions'
  import { useParams } from 'next/navigation'
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
  
  export enum HEROIC_ACTIONS_QUERY_KEYS {
    ALL_HEROIC_ACTIONS = 'all_heroic_actions',
  }
  
  export function useHeroicActionApi() {
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
      getHeroicActions: useQuery({
        queryKey: [ HEROIC_ACTIONS_QUERY_KEYS.ALL_HEROIC_ACTIONS ],
        queryFn: async () =>
          graphQLClient.request<HeroicActionsQuery>(GetHeroicActionsRequest),
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
  