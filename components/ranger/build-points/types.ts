import { Character, CharacterBpLookup, UpdateBpSpentMutationVariables } from '../../../graphql/generated/graphql'
import {
  MAX_BP_FOR_HEROIC_SPELLS,
  MAX_BP_FOR_RP,
  MAX_BP_FOR_SKILLS,
  MAX_BP_FOR_STATS,
  SKILL_POINTS_PER_BP,
  RECRUITMENT_POINTS_PER_BP,
} from '../../rules/creation-rules'

export type BpLookUpKeyFields = Pick<
  CharacterBpLookup,
  'bpSpentOnHeroicAbilities' | 'bpSpentOnRp' | 'bpSpentOnSkills' | 'bpSpentOnStats'
>
export type CharacterBpTrackingFields = Pick<
  Character,
  'totalHeroicActions' | 'totalRecruitmentPoints' | 'totalSkillPoints' | 'totalStatPoints'
>

export enum BP_ASSIGNABLE_ATTRS_KEYS {
  STATS = 'stats',
  SKILLS = 'skills',
  RP = 'rp',
  HEROIC = 'ha',
}

export type BpLookupHash = {
  [key: string]: {
    bpMutateVarKey: keyof UpdateBpSpentMutationVariables
    bpVarKey: keyof BpLookUpKeyFields
    characterVarKey: keyof CharacterBpTrackingFields
    maxAllowed: number
    attributeTextShort: string
    createConversionHelper?: (current: number, modfifier: number) => number
  }
}

export const ATTR_TO_BP_LOOKUP_KEY_HASH: BpLookupHash = {
  [BP_ASSIGNABLE_ATTRS_KEYS.STATS]: {
    bpMutateVarKey: 'stats',
    bpVarKey: 'bpSpentOnStats',
    characterVarKey: 'totalStatPoints',
    maxAllowed: MAX_BP_FOR_STATS,
    attributeTextShort: 'Stats',
  },
  [BP_ASSIGNABLE_ATTRS_KEYS.SKILLS]: {
    bpMutateVarKey: 'skills',
    bpVarKey: 'bpSpentOnSkills',
    characterVarKey: 'totalSkillPoints',
    maxAllowed: MAX_BP_FOR_SKILLS,
    attributeTextShort: 'Skills',
    createConversionHelper: (current, modifier) => current + modifier * SKILL_POINTS_PER_BP,
  },
  [BP_ASSIGNABLE_ATTRS_KEYS.HEROIC]: {
    bpMutateVarKey: 'heroic',
    bpVarKey: 'bpSpentOnHeroicAbilities',
    characterVarKey: 'totalHeroicActions',
    maxAllowed: MAX_BP_FOR_HEROIC_SPELLS,
    attributeTextShort: 'Heroic Actions & Spells',
  },
  [BP_ASSIGNABLE_ATTRS_KEYS.RP]: {
    bpMutateVarKey: 'rp',
    bpVarKey: 'bpSpentOnRp',
    characterVarKey: 'totalRecruitmentPoints',
    maxAllowed: MAX_BP_FOR_RP,
    attributeTextShort: 'Recruitment Points',
    createConversionHelper: (current, modifier) => current + modifier * RECRUITMENT_POINTS_PER_BP,
  },
}
