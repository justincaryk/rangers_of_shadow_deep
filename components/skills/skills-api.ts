import {
  SkillsQuery,
  UpdateMemberSkillMutationVariables,
  UpdateMemberSkillMutation,
} from '../../graphql/generated/graphql'

import useGraphQL from '../graphql/useGraphQL'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import GetSkillsRequest from '../../graphql/queries/skills'
import UpdateMemberSkillsRequest from '../../graphql/mutations/character-skills-update'

import { RANGER_QUERY_KEYS } from '../ranger/ranger-api'

export enum SKILLS_QUERY_KEY {
  ALL_SKILLS = 'all_skills',
}

export function useSkillsApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()

  return {
    getSkills: useQuery({
      queryKey: [ SKILLS_QUERY_KEY.ALL_SKILLS ],
      queryFn: async () => graphQLClient.request<SkillsQuery>(GetSkillsRequest),
    }),
    updateMemberSkill: useMutation({
      mutationFn: (data: UpdateMemberSkillMutationVariables) =>
        graphQLClient.request<UpdateMemberSkillMutation>(UpdateMemberSkillsRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ RANGER_QUERY_KEYS.RANGER ],
        })
      },
    }),
  }
}
