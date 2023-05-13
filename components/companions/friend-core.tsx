'use client'

import { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { useCompanionsApi } from './companions-api'
import { MemberCoreFieldsSchema } from '../ranger/core-character'
import { FriendPatch } from '../../graphql/generated/graphql'
import { baseInputClasses } from '../parts/input'
import Loader from '../loader'
import MercenaryCard from './mercenary-card'
import { capitalizeEach } from '../utils'
import Card from '../parts/card'
import FriendLeveling from '../leveling/friend-leveling'

export default function FriendCore() {
  const [ showLevelUp, setShowLevelUp ] = useState(false)
  const { data: friend, status } = useCompanionsApi().getFriend
  const { mutate: updateFriend } = useCompanionsApi().updateFriend

  const handleSubmit = (data: FriendPatch) => {
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

        {friend?.friendById?.bonusSkill && (
          <div>
            <div className='flex gap-x-3'>
              <div className='font-bold'>+3 Bonus Skill:</div>
              <div>{capitalizeEach(friend?.friendById?.skillByBonusSkill?.name ?? '')}</div>
            </div>
            <div className='italic'>{friend?.friendById?.skillByBonusSkill?.description}</div>
          </div>
        )}

        {friend?.friendById?.mercenaryByMercenaryId && (
          <MercenaryCard mercenary={friend.friendById.mercenaryByMercenaryId} onMercRemove={handleRemoveMercType} />
        )}
      </div>
    </Card>
  )
}
