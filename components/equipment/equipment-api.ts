import { AddItemToRangerMutation, AddItemToRangerMutationVariables, DeleteRangerItemMutation, DeleteRangerItemMutationVariables, GetEquipmentSortedQuery } from '../../graphql/generated/graphql'

import useGraphQL from '../graphql/useGraphQL'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import GetEquipmentSortedRequest from '../../graphql/queries/items'
import AddItemToRangerRequest from '../../graphql/mutations/character-item-create'
import DeleteRangerItemRequest from '../../graphql/mutations/character-item-delete'

import { RANGER_QUERY_KEYS } from '../ranger/ranger-api'

export enum EQUIPMENT_QUERY_KEYS {
  EQUIPMENT = 'equipment',
}

export function useEquipmentApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()

  return {
    getEquipment: useQuery({
      queryKey: [ EQUIPMENT_QUERY_KEYS.EQUIPMENT ],
      queryFn: async () => graphQLClient.request<GetEquipmentSortedQuery>(GetEquipmentSortedRequest),
    }),
    addEquipmentToRanger: useMutation({
      mutationFn: (data: AddItemToRangerMutationVariables) =>
        graphQLClient.request<AddItemToRangerMutation>(AddItemToRangerRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ RANGER_QUERY_KEYS.RANGER ],
        })
      },
    }),
    deleteRangerEquipment: useMutation({
      mutationFn: (data: DeleteRangerItemMutationVariables) =>
        graphQLClient.request<DeleteRangerItemMutation>(DeleteRangerItemRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ RANGER_QUERY_KEYS.RANGER ],
        })
      },
    }),
  }
}
