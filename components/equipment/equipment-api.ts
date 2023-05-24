import {
  CreateMemberItemMutation,
  CreateMemberItemMutationVariables,
  DeleteMemberItemMutation,
  DeleteMemberItemMutationVariables,
  GetEquipmentSortedQuery,
  MemberItemsQuery,
} from '../../graphql/generated/graphql'

import useGraphQL from '../graphql/useGraphQL'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCurrentMember } from '../react-query/hooks'

import GetEquipmentSortedRequest from '../../graphql/queries/items'
import GetMemberEquipmentRequest from '../../graphql/queries/member-items'
import AddItemToRangerRequest from '../../graphql/mutations/member-item-create'
import DeleteRangerItemRequest from '../../graphql/mutations/member-item-delete'

export enum EQUIPMENT_QUERY_KEYS {
  EQUIPMENT = 'equipment',
  MEMBER_EQUIPMENT = 'member-equipment',
}

export function useEquipmentApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()
  const { id, referenceColumnName } = useCurrentMember()

  return {
    getEquipment: useQuery({
      queryKey: [ EQUIPMENT_QUERY_KEYS.EQUIPMENT ],
      queryFn: async () => graphQLClient.request<GetEquipmentSortedQuery>(GetEquipmentSortedRequest),
    }),
    getMemberItems: useQuery({
      queryKey: [ EQUIPMENT_QUERY_KEYS.MEMBER_EQUIPMENT ],
      queryFn: async () => {
        return id && referenceColumnName
          ? graphQLClient.request<MemberItemsQuery>(GetMemberEquipmentRequest, {
              [referenceColumnName]: id,
            })
          : null
      },
    }),
    createMemberItem: useMutation({
      mutationFn: (data: CreateMemberItemMutationVariables) =>
        graphQLClient.request<CreateMemberItemMutation>(AddItemToRangerRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ EQUIPMENT_QUERY_KEYS.MEMBER_EQUIPMENT ],
        })
      },
    }),
    deleteMemberItem: useMutation({
      mutationFn: (data: DeleteMemberItemMutationVariables) =>
        graphQLClient.request<DeleteMemberItemMutation>(DeleteRangerItemRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ EQUIPMENT_QUERY_KEYS.MEMBER_EQUIPMENT ],
        })
      },
    }),
  }
}
