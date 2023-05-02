import { useSignupMutation } from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

export function useSignup() {
  const { graphQLClient } = useGraphQL()
  return useSignupMutation(graphQLClient)
}
