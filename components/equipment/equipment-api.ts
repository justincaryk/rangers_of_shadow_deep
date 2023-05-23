import {
  CreateMemberItemMutation,
  CreateMemberItemMutationVariables,
  DeleteMemberItemMutation,
  DeleteMemberItemMutationVariables,
  GetEquipmentSortedQuery,
} from '../../graphql/generated/graphql'

import useGraphQL from '../graphql/useGraphQL'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import GetEquipmentSortedRequest from '../../graphql/queries/items'
import AddItemToRangerRequest from '../../graphql/mutations/member-item-create'
import DeleteRangerItemRequest from '../../graphql/mutations/member-item-delete'

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
    createMemberItem: useMutation({
      mutationFn: (data: CreateMemberItemMutationVariables) =>
        graphQLClient.request<CreateMemberItemMutation>(AddItemToRangerRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ RANGER_QUERY_KEYS.RANGER ],
        })
      },
    }),
    deleteMemberItem: useMutation({
      mutationFn: (data: DeleteMemberItemMutationVariables) =>
        graphQLClient.request<DeleteMemberItemMutation>(DeleteRangerItemRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ RANGER_QUERY_KEYS.RANGER ],
        })
      },
    }),
  }
}
