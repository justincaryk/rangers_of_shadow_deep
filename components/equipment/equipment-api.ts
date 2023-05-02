import { GetEquipmentQuery } from '../../graphql/generated/graphql'

import useGraphQL from '../graphql/useGraphQL'
import { useQuery } from '@tanstack/react-query'

import GetEquipmentRequest from '../../graphql/queries/items'

export enum EQUIPMENT_QUERY_KEYS {
  EQUIPMENT = 'equipment',
}

export function useEquipmentApi() {
  const { graphQLClient } = useGraphQL()

  return {
    getEquipment: useQuery({
      queryKey: [ EQUIPMENT_QUERY_KEYS.EQUIPMENT ],
      queryFn: async () =>
        graphQLClient.request<GetEquipmentQuery>(GetEquipmentRequest),
    }),
  }
}
