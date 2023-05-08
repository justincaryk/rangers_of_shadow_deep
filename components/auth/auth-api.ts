import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SigninInput, SigninMutation, SignupInput, SignupMutation } from '../../graphql/generated/graphql'
import useGraphQL from '../graphql/useGraphQL'

import SigninRequest from '../../graphql/mutations/signin'
import SignupRequest from '../../graphql/mutations/signup'

export function useAuthApi() {
  const { graphQLClient } = useGraphQL()
  // const queryClient = useQueryClient()
  return {
    signIn: useMutation({
      mutationFn: (data: SigninInput) => graphQLClient.request<SigninMutation>(SigninRequest, data),
      // mutationKey: AUTH_MUTATION_KEYS.SIGNIN,
    }),
    signUp: useMutation({
      // mutationKey: AUTH_MUTATION_KEYS.SIGNUP,
      mutationFn: (data: SignupInput) => graphQLClient.request<SignupMutation>(SignupRequest, data),
    }),
  }
}
