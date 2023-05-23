import { Option } from 'react-multi-select-component'
import * as Yup from 'yup'

export type FeatureUpdateSchemaType = {
  id: string
  itemId?: string
  injuryId?: string
  levelGrantId?: string
  skillId?: string
  statId?: string
  pickIds?: Option[]
  friendLevelGrantId?: string
  requiresItemId?: string
  excludesItemId?: string
}

export type OptionWithBonusValue = Option & {
  bonusValue: number
}

export type MercenarySchemaType = {
  mercId: string
  items: Option[]
  skills: OptionWithBonusValue[]
  stats: OptionWithBonusValue[]
}

export const MultiSelectOptionSchema = Yup.object().shape({
  label: Yup.string(),
  value: Yup.string(),
})

export const FeatureUpdateSchema = Yup.object().shape({
  id: Yup.string().required(),
  itemId: Yup.string().nullable(),
  injuryId: Yup.string().nullable(),
  levelGrantId: Yup.string().nullable(),
  skillId: Yup.string().nullable(),
  statId: Yup.string().nullable(),
  pickIds: Yup.array().of(MultiSelectOptionSchema),
  friendLevelGrantId: Yup.string().nullable(),
  requiresItemId: Yup.string().nullable(),
  excludesItemId: Yup.string().nullable(),
  mercenaryId: Yup.string().nullable(),
})

export const MercenaryStuffSchema = Yup.object().shape({
  mercId: Yup.string().required(),
  items: Yup.array().of(MultiSelectOptionSchema),
  skills: Yup.array().of(MultiSelectOptionSchema),
})
