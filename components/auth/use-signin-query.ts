import { GraphQLClient } from 'graphql-request'
import { useSigninMutation } from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

export function useSignin() {
  const { graphQLClient } = useGraphQL()
  return useSigninMutation(graphQLClient)
}
