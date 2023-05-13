import {
  FriendQuery,
  CreateFriendMutation,
  CreateFriendMutationVariables,
  DeleteFriendMutation,
  DeleteFriendMutationVariables,
  UpdateFriendMutation,
  UpdateFriendMutationVariables,
  MercenariesQuery,
  FriendsQuery,
} from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

import GetMercenariessRequest from '../../graphql/queries/mercenaries'
import GetFriendsRequest from '../../graphql/queries/friends'
import GetFriendRequest from '../../graphql/queries/friend'
import CreateFriendRequest from '../../graphql/mutations/friend-create'
import UpdateFriendRequest from '../../graphql/mutations/friend-update'
import DeleteFriendRequest from '../../graphql/mutations/friend-delete'

import { useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export enum COMPANION_QUERY_KEYS {
  FRIEND = 'friend',
  FRIENDS = 'friends',
  MERCENARIES = 'mercenaries',
}

export function useCompanionsApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()
  const params = useParams()

  return {
    getMercenaries: useQuery({
      queryKey: [ COMPANION_QUERY_KEYS.MERCENARIES ],
      queryFn: async () => graphQLClient.request<MercenariesQuery>(GetMercenariessRequest),
    }),
    getFriends: useQuery({
      queryKey: [ COMPANION_QUERY_KEYS.FRIENDS ],
      queryFn: async () => graphQLClient.request<FriendsQuery>(GetFriendsRequest),
    }),
    getFriend: useQuery({
      queryKey: [ COMPANION_QUERY_KEYS.FRIEND ],
      queryFn: async () => {
        return params?.id
          ? graphQLClient.request<FriendQuery>(GetFriendRequest, {
              id: params?.id,
            })
          : null
      },
    }),
    createFriend: useMutation({
      mutationFn: (data: CreateFriendMutationVariables) =>
        graphQLClient.request<CreateFriendMutation>(CreateFriendRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ COMPANION_QUERY_KEYS.FRIENDS ],
        })
      },
    }),
    updateFriend: useMutation({
      mutationFn: (data: UpdateFriendMutationVariables) =>
        graphQLClient.request<UpdateFriendMutation>(UpdateFriendRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [ COMPANION_QUERY_KEYS.FRIEND ] })
        queryClient.invalidateQueries({
          queryKey: [ COMPANION_QUERY_KEYS.FRIENDS ],
        })
      },
    }),
    deleteFriend: useMutation({
      mutationFn: (data: DeleteFriendMutationVariables) =>
        graphQLClient.request<DeleteFriendMutation>(DeleteFriendRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ COMPANION_QUERY_KEYS.FRIENDS ],
        })
      },
    }),
  }
}
