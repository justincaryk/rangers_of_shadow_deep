import useGraphQL from '../graphql/useGraphQL'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  FeatureRelationDataQuery,
  FeaturesQuery,
  UpdateFeatureRefsByIdMutation,
  UpdateFeatureRefsByIdMutationVariables,
} from '../../graphql/generated/graphql'

import GetFeaturesRequest from '../../graphql/queries/features'
import GetFeaturesRelationDataRequest from '../../graphql/queries/feature-relation'
import UpdateFeatureRefsByIdRequest from '../../graphql/mutations/feature-update'

export enum FEATURES_QUERY_KEYS {
  FEATURES = 'features',
  FEATURES_DATA = 'features_data',
}

export function useFeaturesApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()

  return {
    updateMemberStatById: useMutation({
      mutationFn: (data: UpdateFeatureRefsByIdMutationVariables) =>
        graphQLClient.request<UpdateFeatureRefsByIdMutation>(UpdateFeatureRefsByIdRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ FEATURES_QUERY_KEYS.FEATURES ],
        })
      },
    }),
    getFeatures: useQuery({
      queryKey: [ FEATURES_QUERY_KEYS.FEATURES ],
      queryFn: async () => graphQLClient.request<FeaturesQuery>(GetFeaturesRequest),
    }),
    getFeatureRelatedData: useQuery({
      queryKey: [ FEATURES_QUERY_KEYS.FEATURES_DATA ],
      queryFn: async () => graphQLClient.request<FeatureRelationDataQuery>(GetFeaturesRelationDataRequest),
    }),
  }
}
