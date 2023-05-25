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
import { staticQueryConfig } from '../react-query/defaults'

export enum EQUIPMENT_QUERY_KEYS {
  EQUIPMENT = 'equipment',
  MEMBER_EQUIPMENT = 'member-equipment',
}

export function useEquipmentApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()
  const { id, referenceColumnName } = useCurrentMember()

  const getQueryContextOnMutate = () => {
    const prev = queryClient.getQueryData([ EQUIPMENT_QUERY_KEYS.MEMBER_EQUIPMENT ]) as MemberItemsQuery
    return { old: prev?.allMemberItems?.nodes ?? [] }
  }

  return {
    getEquipment: useQuery({
      queryKey: [ EQUIPMENT_QUERY_KEYS.EQUIPMENT ],
      queryFn: async () => graphQLClient.request<GetEquipmentSortedQuery>(GetEquipmentSortedRequest),
      ...staticQueryConfig,
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
      onMutate: getQueryContextOnMutate,
      onSuccess: (data, _, context) => {
        if (context?.old && data.createMemberItem?.memberItem) {
          const updated: MemberItemsQuery = {
            allMemberItems: {
              nodes: [ ...context.old, data.createMemberItem?.memberItem ],
            },
          }
          queryClient.setQueryData([ EQUIPMENT_QUERY_KEYS.MEMBER_EQUIPMENT ], updated)
        }
      },
    }),
    deleteMemberItem: useMutation({
      mutationFn: (data: DeleteMemberItemMutationVariables) =>
        graphQLClient.request<DeleteMemberItemMutation>(DeleteRangerItemRequest, data),
      onMutate: getQueryContextOnMutate,
      onSuccess: (_, variables, context) => {
        if (context?.old) {
          const updated: MemberItemsQuery = {
            allMemberItems: {
              nodes: [ ...context.old.filter(x => x.id !== variables.id) ],
            },
          }

          queryClient.setQueryData([ EQUIPMENT_QUERY_KEYS.MEMBER_EQUIPMENT ], updated)
        }
      },
    }),
  }
}
