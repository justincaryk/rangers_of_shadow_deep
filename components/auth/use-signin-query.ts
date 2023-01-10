import { GraphQLClient } from 'graphql-request'
import { useSigninMutation } from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

export function useSignin() {
  const { graphQLClient } = useGraphQL() as unknown as {
    graphQLClient: GraphQLClient
  }
  return useSigninMutation(graphQLClient)
}
