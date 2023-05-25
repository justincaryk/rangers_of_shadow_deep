import {
  CreateFriendMutation,
  CreateFriendMutationVariables,
  DeleteFriendMutation,
  DeleteFriendMutationVariables,
  UpdateFriendMutation,
  UpdateFriendMutationVariables,
  MercenariesQuery,
  FriendsQuery,
  FriendFullQuery,
  FriendSummaryQuery,
} from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

import GetMercenariessRequest from '../../graphql/queries/mercenaries'
import GetFriendsRequest from '../../graphql/queries/friends'
import GetFriendFullRequest from '../../graphql/queries/friend-full'
import GetFriendSummaryRequest from '../../graphql/queries/friend-summary'
import CreateFriendRequest from '../../graphql/mutations/friend-create'
import UpdateFriendRequest from '../../graphql/mutations/friend-update'
import DeleteFriendRequest from '../../graphql/mutations/friend-delete'

import { useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { staticQueryConfig } from '../react-query/defaults'

export enum COMPANION_QUERY_KEYS {
  FRIEND_FULL = 'friend-full',
  FRIEND_SUMMARY = 'friend-summary',
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
      ...staticQueryConfig,
    }),
    getFriends: useQuery({
      queryKey: [ COMPANION_QUERY_KEYS.FRIENDS ],
      queryFn: async () => graphQLClient.request<FriendsQuery>(GetFriendsRequest),
    }),
    getFriendFull: useQuery({
      queryKey: [ COMPANION_QUERY_KEYS.FRIEND_FULL ],
      queryFn: async () => {
        return params?.memberId
          ? graphQLClient.request<FriendFullQuery>(GetFriendFullRequest, {
              id: params?.memberId,
            })
          : null
      },
    }),
    getFriendSummary: useQuery({
      queryKey: [ COMPANION_QUERY_KEYS.FRIEND_SUMMARY ],
      queryFn: async () => {
        return params?.memberId
          ? graphQLClient.request<FriendSummaryQuery>(GetFriendSummaryRequest, {
              id: params?.memberId,
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
        queryClient.invalidateQueries({ queryKey: [ COMPANION_QUERY_KEYS.FRIEND_FULL ] })
        queryClient.invalidateQueries({ queryKey: [ COMPANION_QUERY_KEYS.FRIEND_SUMMARY ] })
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
