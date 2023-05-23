'use client'

import { Field, Form, Formik } from 'formik'
import { useMemo, useState } from 'react'
import { MultiSelect, Option } from 'react-multi-select-component'
import { useCompanionsApi } from '../companions/companions-api'
import { Mercenary } from '../companions/types'
import { useEquipmentApi } from '../equipment/equipment-api'
import Loader from '../loader'
import Card from '../parts/card'
import SmallButton from '../parts/small-button'
import { useSkillsApi } from '../skills/skills-api'
import { useStatsApi } from '../stats/stats-api'
import { MercenarySchemaType, MercenaryStuffSchema, OptionWithBonusValue } from './types'

export default function MercenaryStuff() {
  const [ show, setShow ] = useState(false)

  const { data: mercs } = useCompanionsApi().getMercenaries

  const { data: equipment } = useEquipmentApi().getEquipment
  const { data: skills } = useSkillsApi().getSkills
  const { data: stats } = useStatsApi().getStats

  const { mutate: addSkill } = useSkillsApi().createMemberSkill
  const { mutate: removeSkill, status: removeSkillStatus } = useSkillsApi().deleteMemberSkill

  const { mutate: addItem } = useEquipmentApi().createMemberItem
  const { mutate: removeItem, status: removeItemStatus } = useEquipmentApi().deleteMemberItem

  const { mutate: addStat } = useStatsApi().createMemberStat
  const { mutate: removeStat, status: removeStatStatus } = useStatsApi().deleteMemberStat

  const removeAllItems = (merc: Mercenary) => {
    // skills
    for (const mercSkill of merc.memberSkillsByMercenaryId.nodes) {
      removeSkill({
        id: mercSkill.id,
      })
    }
    // stats
    for (const mercStat of merc.memberStatsByMercenaryId.nodes) {
      removeStat({
        id: mercStat.id,
      })
    }
    // items
    for (const mercItem of merc.memberItemsByMercenaryId.nodes) {
      removeItem({
        id: mercItem.id,
      })
    }
  }

  const addNewItems = (data: MercenarySchemaType) => {
    if (removeSkillStatus === 'loading' || removeItemStatus === 'loading' || removeStatStatus === 'loading') {
      return setTimeout(() => {
        addNewItems(data)
      }, 500)
    }

    for (const skill of data.skills) {
      addSkill({
        mercenaryId: data.mercId,
        skillId: skill.value,
        value: Number(skill.bonusValue),
      })
    }
    for (const stat of data.stats) {
      addStat({
        mercenaryId: data.mercId,
        statId: stat.value,
        value: Number(stat.bonusValue),
      })
    }
    for (const item of data.items) {
      addItem({
        mercenaryId: data.mercId,
        itemId: item.value,
      })
    }

  }

  const handleSubmit = (data: MercenarySchemaType) => {
    const merc = mercs?.allMercenaries?.nodes.find(merc => merc.id === data.mercId)

    if (!merc) {
      return
    }
    
    removeAllItems(merc as Mercenary)
    addNewItems(data)
  }

  const options = useMemo(() => {
    if (equipment && skills && stats) {
      return {
        equipment: equipment.mundane?.nodes.map(x => ({ label: x.name, value: x.id })) ?? [],
        skills: skills.allSkills?.nodes.map(x => ({ label: x.name, value: x.id, bonusValue: '' })) ?? [],
        stats: stats.allStats?.nodes.map(x => ({ label: x.name, value: x.id, bonusValue: '' })) ?? [],
      }
    }
    return null
  }, [ equipment, skills, stats ])

  if (!equipment || !mercs || !skills) {
    return <Loader />
  }

  const getMercStatValues = (mercId: string): OptionWithBonusValue[] => {
    if (!mercs) {
      return []
    }
    const merc = mercs.allMercenaries?.nodes.find(merc => merc.id === mercId)

    if (!merc) {
      return []
    }

    return merc?.memberStatsByMercenaryId?.nodes.map(memberItem => ({
      label: memberItem.statByStatId!.name!,
      value: memberItem.statId,
      bonusValue: memberItem.value,
    }))
  }

  const getMercEquipmentValues = (mercId: string): Option[] => {
    if (!mercs || !equipment) {
      return [] //as typeof MercenaryStuffSchema.fields.items[]
    }
    const merc = mercs.allMercenaries?.nodes.find(merc => merc.id === mercId)

    if (!merc) {
      return [] //as typeof MercenaryStuffSchema.fields.items[]
    }

    return merc.memberItemsByMercenaryId.nodes.map(memberItem => ({
      label: memberItem.itemByItemId!.name!,
      value: memberItem.itemId,
    }))
  }

  const getMercSkillValues = (mercId: string): OptionWithBonusValue[] => {
    if (!mercs || !skills) {
      return []
    }
    const merc = mercs.allMercenaries?.nodes.find(merc => merc.id === mercId)

    if (!merc) {
      return []
    }

    return merc.memberSkillsByMercenaryId.nodes.map(memberSkill => ({
      label: memberSkill.skillBySkillId!.name!,
      value: memberSkill.skillId,
      bonusValue: memberSkill.value,
    }))
  }

  return (
    <div className='space-y-4'>
      <div className='text-lg font-bold italic uppercase text-blue-500 cursor-pointer' onClick={() => setShow(!show)}>
        Companion Items, Skills, & Stats Mapping {show ? '<<<' : '>>>'}
      </div>
      {show && (
        <div className='ml-4 space-y-4'>
          {mercs?.allMercenaries?.nodes.map(merc => (
            <Card key={merc.id}>
              <Formik
                initialValues={{
                  mercId: merc.id,
                  items: getMercEquipmentValues(merc.id),
                  skills: getMercSkillValues(merc.id),
                  stats: getMercStatValues(merc.id),
                }}
                validationSchema={MercenaryStuffSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, errors, values }) => (
                  <Form className='space-y-2'>
                    {/* <div>{JSON.stringify(errors)}</div> */}
                    <div>
                      <div className='font-bold capitalize'>{merc.name}</div>
                      <div>{merc.notes}</div>
                    </div>

                    <Field name='mercId' className='hidden' />

                    {/* ============ STATS ============ */}
                    <Field className='w-full' name='stats'>
                      {({ field }: any) => (
                        <div>
                          <label>Stats</label>
                          <MultiSelect
                            onChange={(options: Option[]) => setFieldValue('stats', options)}
                            value={field.value}
                            labelledBy='stats'
                            options={options?.stats ?? []}
                          />
                        </div>
                      )}
                    </Field>
                    {values.stats.map((stat, i) => (
                      <div key={stat.value} className='flex gap-x-4'>
                        <div>{stat.label}</div>
                        <Field
                          name={`stats[${i}].bonusValue`}
                          as='input'
                          onChange={(e: any) => {
                            setFieldValue(`stats[${i}].bonusValue`, e.target.value)
                          }}
                        />
                      </div>
                    ))}

                    {/* ============ SKILLS ============ */}
                    <Field className='w-full' name='skills'>
                      {({ field }: any) => (
                        <div>
                          <label>Skills</label>
                          <MultiSelect
                            onChange={(options: Option[]) => setFieldValue('skills', options)}
                            value={field.value}
                            labelledBy='skills'
                            options={options?.skills ?? []}
                          />
                        </div>
                      )}
                    </Field>
                    {values.skills.map((skill, i) => (
                      <div key={skill.value} className='flex gap-x-4'>
                        <div>{skill.label}</div>
                        <Field
                          name={`skills[${i}].bonusValue`}
                          as='input'
                          onChange={(e: any) => {
                            setFieldValue(`skills[${i}].bonusValue`, e.target.value)
                          }}
                        />
                      </div>
                    ))}

                    {/* ============ ITEMS ============ */}
                    <Field className='w-full' name='items'>
                      {({ field }: any) => (
                        <div>
                          <label>Equipment</label>
                          <MultiSelect
                            onChange={(options: Option[]) => setFieldValue('items', options)}
                            value={field.value}
                            labelledBy='items'
                            options={options?.equipment ?? []}
                          />
                        </div>
                      )}
                    </Field>
                    <div className='mt-2'>
                      <SmallButton primary type='submit'>
                        Save
                      </SmallButton>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
