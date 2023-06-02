'use client'

import { useMemo, useState } from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'

import { baseInputClasses } from '../../parts/input'
import Card from '../../parts/card'
import Loader from '../../loader'
import MercenaryCard, { FriendLevelBonus } from '../mercenaries/mercenary-card'
import FriendLeveling from '../../leveling/friend-leveling'

import { useSkillsApi } from '../../skills/skills-api'
import { useStatsApi } from '../../stats/stats-api'
import { useCompanionsApi } from '../companions-api'

import { MemberCoreFieldsSchema } from '../../ranger/core-character'
import { StatType } from '../../../graphql/generated/graphql'
import { Stat } from '../../stats/types'
import { Mercenary } from '../types'

import { capitalizeEach } from '../../utils'
import { notify } from '../../parts/toast'

export default function FriendCore() {
  const [ showLevelUp, setShowLevelUp ] = useState(false)
  const { data: friend, status } = useCompanionsApi().getFriendSummary
  const { data: mercenaries } = useCompanionsApi().getMercenaries
  const { data: skills } = useSkillsApi().getSkills
  const { data: stats } = useStatsApi().getStats
  const { data: memberStats } = useStatsApi().getMemberStats
  const { mutate: updateFriend } = useCompanionsApi().updateFriend

  const handleSubmit = (data: Yup.InferType<typeof MemberCoreFieldsSchema>) => {
    if (data.name) {
      updateFriend({
        id: friend?.friendById?.id,
        patch: {
          ...data,
        },
      })
    }
  }

  const handleRemoveMercType = () => {
    updateFriend({
      id: friend?.friendById?.id,
      patch: {
        mercenaryId: null,
      },
    })
  }

  const selectedMercType = useMemo(() => {
    if (friend?.friendById?.mercenaryId) {
      return mercenaries?.allMercenaries?.nodes.find(merc => friend.friendById?.mercenaryId === merc.id)
    }
  }, [ mercenaries, friend?.friendById?.mercenaryId ])

  // const skillBonuses = useMemo(() => {
  //   return skills?.allSkills?.nodes.find(skill => skill.id === friend?.friendById?.bonusSkill)
  // }, [friend?.friendById?.bonusSkill, skills])

  const statBonuses = useMemo(() => {
    const bonuses: FriendLevelBonus[] = []

    if (memberStats?.allMemberStats?.nodes.length && stats?.allStats?.nodes.length) {
      for (const stat of stats.allStats.nodes) {
        const match = memberStats.allMemberStats.nodes.find(ms => ms.statId === stat.id)

        if (match) {
          bonuses.push({ bonusId: stat.id, value: match.value })
        }
      }
    }

    return bonuses
  }, [ memberStats, stats ])

  if (status === 'loading') {
    return <Loader />
  }

  return (
    <Card>
      <div className='space-y-4'>
        <Formik
          initialValues={{
            name: friend?.friendById?.name ?? '',
          }}
          validationSchema={MemberCoreFieldsSchema}
          onSubmit={handleSubmit}
        >
          {({ submitForm }) => (
            <Form className='space-y-1'>
              <div className='flex gap-x-2 items-center'>
                <label className='font-semibold' htmlFor='name' aria-label='name'>
                  Name:
                </label>
                <Field
                  name='name'
                  placeholder='Companion name'
                  className={`${baseInputClasses} max-w-sm`}
                  onBlur={submitForm}
                />
              </div>
            </Form>
          )}
        </Formik>

        <div className={'cursor-pointer text-blue-500'} onClick={() => setShowLevelUp(!showLevelUp)}>
          {showLevelUp ? 'Done managing levels and xp' : 'Manage Levels and XP!'}
        </div>
        
        
        {showLevelUp && <FriendLeveling />}

        {/* {bonusSkillFromRef && (
          <div>
            <div className='flex gap-x-3'>
              <div className='font-bold'>+3 Bonus Skill:</div>
              <div>{capitalizeEach(bonusSkillFromRef?.name ?? '')}</div>
            </div>
            <div className='italic'>{bonusSkillFromRef?.description}</div>
          </div>
        )} */}

        {selectedMercType && (
          <MercenaryCard
            mercenary={selectedMercType}
            statBonuses={statBonuses}
            skillBonuses={[]} //skillBonuses}
            onMercRemove={handleRemoveMercType}
          />
        )}
      </div>
    </Card>
  )
}
