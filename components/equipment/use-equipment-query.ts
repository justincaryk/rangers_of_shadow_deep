import { useAllItemsQuery, } from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

export function useEquipmentQuery() {
  const { graphQLClient } = useGraphQL()
  return useAllItemsQuery(graphQLClient) 
}
