import { GraphQLClient } from 'graphql-request'
import { useSignupMutation } from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

export function useSignup() {
  const { graphQLClient } = useGraphQL() as unknown as {
    graphQLClient: GraphQLClient
  }
  return useSignupMutation(graphQLClient)
}
