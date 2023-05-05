import {
    SkillsQuery,
  } from '../../graphql/generated/graphql'
  import useGraphQL from '../graphql/useGraphQL'
  
  import GetSkillsRequest from '../../graphql/queries/skills'
  
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
//   import { RANGER_QUERY_KEYS } from '../ranger/ranger-api'
  
  export enum SKILLS_QUERY_KEY {
    ALL_SKILLS = 'all_skills',
  }
  
  export function useSkillsApi() {
    const { graphQLClient } = useGraphQL()
    // const queryClient = useQueryClient()
  
    return {
      getSkills: useQuery({
        queryKey: [ SKILLS_QUERY_KEY.ALL_SKILLS ],
        queryFn: async () => graphQLClient.request<SkillsQuery>(GetSkillsRequest),
      }),
    //   learnSpell: useMutation({
    //     mutationFn: (data: LearnSpellMutationVariables) =>
    //       graphQLClient.request<LearnSpellMutation>(LearnSpellRequest, data),
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({
    //         queryKey: [ RANGER_QUERY_KEYS.RANGER ],
    //       })
    //     },
    //   }),
    //   unlearnSpell: useMutation({
    //     mutationFn: (data: UnlearnSpellMutationVariables) =>
    //       graphQLClient.request<UnlearnSpellMutation>(UnlearnSpellRequest, data),
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({
    //         queryKey: [ RANGER_QUERY_KEYS.RANGER ],
    //       })
    //     },
    //   }),
    }
  }
  