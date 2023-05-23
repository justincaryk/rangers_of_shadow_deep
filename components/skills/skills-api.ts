import {
  SkillsQuery,
  UpdateMemberSkillMutationVariables,
  UpdateMemberSkillMutation,
  CreateMemberSkillMutationVariables,
  CreateMemberSkillMutation,
  DeleteMemberSkillMutationVariables,
  DeleteMemberSkillMutation,
} from '../../graphql/generated/graphql'

import useGraphQL from '../graphql/useGraphQL'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import GetSkillsRequest from '../../graphql/queries/skills'
import UpdateMemberSkillRequest from '../../graphql/mutations/member-skill-update'
import CreateMemberSkillRequest from '../../graphql/mutations/member-skill-create'
import DeleteMemberSkillRequest from '../../graphql/mutations/member-skill-delete'

import { RANGER_QUERY_KEYS } from '../ranger/ranger-api'
import { COMPANION_QUERY_KEYS } from '../companions/companions-api'

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
    createMemberSkill: useMutation({
      mutationFn: (data: CreateMemberSkillMutationVariables) =>
        graphQLClient.request<CreateMemberSkillMutation>(CreateMemberSkillRequest, data),
      onSuccess: (_, variables) => {
        if (variables.characterId) {
          queryClient.invalidateQueries({
            queryKey: [ RANGER_QUERY_KEYS.RANGER ],
          })
        }
        if (variables.mercenaryId) {
          queryClient.invalidateQueries({
            queryKey: [ COMPANION_QUERY_KEYS.MERCENARIES ],
          })
        }
      },
    }),
    updateMemberSkill: useMutation({
      mutationFn: (data: UpdateMemberSkillMutationVariables) =>
        graphQLClient.request<UpdateMemberSkillMutation>(UpdateMemberSkillRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ RANGER_QUERY_KEYS.RANGER ],
        })
      },
    }),
    deleteMemberSkill: useMutation({
      mutationFn: (data: DeleteMemberSkillMutationVariables) =>
        graphQLClient.request<DeleteMemberSkillMutation>(DeleteMemberSkillRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ COMPANION_QUERY_KEYS.MERCENARIES ],
        })
      },
    }),
  }
}
