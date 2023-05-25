import {
  SkillsQuery,
  UpdateMemberSkillMutationVariables,
  UpdateMemberSkillMutation,
  CreateMemberSkillMutationVariables,
  CreateMemberSkillMutation,
  DeleteMemberSkillMutationVariables,
  DeleteMemberSkillMutation,
  MemberSkillsQuery,
} from '../../graphql/generated/graphql'

import useGraphQL from '../graphql/useGraphQL'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCurrentMember } from '../react-query/hooks'

import GetSkillsRequest from '../../graphql/queries/skills'
import GetMemberSkillsRequest from '../../graphql/queries/member-skills'
import UpdateMemberSkillRequest from '../../graphql/mutations/member-skill-update'
import CreateMemberSkillRequest from '../../graphql/mutations/member-skill-create'
import DeleteMemberSkillRequest from '../../graphql/mutations/member-skill-delete'

import { COMPANION_QUERY_KEYS } from '../companions/companions-api'
import { staticQueryConfig } from '../react-query/defaults'

export enum SKILLS_QUERY_KEY {
  ALL_SKILLS = 'all_skills',
  MEMBER_SKILLS = 'member_skills',
}

export function useSkillsApi() {
  const { graphQLClient } = useGraphQL()
  const queryClient = useQueryClient()
  const { id, referenceColumnName } = useCurrentMember()

  return {
    getSkills: useQuery({
      queryKey: [ SKILLS_QUERY_KEY.ALL_SKILLS ],
      queryFn: async () => graphQLClient.request<SkillsQuery>(GetSkillsRequest),
      ...staticQueryConfig,
    }),
    getMemberSkills: useQuery({
      queryKey: [ SKILLS_QUERY_KEY.MEMBER_SKILLS ],
      queryFn: async () => {
        return id && referenceColumnName
          ? graphQLClient.request<MemberSkillsQuery>(GetMemberSkillsRequest, {
              [referenceColumnName]: id,
            })
          : null
      },
    }),
    createMemberSkill: useMutation({
      mutationFn: (data: CreateMemberSkillMutationVariables) =>
        graphQLClient.request<CreateMemberSkillMutation>(CreateMemberSkillRequest, data),
      onSuccess: (data, variables) => {
        if (variables.characterId || variables.friendId) {
          queryClient.setQueryData(
            [ SKILLS_QUERY_KEY.MEMBER_SKILLS ],
            (prev: any) => [ ...prev, data.createMemberSkill?.memberSkill ]
          )

          // queryClient.invalidateQueries({
          //   queryKey: [ SKILLS_QUERY_KEY.MEMBER_SKILLS ],
          // })
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
      onSuccess: data => {
        queryClient.setQueryData(
          [ SKILLS_QUERY_KEY.MEMBER_SKILLS, data.updateMemberSkillById?.memberSkill?.id ],
          data.updateMemberSkillById?.memberSkill
        )
        // queryClient.invalidateQueries({
        //   queryKey: [SKILLS_QUERY_KEY.MEMBER_SKILLS],
        // })
      },
    }),
    deleteMemberSkill: useMutation({
      mutationFn: (data: DeleteMemberSkillMutationVariables) =>
        graphQLClient.request<DeleteMemberSkillMutation>(DeleteMemberSkillRequest, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ COMPANION_QUERY_KEYS.MERCENARIES ],
        })
        
        queryClient.invalidateQueries({
          queryKey: [ SKILLS_QUERY_KEY.MEMBER_SKILLS ],
        })
      },
    }),
  }
}
