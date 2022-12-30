'use client'

import { GraphQLClient } from 'graphql-request'
import { useSignUpMutation } from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

export function useSignup() {
  const { graphQLClient } = useGraphQL() as unknown as {
    graphQLClient: GraphQLClient
  }
  return useSignUpMutation(graphQLClient)
}
