'use client'

import { Field, Form, Formik } from 'formik'
import { useMemo } from 'react'
import * as Yup from 'yup'
import classnames from 'classnames'

import Card from '../parts/card'
import { baseInputClasses } from '../parts/input'
import SmallButton from '../parts/small-button'
import Loader from '../loader'

import { useLevelingApi } from './leveling-api'
import { useCompanionsApi } from '../companions/companions-api'

import { FriendPatch, Friend } from '../../graphql/generated/graphql'
import { FriendLevelGrant, FriendLevelGrantUnwound } from './types'

export const FriendLevelingFieldsSchema = Yup.object().shape({
  progressionPoints: Yup.number().required('Required'),
})

interface LevelUpCardProps {
  friend: Friend
}

const LevelUpCardContent = ({ friend }: LevelUpCardProps) => {
  const { mutate: mutateFriend } = useCompanionsApi().updateFriend
  const { data: levelsData } = useLevelingApi().friendRules
  const { mutate: createLevelRef } = useLevelingApi().createLevelRef
  const { mutate: updateLevelRef } = useLevelingApi().updateLevelRef

  const handleSubmit = (data: FriendPatch) => {
    mutateFriend({
      id: friend.id,
      patch: {
        progressionPoints: FriendLevelingFieldsSchema.fields.progressionPoints.cast(data.progressionPoints),
      },
    })
  }

  // upgrades with duplicate benefits have been combined and need to be unpacked for rendering
  const levelsUnwound = useMemo(() => {
    if (!levelsData?.allFriendLevelGrants?.nodes.length) {
      return []
    }

    const sorted = levelsData?.allFriendLevelGrants?.nodes.sort((a, b) => {
      if (a.ppMilestoneFirst > b.ppMilestoneFirst) {
        return 1
      } else if (a.ppMilestoneFirst < b.ppMilestoneFirst) {
        return -1
      }
      return 0
    }) as FriendLevelGrant[]

    const unwound = [
      ...sorted.map(x => {
        const extended: FriendLevelGrantUnwound = {
          ...x,
          unwoundCost: x.ppMilestoneFirst,
        }
        return extended
      }),
      ...sorted
        .filter(x => x.ppMilestoneSecond)
        .map(x => {
          const extended: FriendLevelGrantUnwound = {
            ...x,
            unwoundCost: x.ppMilestoneSecond || 0,
          }
          return extended
        }),
    ]
    return unwound
  }, [ levelsData ])

  const levelUpAvail = useMemo(() => {
    const levelsGranted = friend.memberLevelsByFriendId?.nodes.reduce((prev, curr) => {
      return prev + curr.timesGranted
    }, 0)
    const maxLevelsToBeGranted = levelsData?.allFriendLevelGrants?.nodes.reduce((prev, curr) => {
      return prev + 1 + (curr.ppMilestoneSecond ? 1 : 0)
    }, 0)

    const isMaxRank = maxLevelsToBeGranted === levelsGranted
    const hasRequisitePoints = Math.floor((friend.progressionPoints ?? 0) / 10) > levelsGranted

    return !isMaxRank && hasRequisitePoints
  }, [ friend, levelsData ])

  const tryBuyLevel = () => {
    if (!levelUpAvail || !levelsUnwound.length) {
      return null
    }
    const uniqueLevelRecordsExpected = levelsData?.allFriendLevelGrants?.nodes?.length ?? 0

    // the friend doesn't have level loopup records for each unique level up type
    if (friend.memberLevelsByFriendId.nodes.length < uniqueLevelRecordsExpected) {
      for (const level of levelsUnwound) {
        const purchased = friend.memberLevelsByFriendId.nodes.find(
          levelBought => levelBought.friendLevelGrantId === level.id
        )
        if (!purchased) {
          return createLevelRef({
            friendId: friend.id,
            friendLevelGrantId: level.id,
            timesGranted: 1,
          })
        }
      }
    }
    // the friend has already hydrated records with unique benefits, now we just need to update the count
    else {
      for (const level of levelsUnwound) {
        let purchased = friend.memberLevelsByFriendId.nodes.find(
          levelBought => levelBought.friendLevelGrantId === level.id
        )
        if (!purchased) {
          console.warn('rut roh. cant find the right level')
          return
        }

        const canBeBoughtTwice = !!level.ppMilestoneSecond
        const { timesGranted } = purchased

        if (canBeBoughtTwice && timesGranted === 1) {
          return updateLevelRef({
            id: purchased.id,
            timesGranted: purchased.timesGranted + 1,
          })
        }
      }
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex gap-x-4 justify-between items-center'>
        <div className='font-bold'>Progression Points: {friend.progressionPoints}</div>
        <SmallButton
          onClick={tryBuyLevel}
          type='button'
          className={classnames({
            'bg-lime-500': levelUpAvail,
            'cursor-not-allowed': !levelUpAvail,
          })}
        >
          Unlock progression reward
        </SmallButton>
      </div>
      <table className='table-auto text-xs border-collapse'>
        <thead>
          <tr className='border border-slate-800'>
            <th className='border border-slate-800 pt-0 px-4 text-left'>Progression Points</th>
            <th className='border border-slate-800 pt-0 px-4text-left'>Reward</th>
          </tr>
        </thead>
        <tbody>
          {levelsUnwound.map((benefit, i) => (
            <tr key={`${benefit.id}-${i}`} className='border-l-1 border-r-1 border-slate-800'>
              <td className='capitalize border border-slate-800 px-4'>{benefit.unwoundCost}</td>
              <td className='border border-slate-800 px-4'>{benefit.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='space-y-1 text-sm'>
        <Formik
          initialValues={{
            progressionPoints: friend.progressionPoints ?? 0,
          }}
          validationSchema={FriendLevelingFieldsSchema}
          onSubmit={handleSubmit}
        >
          {({ submitForm, errors }) => (
            <Form className='flex gap-x-6 justify-content'>
              {/* {JSON.stringify(errors)} */}
              <div className='flex gap-x-2 items-center'>
                <label className='font-semibold' htmlFor='xp' aria-label='xp'>
                  Set Progression Points:
                </label>
                <Field name='progressionPoints' className={`${baseInputClasses}`} onBlur={submitForm} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default function FriendLeveling() {
  const { data: friend } = useCompanionsApi().getFriend

  if (!friend?.friendById) {
    return <Loader />
  }

  return (
    <div>
      <div className='space-y-1'>
        <Card>
          <LevelUpCardContent friend={friend.friendById as Friend} />
        </Card>
      </div>
    </div>
  )
}